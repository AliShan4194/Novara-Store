import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, RefreshCw, Sparkles, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { generatePrompt } from '../data/promptLogic'

// Copy text — uses the modern clipboard API, with a fallback for older browsers.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

function PanelBody({ target, onClose }) {
  const [seed, setSeed] = useState(0)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const prompt = useMemo(() => generatePrompt(target, seed), [target, seed])

  // Short "generating…" shimmer every time the prompt changes
  useEffect(() => {
    setLoading(true)
    setCopied(false)
    const t = setTimeout(() => setLoading(false), 650)
    return () => clearTimeout(t)
  }, [seed, target])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const copy = async () => {
    if (await copyText(prompt)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[85] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Design prompt"
    >
      <motion.div
        className="absolute inset-0 bg-night/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="on-dark relative w-full max-w-xl overflow-hidden rounded-t-[2rem] border border-white/15 bg-night text-white shadow-lift sm:rounded-[2rem]"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {/* soft glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                <Sparkles size={13} /> Design Prompt
              </p>
              <h2 className="mt-2 text-3xl">{target.name || 'Selected element'}</h2>
              <p className="mt-1 text-xs capitalize text-white/50">Element type: {target.kind}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 min-h-[150px] rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            {loading ? (
              <div className="space-y-3" aria-label="Generating prompt">
                {[100, 92, 96, 60].map((w, i) => (
                  <motion.div
                    key={i}
                    className="h-3 rounded-full bg-white/15"
                    style={{ width: `${w}%` }}
                    animate={{ opacity: [0.35, 0.9, 0.35] }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.12 }}
                  />
                ))}
              </div>
            ) : (
              <motion.p
                key={seed}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[15px] leading-relaxed text-white/90"
              >
                {prompt}
              </motion.p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={copy}
              disabled={loading}
              className="btn bg-accent py-3 text-night hover:brightness-110"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
            <button
              type="button"
              onClick={() => setSeed((s) => s + 1)}
              className="btn border border-white/20 py-3 text-white hover:bg-white/10"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Regenerate
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn border border-white/20 py-3 text-white hover:bg-white/10"
            >
              Close
            </button>
          </div>
          <p className="mt-4 text-center text-[11px] text-white/35">Demo prompt generator · no API key required</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function PromptPanel() {
  const { promptTarget, setPromptTarget } = useStore()
  return (
    <AnimatePresence>
      {promptTarget && <PanelBody key="prompt-panel" target={promptTarget} onClose={() => setPromptTarget(null)} />}
    </AnimatePresence>
  )
}
