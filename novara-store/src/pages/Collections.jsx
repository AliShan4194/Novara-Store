import CollectionCard from '../components/CollectionCard'
import { collections } from '../data/products'

// Grid spans so the cards form a pleasing editorial layout on desktop.
const spans = [
  'md:col-span-3 h-[360px] md:h-[460px]',
  'md:col-span-3 h-[360px] md:h-[460px]',
  'md:col-span-2 h-[340px]',
  'md:col-span-2 h-[340px]',
  'md:col-span-2 h-[340px]',
]

export default function Collections() {
  return (
    <div className="container-x py-12 sm:py-16">
      <div className="mb-10 max-w-2xl sm:mb-14">
        <p className="eyebrow">Collections</p>
        <h1 className="mt-3 text-5xl sm:text-7xl">Curated for every mood</h1>
        <p className="mt-4 text-muted">
          From fresh drops to timeless favourites — explore our hand-picked collections.
        </p>
      </div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-6">
        {collections.map((c, i) => (
          <CollectionCard key={c.slug} collection={c} index={i} className={spans[i]} />
        ))}
      </div>
    </div>
  )
}
