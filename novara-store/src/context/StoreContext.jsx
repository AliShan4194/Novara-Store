import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getProduct } from '../data/products'

// =====================================================================
//  StoreContext — the "brain" of the shop.
//  It keeps the cart, wishlist, theme and which panels are open, and any
//  component can read/change them with the useStore() hook.
// =====================================================================

const StoreContext = createContext(null)

export const FREE_SHIPPING_MIN = 50
export const SHIPPING_FEE = 6.99

export function StoreProvider({ children }) {
  const [cart, setCart] = useLocalStorage('novara_cart', [])
  const [wishlist, setWishlist] = useLocalStorage('novara_wishlist', [])
  // New key (v2) so everyone starts in the dark studio look; the navbar toggle still switches to light.
  const [theme, setTheme] = useLocalStorage('novara_theme_v2', 'dark')

  // UI state (not saved)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [quickView, setQuickView] = useState(null) // product or null
  const [promptTarget, setPromptTarget] = useState(null) // {kind, name, ...} or null
  const [toast, setToast] = useState(null)

  // Apply the dark/light class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(t)
  }, [toast])

  // Lock page scroll while an overlay is open
  const overlayOpen = cartOpen || searchOpen || !!quickView
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [overlayOpen])

  const showToast = useCallback((message) => setToast({ message, id: Date.now() }), [])

  // ---------- Cart ----------
  const addToCart = useCallback(
    (product, { color, size, qty = 1 } = {}, { openDrawer = true } = {}) => {
      const chosenColor = color || product.colors[0].name
      const chosenSize = size || product.sizes[0]
      const key = `${product.id}|${chosenColor}|${chosenSize}`
      setCart((prev) => {
        const found = prev.find((i) => i.key === key)
        if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
        return [...prev, { key, id: product.id, color: chosenColor, size: chosenSize, qty }]
      })
      if (openDrawer) setCartOpen(true)
      else showToast(`${product.name} added to cart`)
    },
    [setCart, showToast]
  )

  const removeFromCart = useCallback((key) => setCart((prev) => prev.filter((i) => i.key !== key)), [setCart])

  const changeQty = useCallback(
    (key, delta) =>
      setCart((prev) =>
        prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(99, i.qty + delta)) } : i))
      ),
    [setCart]
  )

  const clearCart = useCallback(() => setCart([]), [setCart])

  // Cart lines with full product info attached
  const cartItems = useMemo(
    () =>
      cart
        .map((line) => ({ ...line, product: getProduct(line.id) }))
        .filter((line) => line.product),
    [cart]
  )

  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0)
  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const shipping = cartItems.length === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  // ---------- Wishlist ----------
  const isWishlisted = useCallback((id) => wishlist.includes(id), [wishlist])
  const toggleWishlist = useCallback(
    (product) => {
      const has = wishlist.includes(product.id)
      setWishlist((prev) => (has ? prev.filter((x) => x !== product.id) : [...prev, product.id]))
      showToast(has ? 'Removed from wishlist' : 'Saved to wishlist')
    },
    [wishlist, setWishlist, showToast]
  )

  const value = {
    // cart
    cartItems, cartCount, subtotal, shipping, total,
    addToCart, removeFromCart, changeQty, clearCart,
    // wishlist
    wishlist, isWishlisted, toggleWishlist,
    // theme
    theme, toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    // ui
    cartOpen, setCartOpen,
    searchOpen, setSearchOpen,
    quickView, setQuickView,
    promptTarget, setPromptTarget,
    toast, showToast,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}

export const money = (n) => `$${n.toFixed(2).replace(/\.00$/, '')}`
