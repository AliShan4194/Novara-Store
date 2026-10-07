import { useEffect, useState } from 'react'

// true on desktop/laptop (a real mouse), false on phones/tablets (touch).
// We use it to turn off mouse-only effects on touch screens.
export function useCanHover() {
  const query = '(hover: hover) and (pointer: fine)'
  const [canHover, setCanHover] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return canHover
}
