import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { products } from '../data/products'
import { useStore } from '../context/StoreContext'
import ProductGrid from '../components/ProductGrid'

export default function Wishlist() {
  const { wishlist, addToCart, showToast } = useStore()
  const saved = products.filter((p) => wishlist.includes(p.id))

  const addAll = () => {
    saved.forEach((p) => addToCart(p, {}, { openDrawer: false }))
    showToast(`${saved.length} item${saved.length === 1 ? '' : 's'} added to cart`)
  }

  return (
    <div className="container-x py-12 sm:py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Your favourites</p>
          <h1 className="mt-3 text-5xl sm:text-6xl">Wishlist</h1>
          <p className="mt-2 text-sm text-muted">
            {saved.length} saved item{saved.length === 1 ? '' : 's'}
          </p>
        </div>
        {saved.length > 0 && (
          <button type="button" onClick={addAll} className="btn-primary">
            <ShoppingBag size={16} /> Add all to cart
          </button>
        )}
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center rounded-[2rem] border border-dashed border-line py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-line/50">
            <Heart size={30} className="text-muted" />
          </div>
          <h2 className="mt-6 text-4xl">Your wishlist is empty</h2>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Tap the heart on any product to save it here for later.
          </p>
          <Link to="/shop" className="btn-primary mt-8">
            Discover products
          </Link>
        </div>
      ) : (
        <ProductGrid products={saved} columns="md:grid-cols-3 xl:grid-cols-4" />
      )}
    </div>
  )
}
