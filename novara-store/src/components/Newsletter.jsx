import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | done

  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setStatus('error')
    setStatus('done')
    setEmail('')
  }

  if (status === 'done')
    return (
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-4 text-sm text-white">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-night">
          <Check size={14} />
        </span>
        You're on the list — welcome to NOVARA.
      </div>
    )

  return (
    <form onSubmit={submit} noValidate>
      <div className="flex rounded-full border border-white/15 bg-white/5 p-1.5 transition focus-within:border-accent">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          placeholder="Your email address"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/55"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-night transition hover:brightness-110 active:scale-95"
        >
          Subscribe <ArrowRight size={15} />
        </button>
      </div>
      {status === 'error' && <p className="mt-2 pl-4 text-xs text-red-400">Please enter a valid email address.</p>}
    </form>
  )
}
