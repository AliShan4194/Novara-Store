import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { categories, img } from '../data/products'
import { useHoverFx } from '../hooks/useHoverFx'
import SmartImage from './SmartImage'
import SectionHeading from './SectionHeading'
import PromptTarget from './PromptTarget'

function CategoryCard({ cat, index }) {
  const fx = useHoverFx({ tilt: 4, follow: 14 })
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className={index === 0 ? 'col-span-2 lg:col-span-1' : ''}
    >
      <PromptTarget
        target={{ kind: 'category', name: cat.name }}
        position="top-4 right-4"
      >
        <Link
          to={`/shop?category=${cat.name}`}
          ref={fx.ref}
          onPointerMove={fx.onPointerMove}
          onPointerEnter={fx.onPointerEnter}
          onPointerLeave={fx.onPointerLeave}
          className={`fx group block overflow-hidden rounded-[1.75rem] hover:shadow-glow ${
            index === 0 ? 'aspect-[16/10] lg:aspect-[3/4]' : 'aspect-[3/4]'
          }`}
        >
          <SmartImage
            src={img(cat.photo, 700)}
            alt={`${cat.name} category`}
            label={cat.name}
            className="fx-img h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
            <div>
              <h3 className="font-display text-3xl leading-none">{cat.name}</h3>
              <p className="mt-1.5 text-xs text-white/70">{cat.blurb}</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition group-hover:bg-accent group-hover:text-night">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </Link>
      </PromptTarget>
    </motion.div>
  )
}

export default function CategorySection() {
  return (
    <section className="container-x pt-24 sm:pt-36">
      <SectionHeading eyebrow="Shop by category" title="Find your style" linkTo="/shop" linkLabel="Browse everything" />
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
        {categories.map((c, i) => (
          <CategoryCard key={c.name} cat={c} index={i} />
        ))}
      </div>
    </section>
  )
}
