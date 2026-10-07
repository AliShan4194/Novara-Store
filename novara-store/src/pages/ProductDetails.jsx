import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { getProduct, products } from '../data/products'
import { money, useStore } from '../context/StoreContext'
import { useHoverFx } from '../hooks/useHoverFx'
import SmartImage from '../components/SmartImage'
import Rating from '../components/Rating'
import QuantitySelector from '../components/QuantitySelector'
import { ColorPicker, SizePicker } from '../components/OptionPickers'
import ProductGrid from '../components/ProductGrid'
import SectionHeading from '../components/SectionHeading'
import PromptTarget from '../components/PromptTarget'

function Details({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const navigate = useNavigate()
  const [imageIndex, setImageIndex] = useState(0)
  const [color, setColor] = useState(product.colors[0].name)
  const [size, setSize] = useState(product.sizes[0])
  const [qty, setQty] = useState(1)
  const fx = useHoverFx({ tilt: 0, follow: 22 })
  const wished = isWishlisted(product.id)
  const oneSize = product.sizes.length === 1 && product.sizes[0] === 'One Size'

  // "Customers Also Bought": best sellers from other categories. "You May Also Like": same category first.
  const { alsoBought, mayLike } = useMemo(() => {
    const others = products.filter((p) => p.id !== product.id)
    const alsoBought = [...others].sort((a, b) => b.sold - a.sold).slice(0, 4)
    const taken = new Set(alsoBought.map((p) => p.id))
    const rest = others.filter((p) => !taken.has(p.id))
    const same = rest.filter((p) => p.category === product.category)
    const mayLike = [...same, ...rest.filter((p) => p.category !== product.category).sort((a, b) => b.rating - a.rating)].slice(0, 4)
    return { alsoBought, mayLike }
  }, [product])

  const add = () => addToCart(product, { color, size, qty })
  const buyNow = () => {
    addToCart(product, { color, size, qty }, { openDrawer: false })
    navigate('/checkout')
  }

  return (
    <>
      <div className="stage-glow container-x relative isolate py-10 sm:py-16">
        <nav className="mb-6 text-xs text-muted" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink">Home</Link> /{' '}
          <Link to="/shop" className="hover:text-ink">Shop</Link> /{' '}
          <Link to={`/shop?category=${product.category}`} className="hover:text-ink">{product.category}</Link> /{' '}
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <div className="flex gap-3 sm:flex-col">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-current={imageIndex === i}
                  className={`h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-24 sm:w-20 ${
                    imageIndex === i ? 'border-ink' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <SmartImage src={src} alt="" label={product.name} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <PromptTarget
              target={{ kind: 'product', name: product.name, category: product.category, discount: product.discount }}
              className="flex-1"
              position="bottom-4 left-4"
            >
              <div
                ref={fx.ref}
                onPointerMove={fx.onPointerMove}
                onPointerEnter={fx.onPointerEnter}
                onPointerLeave={fx.onPointerLeave}
                className="fx relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(90%_70%_at_30%_15%,rgb(var(--stage)),rgb(var(--stage-edge)))] shadow-[0_50px_90px_-36px_rgba(0,0,0,0.85)]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="h-full w-full"
                  >
                    <SmartImage
                      src={product.images[imageIndex]}
                      alt={product.name}
                      label={product.name}
                      className="fx-img h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="studio-light pointer-events-none absolute inset-0" />
                {product.discount > 0 && (
                  <span className="absolute left-4 top-4 rounded-full bg-night px-3 py-1.5 text-xs font-semibold text-[#e4c290] shadow-soft">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>
            </PromptTarget>
          </div>

          {/* Info */}
          <div className="lg:pt-4">
            <p className="eyebrow">{product.category}</p>
            <h1 className="mt-4 text-5xl leading-[1] tracking-[-0.03em] sm:text-6xl lg:text-7xl">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3">
              <Rating value={product.rating} reviews={product.reviews} size={16} />
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-4xl font-semibold tracking-tight">{money(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted line-through">{money(product.originalPrice)}</span>
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold">
                    Save {money(product.originalPrice - product.price)} ({product.discount}%)
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

            <div className="mt-8 space-y-6 border-t border-line pt-8">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest">
                  Colour: <span className="font-normal normal-case tracking-normal text-muted">{color}</span>
                </p>
                <ColorPicker colors={product.colors} value={color} onChange={setColor} />
              </div>
              {!oneSize && (
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest">Size</p>
                  <SizePicker sizes={product.sizes} value={size} onChange={setSize} />
                </div>
              )}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest">Quantity</p>
                <QuantitySelector value={qty} onChange={setQty} />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={add} className="btn-primary flex-1 py-4 text-[15px]">
                Add to Cart · {money(product.price * qty)}
              </button>
              <button type="button" onClick={buyNow} className="btn-accent flex-1 py-4 text-[15px]">
                Buy Now
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={wished}
                className="btn-ghost h-[54px] w-full shrink-0 sm:w-[54px] sm:px-0"
              >
                <Heart size={19} className={wished ? 'fill-red-500 text-red-500' : ''} />
                <span className="sm:hidden">{wished ? 'Saved to wishlist' : 'Add to wishlist'}</span>
              </button>
            </div>

            {/* Shipping & returns */}
            <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface/80 shadow-card backdrop-blur">
              {[
                { icon: Truck, title: 'Shipping', text: 'Free on orders over $50. Standard delivery in 3–5 business days.' },
                { icon: RotateCcw, title: 'Returns', text: '30-day free returns on unworn items in original packaging.' },
                { icon: ShieldCheck, title: 'Warranty', text: 'Covered by our 1-year quality guarantee.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 p-5">
                  <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="mt-0.5 text-sm text-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="container-x pt-20 sm:pt-28">
        <SectionHeading eyebrow="Complete the look" title="Customers Also Bought" />
        <ProductGrid products={alsoBought} columns="md:grid-cols-4" />
      </section>

      <section className="container-x pt-20 sm:pt-28">
        <SectionHeading eyebrow="Recommended" title="You May Also Like" />
        <ProductGrid products={mayLike} columns="md:grid-cols-4" />
      </section>
    </>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const product = getProduct(id)

  if (!product)
    return (
      <div className="container-x flex flex-col items-center py-28 text-center">
        <h1 className="text-6xl">Product not found</h1>
        <p className="mt-3 text-muted">We couldn't find the product you're looking for.</p>
        <Link to="/shop" className="btn-primary mt-8">
          Back to shop
        </Link>
      </div>
    )

  // key={id} resets colour/size/quantity when you open a different product
  return <Details key={product.id} product={product} />
}
