import { useState } from 'react'
import { useStore } from '../context/StoreContext'

// A frontend-only demo account page. Nothing is saved or sent anywhere.
export default function Account() {
  const { showToast } = useStore()
  const [mode, setMode] = useState('signin')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (mode === 'signup' && form.name.trim().length < 2) return setError('Please enter your name.')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Please enter a valid email address.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    setError('')
    showToast(mode === 'signin' ? 'Demo: signed in (nothing is saved)' : 'Demo: account created (nothing is saved)')
    setForm({ name: '', email: '', password: '' })
  }

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="container-x flex justify-center py-14 sm:py-20">
      <div className="w-full max-w-md">
        <p className="eyebrow text-center">My account</p>
        <h1 className="mt-3 text-center text-5xl">{mode === 'signin' ? 'Welcome back' : 'Join NOVARA'}</h1>

        <div className="mt-8 grid grid-cols-2 rounded-full border border-line bg-surface p-1">
          {[['signin', 'Sign in'], ['signup', 'Create account']].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => { setMode(id); setError('') }}
              className={`rounded-full py-2.5 text-sm font-medium transition ${mode === id ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={submit} noValidate className="mt-6 space-y-4 rounded-[2rem] border border-line bg-surface p-7">
          {mode === 'signup' && (
            <input className="field" placeholder="Full name" value={form.name} onChange={update('name')} autoComplete="name" />
          )}
          <input className="field" type="email" placeholder="Email" value={form.email} onChange={update('email')} autoComplete="email" />
          <input
            className="field"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={update('password')}
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="btn-primary w-full py-3.5">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
          <p className="text-center text-xs text-muted">Demo only — accounts aren't connected to a backend yet.</p>
        </form>
      </div>
    </div>
  )
}
