import { useCallback, useEffect, useRef } from 'react'

// =====================================================================
//  useHoverFx — the premium mouse interaction (smoothed).
//  Attach the returned props to any element that also has className "fx".
//
//  Instead of jumping to the mouse position, the effect "eases" toward it
//  a little every frame (a technique called lerp). That is what makes the
//  tilt, spotlight and image-follow feel soft and natural.
//  Values are written straight to CSS variables (no React re-render):
//    --rx / --ry : subtle 3D tilt        --mx / --my : spotlight position
//    --ix / --iy : image follows mouse   --k         : hover strength 0 → 1
//  Touch screens never fire "mouse" pointer events, so they are skipped.
// =====================================================================
export function useHoverFx({ tilt = 4, follow = 10 } = {}) {
  const ref = useRef(null)
  const raf = useRef(0)
  const target = useRef({ x: 0.5, y: 0.5, on: false })
  const cur = useRef({ x: 0.5, y: 0.5, k: 0 })

  const write = useCallback(() => {
    const el = ref.current
    if (!el) return
    const { x, y, k } = cur.current
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    el.style.setProperty('--ry', `${((x - 0.5) * tilt * 2 * k).toFixed(3)}deg`)
    el.style.setProperty('--rx', `${((0.5 - y) * tilt * 2 * k).toFixed(3)}deg`)
    el.style.setProperty('--ix', `${((0.5 - x) * follow * k).toFixed(2)}px`)
    el.style.setProperty('--iy', `${((0.5 - y) * follow * k).toFixed(2)}px`)
    el.style.setProperty('--k', k.toFixed(4))
  }, [tilt, follow])

  const clear = useCallback(() => {
    const el = ref.current
    if (!el) return
    ;['--mx', '--my', '--rx', '--ry', '--ix', '--iy', '--k'].forEach((v) => el.style.removeProperty(v))
  }, [])

  const loop = useCallback(() => {
    const t = target.current
    const c = cur.current
    c.x += (t.x - c.x) * 0.13 // follows the mouse with a soft delay
    c.y += (t.y - c.y) * 0.13
    c.k += ((t.on ? 1 : 0) - c.k) * 0.09 // eases in and out
    if (!t.on && c.k < 0.003) {
      c.k = 0
      raf.current = 0
      clear()
      el_classOff(ref.current)
      return
    }
    write()
    raf.current = requestAnimationFrame(loop)
  }, [write, clear])

  const start = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(loop)
  }, [loop])

  const setTarget = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    target.current.x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
    target.current.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
  }

  const onPointerEnter = useCallback(
    (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      setTarget(e)
      // start the spotlight right under the mouse (no sweep from the centre)
      cur.current.x = target.current.x
      cur.current.y = target.current.y
      target.current.on = true
      ref.current?.classList.add('fx-active')
      start()
    },
    [start]
  )

  const onPointerMove = useCallback(
    (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      if (!target.current.on) return
      setTarget(e)
      start()
    },
    [start]
  )

  const onPointerLeave = useCallback(() => {
    target.current.on = false
    start()
  }, [start])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  return { ref, onPointerMove, onPointerEnter, onPointerLeave }
}

function el_classOff(el) {
  el?.classList.remove('fx-active')
}
