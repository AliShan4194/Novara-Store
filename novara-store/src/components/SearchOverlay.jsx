import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Search, SearchX, X } from 'lucide-react'
import { products } from '../data/products'
import { money, useStore } from '../context/StoreContext'
import SmartImage from './SmartImage'

const popular = ['Hoodie', 'Watch', 'Headphones', 'Bag', 'Perfume', 'Sneakers']

export function searchProducts(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const words = q.split(/\s+/)
  return products.filter((p) => {
    const hay = `${p.name} ${p.category} ${p.description} ${p.colors.map((c) => c.name).join(' ')}`.toLowerCase()
    return words.every((w) => hay.includes(w))
  })
}

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const close = () => setSearchOpen(false)

  const results = useMemo(() => searchProducts(query), [query])
  const hasQuery = query.trim().length > 0

  useEffect(() => {
    if (!searchOpen) return
    setQuery('')
    const t = setTimeout(() => inputRef.current?.focus(), 80)
    const onKey = (e) => e.key === 'Escape' && setSearchOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [searchOpen, setSearchOpen])

  const submit = (e) => {
    e.preventDefault()
    if (!hasQuery) return
    close()
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[80] overflow-y-auto bg-bg/85 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="container-x max-w-4xl pb-16 pt-6 sm:pt-10">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface transition hover:rotate-90"
              >
                <X size={20} />
              </button>
            </div>

            <motion.form
              onSubmit={submit}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.4 }}
              className="mt-4"
            >
              <label htmlFor="site-search" className="eyebrow">
                Search NOVARA
              </label>
              <div className="mt-3 flex items-center gap-4 border-b-2 border-ink/80 pb-3 focus-within:border-accent">
                <Search size={26} className="shrink-0 text-muted" />
                <input
                  id="site-search"
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories…"
                  autoComplete="off"
                  className="w-full bg-transparent font-display text-3xl outline-none placeholder:text-muted/50 sm:text-5xl"
                />
              </div>
            </motion.form>

            <div className="mt-10">
              {!hasQuery && (
                <>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">Popular searches</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {popular.map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setQuery(w)}
                        className="rounded-full border border-line bg-surface px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                  <p className="mb-4 mt-12 text-xs font-semibold uppercase tracking-widest text-muted">Trending now</p>
                  <ResultGrid items={products.slice(0, 4)} onPick={close} />
                </>
              )}

              {hasQuery && results.length > 0 && (
                <>
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm text-muted">
                      {results.length} result{results.length === 1 ? '' : 's'} for “{query.trim()}”
                    </p>
                    <button type="button" onClick={submit} className="flex items-center gap-1 text-sm font-medium hover:text-accent">
                      View all in shop <ArrowRight size={15} />
                    </button>
                  </div>
                  <ResultGrid items={results.slice(0, 8)} onPick={close} />
                </>
              )}

              {hasQuery && results.length === 0 && (
                <div className="flex flex-col items-center py-14 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-line/50">
                    <SearchX size={30} className="text-muted" />
                  </div>
                  <h3 className="mt-6 text-3xl">No products found</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted">
                    We couldn't find anything for “{query.trim()}”. Try a different word or browse a popular search.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                    {popular.slice(0, 4).map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setQuery(w)}
                        className="rounded-full border border-line bg-surface px-4 py-2 text-sm hover:border-accent hover:text-accent"
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ResultGrid({ items, onPick }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((p) => (
        <li key={p.id}>
          <Link to={`/product/${p.id}`} onClick={onPick} className="group block">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-line/40">
              <SmartImage
                src={p.thumb}
                alt={p.name}
                label={p.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-3 text-sm font-medium leading-snug group-hover:text-accent">{p.name}</p>
            <p className="mt-0.5 text-sm text-muted">{money(p.price)}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
