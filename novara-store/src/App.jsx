import { useEffect } from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import StudioBackground from './components/StudioBackground'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import QuickViewModal from './components/QuickViewModal'
import SearchOverlay from './components/SearchOverlay'
import PromptPanel from './components/PromptPanel'
import Toast from './components/Toast'

import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Collections from './pages/Collections'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Account from './pages/Account'
import InfoPage from './pages/InfoPage'
import NotFound from './pages/NotFound'

// Scroll to the top whenever the page changes
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// /collections/:slug — remount the Shop page when the collection changes so filters reset
function ShopCollection() {
  const { slug } = useParams()
  return <Shop key={slug} />
}

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen">
      <StudioBackground />
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />

      <main>
        {/* Smooth page transition: the old page fades out quickly, the new one fades in */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop key="shop" />} />
          <Route path="/new-arrivals" element={<Shop key="new-arrivals" collection="new-arrivals" />} />
          <Route path="/best-sellers" element={<Shop key="best-sellers" collection="best-sellers" />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<ShopCollection />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/info/:slug" element={<InfoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Global overlays */}
      <CartDrawer />
      <QuickViewModal />
      <SearchOverlay />
      <PromptPanel />
      <Toast />
    </div>
  )
}
