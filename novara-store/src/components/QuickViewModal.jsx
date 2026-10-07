import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { money, useStore } from '../context/StoreContext'
import SmartImage from './SmartImage'
import Rating from './Rating'
import QuantitySelector from './QuantitySelector'
import { ColorPicker, SizePicker } from './OptionPickers'
import PromptTarget from './PromptTarget'

function QuickViewContent({ product, onClose }) {
  const { addToCart } = useStore()
  const navigate = useNavigate()
  const [color, setColor] = useState(product.colors[0].name)
  const [size, setSize] = useState(product.sizes[0])
  const [qty, setQty] = useState(1)

  const add = () => {
    addToCart(product, { color, size, qty })
    onClose()
  }
  const buyNow = () => {
    addToCart(product, { color, size, qty }, { openDrawer: false })
    onClose()
    navigate('/checkout')
  }

  return (
    <div className="grid max-h-[92vh] overflow-y-auto md:grid-cols-2">
      <PromptTarget
        target={{ kind: 'product', name: product.name, category: product.category, discount: product.discount }}
        className="bg-[radial-gradient(90%_70%_at_30%_15%,rgb(var(--stage)),rgb(var(--stage-edge)))]"
        position="bottom-4 left-4"
      >
        <div className="aspect-[4/5] md:aspect-auto md:h-full md:min-h-[520px]">
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            label={product.name}
            className="h-full w-full object-cover [filter:contrast(1.05)_saturate(1.04)]"
          />
        </div>
        <div className="studio-light pointer-events-none absolute inset-0" />
        {product.discount > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-night px-3 py-1 text-xs font-semibold text-[#e4c290] shadow-soft">
            -{product.discount}%
          </span>
        )}
      </PromptTarget>

      <div className="flex flex-col p-6 sm:p-9">
        <p className="eyebrow">{product.category}</p>
        <h2 className="mt-3 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl">{product.name}</h2>
        <div className="mt-3">
          <Rating value={product.rating} reviews={product.reviews} size={15} />
        </div>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-3xl font-semibold tracking-tight">{money(product.price)}</span>
          {product.originalPrice && (
            <span className="text-base text-muted line-through">{money(product.originalPrice)}</span>
          )}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>

        <div className="mt-6 space-y-5">
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest">
              Colour: <span className="font-normal normal-case tracking-normal text-muted">{color}</span>
            </p>
            <ColorPicker colors={product.colors} value={color} onChange={setColor} />
          </div>
          {!(product.sizes.length === 1 && product.sizes[0] === 'One Size') && (
            <div>
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest">Size</p>
              <SizePicker sizes={product.sizes} value={size} onChange={setSize} />
            </div>
          )}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest">Quantity</p>
            <QuantitySelector value={qty} onChange={setQty} />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <button type="button" onClick={add} className="btn-ghost py-4">
            Add to Cart
          </button>
          <button type="button" onClick={buyNow} className="btn-primary py-4">
            Buy Now
          </button>
        </div>
        <Link
          to={`/product/${product.id}`}
          onClick={onClose}
          className="mt-4 text-center text-sm text-muted underline-offset-4 hover:text-accent hover:underline"
        >
          View full details
        </Link>
      </div>
    </div>
  )
}

export default function QuickViewModal() {
  const { quickView, setQuickView } = useStore()
  const close = () => setQuickView(null)

  useEffect(() => {
    if (!quickView) return
    const onKey = (e) => e.key === 'Escape' && setQuickView(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [quickView, setQuickView])

  return (
    <AnimatePresence>
      {quickView && (
        <div
          className="fixed inset-0 z-[75] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view: ${quickView.name}`}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-t-[2rem] border border-white/10 bg-surface shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] sm:rounded-[2rem]"
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-night shadow-soft transition hover:scale-105"
            >
              <X size={18} />
            </button>
            <QuickViewContent key={quickView.id} product={quickView} onClose={close} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
