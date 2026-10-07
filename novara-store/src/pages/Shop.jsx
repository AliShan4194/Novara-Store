import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import ProductGrid from '../components/ProductGrid'
import Rating from '../components/Rating'
import { allColors, allSizes, categories, getCollection, productsInCollection, products as ALL } from '../data/products'
import { searchProducts } from '../components/SearchOverlay'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'best', label: 'Best Selling' },
]

const priceRanges = [
  { id: 'all', label: 'Any price', test: () => true },
  { id: 'u50', label: 'Under $50', test: (p) => p.price < 50 },
  { id: '50-100', label: '$50 – $100', test: (p) => p.price >= 50 && p.price <= 100 },
  { id: 'o100', label: 'Over $100', test: (p) => p.price > 100 },
]

const ratingOptions = [
  { id: 0, label: 'Any rating' },
  { id: 4, label: '4★ & up' },
  { id: 4.5, label: '4.5★ & up' },
]

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-line py-6 first:pt-0 last:border-0">
      <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.18em]">{title}</h3>
      {children}
    </div>
  )
}

function Radio({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-muted transition hover:text-ink">
      <span
        className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border transition ${
          checked ? 'border-ink' : 'border-line'
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-ink" />}
      </span>
      <input type="radio" checked={checked} onChange={onChange} className="sr-only" />
      <span className={checked ? 'font-medium text-ink' : ''}>{children}</span>
    </label>
  )
}

export default function Shop({ collection: collectionProp }) {
  const { slug } = useParams()
  const [params, setParams] = useSearchParams()
  const collectionSlug = collectionProp || slug
  const collection = collectionSlug ? getCollection(collectionSlug) : null

  const category = params.get('category') || 'All'
  const q = params.get('q') || ''

  const [price, setPrice] = useState('all')
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const setCategory = (c) => {
    const next = new URLSearchParams(params)
    if (c === 'All') next.delete('category')
    else next.set('category', c)
    setParams(next, { replace: true })
  }
  const clearQuery = () => {
    const next = new URLSearchParams(params)
    next.delete('q')
    setParams(next, { replace: true })
  }

  const toggle = (setter, value) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))

  const resetAll = () => {
    setPrice('all')
    setSizes([])
    setColors([])
    setMinRating(0)
    setSort('featured')
    setParams({}, { replace: true })
  }

  const filtered = useMemo(() => {
    let list = collection ? productsInCollection(collection.slug) : ALL
    if (q) list = list.filter((p) => searchProducts(q).some((r) => r.id === p.id))
    if (category !== 'All') list = list.filter((p) => p.category === category)
    const range = priceRanges.find((r) => r.id === price)
    list = list.filter(range.test)
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)))
    if (colors.length) list = list.filter((p) => p.colors.some((c) => colors.includes(c.name)))
    if (minRating) list = list.filter((p) => p.rating >= minRating)

    const sorted = [...list]
    if (sort === 'newest') sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'best') sorted.sort((a, b) => b.sold - a.sold)
    return sorted
  }, [collection, q, category, price, sizes, colors, minRating, sort])

  const activeCount =
    (category !== 'All' ? 1 : 0) + (price !== 'all' ? 1 : 0) + sizes.length + colors.length + (minRating ? 1 : 0)

  const filters = (
    <>
      <FilterGroup title="Category">
        {['All', ...categories.map((c) => c.name)].map((c) => (
          <Radio key={c} checked={category === c} onChange={() => setCategory(c)}>
            {c}
          </Radio>
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        {priceRanges.map((r) => (
          <Radio key={r.id} checked={price === r.id} onChange={() => setPrice(r.id)}>
            {r.label}
          </Radio>
        ))}
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => {
            const on = sizes.includes(s)
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(setSizes, s)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                  on ? 'border-ink bg-ink text-bg' : 'border-line bg-surface hover:border-ink/50'
                }`}
              >
                {s}
              </button>
            )
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-3">
          {allColors.map((c) => {
            const on = colors.includes(c.name)
            return (
              <button
                key={c.name}
                type="button"
                title={c.name}
                aria-label={c.name}
                aria-pressed={on}
                onClick={() => toggle(setColors, c.name)}
                className={`h-8 w-8 rounded-full border transition ${
                  on ? 'border-ink ring-2 ring-ink/25 ring-offset-2 ring-offset-bg' : 'border-line hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            )
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Rating">
        {ratingOptions.map((r) => (
          <Radio key={r.id} checked={minRating === r.id} onChange={() => setMinRating(r.id)}>
            {r.id ? <Rating value={r.id} showNumber={false} size={13} /> : null}
            <span className="sr-only">{r.label}</span>
            {r.id ? <span className="ml-2">{r.label}</span> : r.label}
          </Radio>
        ))}
      </FilterGroup>
    </>
  )

  return (
    <div className="container-x py-10 sm:py-14">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <nav className="mb-4 text-xs text-muted" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink">Home</Link> / <span className="text-ink">{collection ? collection.name : 'Shop'}</span>
        </nav>
        <h1 className="text-5xl sm:text-6xl">{collection ? collection.name : 'Shop all'}</h1>
        <p className="mt-3 max-w-xl text-muted">
          {collection ? collection.blurb + '.' : 'Thoughtfully designed products for modern living.'}
        </p>
      </div>

      {/* Toolbar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-y border-line py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="btn-ghost px-5 py-2.5 lg:hidden"
          >
            <SlidersHorizontal size={15} /> Filters{activeCount > 0 && ` (${activeCount})`}
          </button>
          <p className="text-sm text-muted">
            {filtered.length} product{filtered.length === 1 ? '' : 's'}
          </p>
          {q && (
            <button
              type="button"
              onClick={clearQuery}
              className="flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-ink"
            >
              “{q}” <X size={12} />
            </button>
          )}
        </div>
        <label className="flex items-center gap-2.5 text-sm">
          <span className="hidden text-muted sm:inline">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-10 lg:grid-cols-[250px_1fr] xl:gap-14">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 no-scrollbar">
            {filters}
            {activeCount > 0 && (
              <button type="button" onClick={resetAll} className="mt-2 text-sm underline underline-offset-4 hover:text-accent">
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Results */}
        <div>
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} columns="md:grid-cols-3 lg:grid-cols-3" />
          ) : (
            <div className="flex flex-col items-center rounded-[2rem] border border-dashed border-line py-24 text-center">
              <h3 className="text-4xl">No products found</h3>
              <p className="mt-2 max-w-sm text-sm text-muted">Try removing a filter or searching for something else.</p>
              <button type="button" onClick={resetAll} className="btn-primary mt-7">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
            <motion.div
              className="absolute inset-0 bg-night/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-[2rem] bg-bg"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <h2 className="text-3xl">Filters</h2>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  aria-label="Close filters"
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-line/70"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5">{filters}</div>
              <div className="grid grid-cols-2 gap-3 border-t border-line p-4">
                <button type="button" onClick={resetAll} className="btn-ghost py-3.5">
                  Clear all
                </button>
                <button type="button" onClick={() => setFiltersOpen(false)} className="btn-primary py-3.5">
                  Show {filtered.length} items
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
