import { Link } from 'react-router-dom'
import { Facebook, Instagram, Music2, Pin } from 'lucide-react'
import Newsletter from './Newsletter'
import PromptTarget from './PromptTarget'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', to: '/new-arrivals' },
      { label: 'Best Sellers', to: '/best-sellers' },
      { label: 'Collections', to: '/collections' },
      { label: 'Sale', to: '/collections/sale' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', to: '/info/contact' },
      { label: 'Shipping', to: '/info/shipping' },
      { label: 'Returns', to: '/info/returns' },
      { label: 'FAQs', to: '/info/faqs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Our Story', to: '/info/our-story' },
      { label: 'Careers', to: '/info/careers' },
    ],
  },
]

const socials = [
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { label: 'TikTok', icon: Music2, href: 'https://tiktok.com' },
  { label: 'Pinterest', icon: Pin, href: 'https://pinterest.com' },
]

export default function Footer() {
  return (
    <footer
      className="on-dark relative mt-28 overflow-hidden bg-night text-white sm:mt-36"
    >
      <div className="texture-dark pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(70% 60% at 15% 0%, rgba(228,194,144,0.11), transparent 70%)' }}
      />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#e4c290]/60 to-transparent" />
      <PromptTarget target={{ kind: 'footer', name: 'Footer' }} position="top-5 right-5" touchHidden>
        <div className="container-x relative pb-8 pt-20 sm:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
            {/* Brand + newsletter */}
            <div>
              <Link to="/" className="font-display text-4xl tracking-[0.18em]">
                NOVARA
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                Thoughtfully designed products for modern living. Join our list for early access to new drops and
                10% off your first order.
              </p>
              <div className="mt-6 max-w-md">
                <Newsletter />
              </div>
              <div className="mt-8 flex gap-3">
                {socials.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/85 transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              {columns.map((col) => (
                <div key={col.title}>
                  <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {col.title}
                  </h4>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          to={l.to}
                          className="inline-block text-sm text-white/80 transition duration-300 hover:translate-x-1 hover:text-white"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
            <p>© {new Date().getFullYear()} NOVARA. All rights reserved.</p>
            <p>Demo store — no real payments are processed.</p>
          </div>
        </div>
      </PromptTarget>
    </footer>
  )
}
