import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gem, Leaf, PenTool, Sparkles } from 'lucide-react'
import { img } from '../data/products'
import SmartImage from '../components/SmartImage'
import PromptTarget from '../components/PromptTarget'

const values = [
  { icon: PenTool, title: 'Thoughtful design', text: 'Every product starts with a question: does this make everyday life better? If not, it doesn’t ship.' },
  { icon: Gem, title: 'Uncompromising quality', text: 'We choose honest materials and make small batches so each piece feels as good as it looks.' },
  { icon: Sparkles, title: 'Simplicity', text: 'Fewer things, chosen well. Clean lines, calm palettes and nothing you don’t need.' },
  { icon: Leaf, title: 'Mindful by default', text: 'Recycled packaging, responsible sourcing and products designed to last years, not seasons.' },
]

const stats = [
  { n: '20k+', l: 'Happy customers' },
  { n: '120+', l: 'Designed pieces' },
  { n: '4.9', l: 'Average rating' },
  { n: '30', l: 'Day free returns' },
]

export default function About() {
  return (
    <>
      <section className="container-x py-16 sm:py-24">
        <p className="eyebrow">About NOVARA</p>
        <h1 className="mt-4 max-w-4xl text-balance text-5xl leading-[1.02] sm:text-7xl">
          NOVARA is a modern lifestyle brand focused on thoughtful design, quality and simplicity.
        </h1>
      </section>

      <section className="container-x">
        <PromptTarget target={{ kind: 'section', name: 'About story' }} position="top-5 right-5">
          <div className="on-dark grid overflow-hidden rounded-[2.25rem] bg-night text-white shadow-lift lg:grid-cols-2">
            <div className="relative min-h-[340px]">
              <SmartImage
                src={img('photo-1441986300917-64674bd600d8', 1100)}
                alt="NOVARA studio"
                label="N"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="p-8 sm:p-14 lg:p-16">
              <p className="eyebrow">Our story</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Born from a simple idea.</h2>
              <div className="mt-6 space-y-4 leading-relaxed text-white/80">
                <p>
                  NOVARA began with a small team frustrated by how much of what we buy is made to be replaced. We
                  wanted the opposite: a short, considered collection of things people actually keep.
                </p>
                <p>
                  We design in-house, work closely with trusted makers, and test every piece in real life before it
                  reaches you. The result is a wardrobe and a home that feel calm, personal and effortless.
                </p>
              </div>
              <Link to="/shop" className="btn-accent mt-8">Explore the collection</Link>
            </div>
          </div>
        </PromptTarget>
      </section>

      <section className="container-x pt-20 sm:pt-28">
        <p className="eyebrow">What we believe</p>
        <h2 className="mt-3 text-4xl sm:text-5xl">Our values</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
          {values.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 2) * 0.08 }}
              className="rounded-[1.75rem] border border-line bg-surface p-8 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-sans text-lg font-semibold tracking-normal">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-x pt-20 sm:pt-28">
        <div className="grid grid-cols-2 gap-y-10 rounded-[2rem] border border-line bg-surface px-6 py-12 text-center lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="font-display text-5xl sm:text-6xl">{s.n}</p>
              <p className="mt-1 text-sm text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
