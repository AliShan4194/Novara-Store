import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import Hero from '../components/Hero'
import CategorySection from '../components/CategorySection'
import ProductGrid from '../components/ProductGrid'
import SectionHeading from '../components/SectionHeading'
import SmartImage from '../components/SmartImage'
import PromptTarget from '../components/PromptTarget'
import CollectionCard from '../components/CollectionCard'
import { collections, featuredProducts, img } from '../data/products'

const marqueeItems = ['Free shipping over $50', '30-day easy returns', 'Secure checkout', 'Sustainably packaged', 'Designed with care']

const perks = [
  { icon: Truck, title: 'Free shipping', text: 'On every order over $50, delivered in 3–5 days.' },
  { icon: RotateCcw, title: '30-day returns', text: 'Changed your mind? Send it back, no questions.' },
  { icon: ShieldCheck, title: 'Secure checkout', text: 'Your details are protected at every step.' },
  { icon: Leaf, title: 'Mindful materials', text: 'Responsibly sourced fabrics and recycled packaging.' },
]

export default function Home() {
  return (
    <>
      <Hero />

      {/* Scrolling brand strip */}
      <div className="overflow-hidden border-y border-line bg-surface/80 py-4 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)] backdrop-blur" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-sm font-medium text-ink/75">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t} <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      <CategorySection />

      {/* Featured products */}
      <section className="stage-glow container-x relative isolate pt-28 sm:pt-40">
        <PromptTarget target={{ kind: 'section', name: 'Featured products' }} position="-top-1 right-0" touchHidden>
          <SectionHeading eyebrow="Featured" title="Pieces we're loving" linkTo="/shop" linkLabel="Shop all products" />
        </PromptTarget>
        <ProductGrid products={featuredProducts} />
        <div className="mt-10 text-center sm:hidden">
          <Link to="/shop" className="btn-ghost">
            Shop all products <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Editorial banner */}
      <section className="container-x pt-28 sm:pt-40">
        <PromptTarget target={{ kind: 'section', name: 'Editorial banner' }} position="top-5 right-5">
          <div className="on-dark relative overflow-hidden rounded-[2.25rem] bg-night text-white shadow-lift">
            <div className="texture-dark pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
            <div className="grid lg:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-center p-8 sm:p-14 lg:p-20">
                <p className="eyebrow">The Autumn Edit</p>
                <h2 className="mt-4 text-balance text-5xl leading-[1.02] sm:text-6xl">Quiet design, built to last.</h2>
                <p className="mt-5 max-w-md text-white/75">
                  Layered neutrals, honest materials and clean silhouettes — a considered wardrobe for every day of the
                  season.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/collections/limited-edition" className="btn-accent">
                    Shop the edit <ArrowRight size={16} />
                  </Link>
                  <Link to="/about" className="btn-glass">
                    Our story
                  </Link>
                </div>
              </div>
              <div className="relative min-h-[320px] lg:min-h-[520px]">
                <SmartImage
                  src={img('photo-1490481651871-ab68de25d43d', 1100)}
                  alt="The Autumn Edit"
                  label="N"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-night via-night/20 to-transparent lg:from-night/90" />
              </div>
            </div>
          </div>
        </PromptTarget>
      </section>

      {/* Collections teaser */}
      <section className="container-x pt-28 sm:pt-40">
        <SectionHeading eyebrow="Collections" title="Curated for you" linkTo="/collections" linkLabel="All collections" />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {collections.slice(0, 3).map((c, i) => (
            <CollectionCard key={c.slug} collection={c} index={i} className="h-[380px] md:h-[440px]" />
          ))}
        </div>
      </section>

      {/* Perks */}
      <section className="container-x pt-28 sm:pt-40">
        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line shadow-card sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-surface p-7 sm:p-9"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-sans text-base font-semibold tracking-normal">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
