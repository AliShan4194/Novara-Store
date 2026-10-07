import { useState } from 'react'

// An <img> that never looks broken: if the remote photo fails to load
// (offline, blocked, etc.) it shows an elegant gradient tile instead.
export default function SmartImage({ src, alt = '', className = '', label, ...rest }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-amber-100 text-stone-500 dark:from-zinc-800 dark:via-zinc-900 dark:to-stone-800 dark:text-stone-400 ${className}`}
      >
        <span className="font-display text-5xl opacity-60">{(label || alt || 'N').charAt(0)}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  )
}
