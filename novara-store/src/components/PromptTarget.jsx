import { Sparkles } from 'lucide-react'
import { useStore } from '../context/StoreContext'

// =====================================================================
//  PromptTarget — wrap ANY element with this to give it the floating
//  "Generate Prompt" button.
//   • On desktop the button appears when you hover the element.
//   • On touch screens there is no hover, so a small icon button is
//     always visible instead.
//  Usage:  <PromptTarget target={{ kind: 'product', name: 'Watch' }}> ... </PromptTarget>
// =====================================================================
export default function PromptTarget({
  target,
  children,
  className = '',
  position = 'bottom-3 left-3',
  touchHidden = false, // set true to hide the button entirely on touch screens
}) {
  const { setPromptTarget } = useStore()

  return (
    <div className={`group/prompt relative ${className}`}>
      {children}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setPromptTarget(target)
        }}
        aria-label="Generate design prompt"
        className={`absolute ${position} ${touchHidden ? '[@media(hover:none)]:hidden' : ''} z-30 flex items-center gap-1.5 rounded-full border border-white/25 bg-night/80 px-3 py-1.5 text-[11px] font-medium text-white shadow-lift backdrop-blur-md transition-all duration-300 hover:bg-night
          opacity-100 [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0
          [@media(hover:hover)]:group-hover/prompt:translate-y-0 [@media(hover:hover)]:group-hover/prompt:opacity-100
          [@media(hover:hover)]:focus-visible:translate-y-0 [@media(hover:hover)]:focus-visible:opacity-100`}
      >
        <Sparkles size={12} className="text-accent" />
        <span className="hidden [@media(hover:hover)]:inline">Generate Prompt</span>
      </button>
    </div>
  )
}
