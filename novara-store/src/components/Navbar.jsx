import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import PromptTarget from './PromptTarget'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/collections', label: 'Collections' },
  { to: '/new-arrivals', label: 'New Arrivals' },
  { to: '/best-sellers', label: 'Best Sellers' },
  { to: '/about', label: 'About' },
]

function IconButton({ label, onClick, to, children, badge, pulse }) {
  const cls =
    'group/icon relative flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition duration-300 hover:bg-white/10 hover:text-white active:scale-90'
  // the icon "bumps" every time `pulse` changes (used by the cart when an item is added)
  const icon = (
    <motion.span
      key={pulse ?? 'static'}
      initial={pulse ? { scale: 1 } : false}
      animate={pulse ? { scale: [1, 1.28, 1], rotate: [0, -8, 0] } : {}}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="flex transition-transform duration-300 group-hover/icon:scale-110"
    >
      {children}
    </motion.span>
  )
  const badgeEl = badge > 0 && (
    <motion.span
      key={badge}
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-night"
    >
      {badge}
    </motion.span>
  )
  if (to)
    return (
      <Link to={to} aria-label={label} className={cls}>
        {icon}
        {badgeEl}
      </Link>
    )
  return (
    <button type="button" aria-label={label} onClick={onClick} className={cls}>
      {icon}
      {badgeEl}
    </button>
  )
}

export default function Navbar() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen, theme, toggleTheme } = useStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`on-dark sticky top-0 z-40 border-b text-white transition-all duration-500 ${
        scrolled
          ? 'border-white/[0.12] bg-night/92 shadow-[0_18px_44px_-18px_rgba(0,0,0,0.85)] backdrop-blur-2xl'
          : 'border-white/[0.07] bg-night/70 backdrop-blur-md'
      }`}
    >
      <PromptTarget target={{ kind: 'navbar', name: 'Navigation bar' }} position="top-full left-4 mt-2" touchHidden>
        <div className="container-x flex h-[68px] items-center justify-between gap-4">
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="font-display text-[28px] leading-none tracking-[0.18em] text-white drop-shadow-[0_2px_12px_rgba(228,194,144,0.25)] max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
          >
            NOVARA
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 text-sm transition duration-300 hover:text-white ${
                    isActive
                      ? 'font-semibold text-white'
                      : 'text-white/75 after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right icons */}
          <div className="-mr-2 flex items-center">
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </IconButton>
            <div className="hidden sm:block">
              <IconButton label="Account" to="/account">
                <User size={20} />
              </IconButton>
            </div>
            <IconButton label="Wishlist" to="/wishlist" badge={wishlist.length}>
              <Heart size={20} />
            </IconButton>
            <IconButton label="Open cart" onClick={() => setCartOpen(true)} badge={cartCount} pulse={cartCount}>
              <ShoppingBag size={20} />
            </IconButton>
            <div className="hidden sm:block">
              <IconButton label="Toggle dark mode" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
              </IconButton>
            </div>
          </div>
        </div>
      </PromptTarget>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden border-t border-white/10 bg-night/95 lg:hidden"
          >
            <div className="container-x flex flex-col py-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `border-b border-white/10 py-4 font-display text-2xl ${isActive ? 'text-accent' : 'text-white'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="flex gap-3 py-5">
                <Link to="/account" className="btn-glass flex-1">
                  <User size={16} /> Account
                </Link>
                <button type="button" onClick={toggleTheme} className="btn-glass flex-1">
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
