import ProductCard from './ProductCard'

export default function ProductGrid({ products, columns = 'md:grid-cols-3 xl:grid-cols-4' }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-6 ${columns}`}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  )
}
