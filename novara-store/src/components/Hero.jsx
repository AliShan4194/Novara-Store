import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { img, products } from '../data/products'
import { money } from '../context/StoreContext'
import { useHoverFx } from '../hooks/useHoverFx'
import SmartImage from './SmartImage'
import PromptTarget from './PromptTarget'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] },
})

export default function Hero() {
  const fx = useHoverFx({ tilt: 2.5, follow: 18 })
  const featured = products.find((p) => p.id === 'minimal-leather-bag')

  // Gentle parallax: as you scroll, the photo drifts slower than the page and the lights drift a little.
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const lightY = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <PromptTarget target={{ kind: 'hero', name: 'Homepage hero' }} position="bottom-6 left-5 sm:left-8" className="bg-night">
      <section ref={sectionRef} className="on-dark relative overflow-hidden bg-night text-white">
        {/* Dark stone + fabric texture */}
        <div className="texture-dark pointer-events-none absolute inset-0 opacity-90" />
        {/* Cinematic lighting: warm key light, cool rim light, spotlight cone and vignette */}
        <motion.div
          style={{ y: lightY }}
          className="pointer-events-none absolute -left-40 top-0 h-[560px] w-[560px] rounded-full bg-accent/20 blur-[130px]"
        />
        <motion.div
          style={{ y: lightY }}
          className="pointer-events-none absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-indigo-500/15 blur-[140px]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-70"
          style={{
            background:
              'radial-gradient(60% 55% at 72% 38%, rgba(255,235,205,0.16), transparent 70%), linear-gradient(180deg, rgba(255,255,255,0.05), transparent 30%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(120% 100% at 50% 40%, transparent 55%, rgba(0,0,0,0.65) 100%)' }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />

        <div className="container-x relative grid items-center gap-12 pb-24 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28 lg:pt-24">
          {/* Text */}
          <div>
            <motion.p {...fadeUp(0.05)} className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Autumn / Winter 2026 collection
            </motion.p>

            <motion.h1
              {...fadeUp(0.15)}
              className="mt-7 text-balance text-[3.5rem] leading-[0.96] tracking-[-0.03em] text-white drop-shadow-[0_6px_36px_rgba(0,0,0,0.7)] sm:text-7xl lg:text-[6.2rem]"
            >
              Elevate Your <em className="bg-gradient-to-r from-[#f6e2bb] via-[#e4c290] to-[#c9a063] bg-clip-text pr-2 not-italic text-transparent">Everyday</em>
            </motion.h1>

            <motion.p {...fadeUp(0.3)} className="mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
              Discover thoughtfully designed products made for modern living.
            </motion.p>

            <motion.div {...fadeUp(0.45)} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="btn-accent px-8 py-4">
                Shop Collection <ArrowRight size={16} />
              </Link>
              <Link to="/new-arrivals" className="btn-glass px-8 py-4">
                Explore New Arrivals
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.6)} className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {['photo-1494790108377-be9c29b29330', 'photo-1507003211169-0a1dd7228f2d', 'photo-1438761681033-6461ffad8d80'].map(
                  (id) => (
                    <SmartImage
                      key={id}
                      src={img(id, 120)}
                      alt=""
                      label="N"
                      className="h-10 w-10 rounded-full border-2 border-night object-cover"
                    />
                  )
                )}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={13} className="fill-accent text-accent" />
                  ))}
                  <span className="ml-1 text-sm font-medium">4.9</span>
                </div>
                <p className="text-xs text-white/65">Loved by 20,000+ customers</p>
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
          >
            <motion.div style={{ y: photoY }} className="relative">
              <div
                ref={fx.ref}
                onPointerMove={fx.onPointerMove}
                onPointerEnter={fx.onPointerEnter}
                onPointerLeave={fx.onPointerLeave}
                className="fx relative aspect-[4/5] overflow-hidden rounded-[2.25rem] border border-white/15 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.9),0_0_70px_-34px_rgba(222,190,142,0.35)] lg:ml-auto lg:max-w-[500px]"
              >
                {/* image reveal: the photo "opens" from the bottom while settling in */}
                <motion.div
                  initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.12 }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                  transition={{ duration: 1.3, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                  className="h-full w-full"
                >
                  <SmartImage
                    src={img('photo-1515886657613-9f3515b0c78f', 1000)}
                    alt="Lifestyle fashion photograph"
                    label="N"
                    loading="eager"
                    className="fx-img h-full w-full object-cover"
                  />
                </motion.div>
                <div className="studio-light pointer-events-none absolute inset-0" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
              </div>
              {/* soft floor shadow under the photo */}
              <div className="pointer-events-none absolute inset-x-10 -bottom-6 h-10 rounded-[100%] bg-black/70 blur-2xl lg:left-auto lg:right-8 lg:w-[420px]" />
            </motion.div>

            {/* Floating glass card: product */}
            {featured && (
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-2 bottom-10 sm:-left-8"
              >
                <Link
                  to={`/product/${featured.id}`}
                  className="glass flex items-center gap-3 rounded-2xl p-2.5 pr-5 shadow-lift transition hover:bg-white/20"
                >
                  <SmartImage
                    src={featured.thumb}
                    alt={featured.name}
                    label={featured.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-[11px] text-white/75">Featured</p>
                    <p className="text-sm font-medium">{featured.name}</p>
                    <p className="text-sm text-accent">{money(featured.price)}</p>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Floating glass card: free shipping */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="glass absolute -right-1 top-10 hidden rounded-2xl px-5 py-4 shadow-lift sm:block lg:-right-4"
            >
              <p className="font-display text-3xl leading-none">Free</p>
              <p className="mt-1 text-xs text-white/75">shipping over $50</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PromptTarget>
  )
}
