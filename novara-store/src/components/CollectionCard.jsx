import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { img, productsInCollection } from '../data/products'
import { useHoverFx } from '../hooks/useHoverFx'
import SmartImage from './SmartImage'
import PromptTarget from './PromptTarget'

export default function CollectionCard({ collection, index = 0, className = '' }) {
  const fx = useHoverFx({ tilt: 3, follow: 16 })
  const count = productsInCollection(collection.slug).length
  const to = collection.slug === 'new-arrivals' ? '/new-arrivals' : collection.slug === 'best-sellers' ? '/best-sellers' : `/collections/${collection.slug}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      <PromptTarget
        target={{ kind: 'collection', name: collection.name, blurb: collection.blurb }}
        position="top-4 right-4"
        className="h-full"
      >
        <Link
          to={to}
          ref={fx.ref}
          onPointerMove={fx.onPointerMove}
          onPointerEnter={fx.onPointerEnter}
          onPointerLeave={fx.onPointerLeave}
          className="fx group block h-full min-h-[300px] overflow-hidden rounded-[2rem] hover:shadow-glow"
        >
          <SmartImage
            src={img(collection.photo, 1000)}
            alt={collection.name}
            label={collection.name}
            className="fx-img absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{count} products</p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-4xl leading-none sm:text-5xl">{collection.name}</h3>
                <p className="mt-2 text-sm text-white/70">{collection.blurb}</p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition group-hover:bg-accent group-hover:text-night">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </div>
        </Link>
      </PromptTarget>
    </motion.div>
  )
}
