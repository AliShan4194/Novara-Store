import { useEffect, useState } from 'react'

// Works like useState, but the value is also saved in the browser (localStorage),
// so it is still there after you refresh the page.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage can be blocked in private mode — the site still works */
    }
  }, [key, value])

  return [value, setValue]
}
