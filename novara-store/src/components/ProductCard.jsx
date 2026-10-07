import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, Heart, ShoppingBag } from 'lucide-react'
import { useStore, money } from '../context/StoreContext'
import { useHoverFx } from '../hooks/useHoverFx'
import SmartImage from './SmartImage'
import Rating from './Rating'
import PromptTarget from './PromptTarget'

// The star of the show: one product card with all the premium hover effects.
export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleWishlist, isWishlisted, setQuickView } = useStore()
  const fx = useHoverFx({ tilt: 2, follow: 12 }) // small numbers = calm, natural movement
  const wished = isWishlisted(product.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <PromptTarget
        target={{ kind: 'product', name: product.name, category: product.category, discount: product.discount }}
        position="top-14 left-5"
      >
        <article
          ref={fx.ref}
          onPointerMove={fx.onPointerMove}
          onPointerEnter={fx.onPointerEnter}
          onPointerLeave={fx.onPointerLeave}
          className="fx group rounded-[1.75rem] border border-line bg-gradient-to-b from-surface to-surface/90 p-2.5 shadow-card hover:shadow-card-hover sm:p-3"
        >
          {/* Image area — lit like a photo studio backdrop */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[radial-gradient(90%_70%_at_30%_15%,rgb(var(--stage)),rgb(var(--stage-edge)))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
            <Link to={`/product/${product.id}`} aria-label={product.name} className="block h-full w-full">
              <SmartImage
                src={product.images[0]}
                alt={product.name}
                label={product.name}
                className="fx-img h-full w-full object-cover"
              />
            </Link>
            <div className="studio-light pointer-events-none absolute inset-0" />

            {product.discount > 0 && (
              <span className="absolute left-3 top-3 rounded-full bg-night px-2.5 py-1 text-[11px] font-semibold text-[#e4c290] shadow-soft">
                -{product.discount}%
              </span>
            )}

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={wished}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-night shadow-soft backdrop-blur transition hover:scale-110 active:scale-95"
            >
              <Heart size={17} className={wished ? 'fill-red-500 text-red-500' : ''} />
            </button>

            {/* Quick actions — desktop hover only */}
            <div className="absolute inset-x-3 bottom-3 hidden translate-y-3 gap-2 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:hover)]:flex">
              <button
                type="button"
                onClick={() => setQuickView(product)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white/90 px-3 py-2.5 text-xs font-semibold text-night shadow-soft backdrop-blur transition hover:bg-white"
              >
                <Eye size={14} /> Quick View
              </button>
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-night px-3 py-2.5 text-xs font-semibold text-white shadow-soft transition hover:bg-black"
              >
                <ShoppingBag size={14} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="px-1.5 pb-1.5 pt-4 sm:px-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{product.category}</p>
            <Link to={`/product/${product.id}`} className="mt-1 block">
              <h3 className="font-sans text-[15px] font-medium leading-snug tracking-normal transition group-hover:text-accent">
                {product.name}
              </h3>
            </Link>
            <div className="mt-2">
              <Rating value={product.rating} reviews={product.reviews} size={13} />
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-[17px] font-semibold tracking-tight text-ink">{money(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted line-through">{money(product.originalPrice)}</span>
              )}
            </div>

            {/* Touch devices: always-visible buttons (no hover needed) */}
            <div className="mt-3 flex gap-2 [@media(hover:hover)]:hidden">
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-3 py-3 text-xs font-medium text-bg active:scale-95"
              >
                <ShoppingBag size={14} /> Add to Cart
              </button>
              <button
                type="button"
                onClick={() => setQuickView(product)}
                aria-label="Quick view"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line active:scale-95"
              >
                <Eye size={16} />
              </button>
            </div>
          </div>
        </article>
      </PromptTarget>
    </motion.div>
  )
}
