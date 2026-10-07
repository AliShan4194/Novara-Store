import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, Trash2, X } from 'lucide-react'
import { FREE_SHIPPING_MIN, money, useStore } from '../context/StoreContext'
import QuantitySelector from './QuantitySelector'
import SmartImage from './SmartImage'
import PromptTarget from './PromptTarget'

export default function CartDrawer() {
  const {
    cartOpen, setCartOpen, cartItems, cartCount, subtotal, shipping, total, removeFromCart, changeQty,
  } = useStore()
  const navigate = useNavigate()
  const close = () => setCartOpen(false)

  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cartOpen, setCartOpen])

  const remaining = Math.max(0, FREE_SHIPPING_MIN - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_MIN) * 100)

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Shopping cart">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 w-full max-w-[440px] border-l border-white/10 bg-bg/90 shadow-[-30px_0_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <PromptTarget
              target={{ kind: 'cart', name: 'Cart drawer' }}
              className="flex h-full flex-col"
              position="top-[18px] right-16"
              touchHidden
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-line px-6 py-5">
                <h2 className="font-display text-3xl">
                  Your Cart <span className="font-sans text-sm text-muted">({cartCount})</span>
                </h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close cart"
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-line/70"
                >
                  <X size={20} />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-line/50">
                    <ShoppingBag size={30} className="text-muted" />
                  </div>
                  <h3 className="mt-6 text-3xl">Your cart is empty</h3>
                  <p className="mt-2 text-sm text-muted">Looks like you haven't added anything yet.</p>
                  <Link to="/shop" onClick={close} className="btn-primary mt-7">
                    Start shopping
                  </Link>
                </div>
              ) : (
                <>
                  {/* Free shipping progress */}
                  <div className="border-b border-line px-6 py-4">
                    <p className="text-xs text-muted">
                      {remaining > 0 ? (
                        <>
                          Add <span className="font-semibold text-ink">{money(remaining)}</span> more for free shipping
                        </>
                      ) : (
                        <span className="font-medium text-ink">🎉 You've unlocked free shipping</span>
                      )}
                    </p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={false}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Items */}
                  <ul className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
                    <AnimatePresence initial={false}>
                      {cartItems.map((item) => (
                        <motion.li
                          key={item.key}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex gap-4"
                        >
                          <Link
                            to={`/product/${item.product.id}`}
                            onClick={close}
                            className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-line/40"
                          >
                            <SmartImage
                              src={item.product.thumb}
                              alt={item.product.name}
                              label={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </Link>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex justify-between gap-3">
                              <Link
                                to={`/product/${item.product.id}`}
                                onClick={close}
                                className="text-sm font-medium leading-snug hover:text-accent"
                              >
                                {item.product.name}
                              </Link>
                              <span className="text-sm font-semibold">{money(item.product.price * item.qty)}</span>
                            </div>
                            <p className="mt-0.5 text-xs text-muted">
                              {item.color}
                              {item.size !== 'One Size' && ` · ${item.size}`}
                            </p>
                            <div className="mt-auto flex items-center justify-between pt-3">
                              <QuantitySelector
                                small
                                value={item.qty}
                                onChange={(next) => changeQty(item.key, next - item.qty)}
                              />
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.key)}
                                aria-label={`Remove ${item.product.name}`}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-red-500/10 hover:text-red-500"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  {/* Summary */}
                  <div className="border-t border-line bg-surface/80 px-6 py-5 shadow-[0_-20px_40px_-24px_rgba(0,0,0,0.6)] backdrop-blur">
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted">Subtotal</dt>
                        <dd>{money(subtotal)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted">Shipping</dt>
                        <dd>{shipping === 0 ? 'Free' : money(shipping)}</dd>
                      </div>
                      <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
                        <dt>Total</dt>
                        <dd>{money(total)}</dd>
                      </div>
                    </dl>
                    <button
                      type="button"
                      onClick={() => {
                        close()
                        navigate('/checkout')
                      }}
                      className="btn-accent mt-5 w-full py-4 text-[15px]"
                    >
                      Checkout · {money(total)}
                    </button>
                    <button type="button" onClick={close} className="mt-3 w-full text-center text-sm text-muted hover:text-ink">
                      Continue shopping
                    </button>
                  </div>
                </>
              )}
            </PromptTarget>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
