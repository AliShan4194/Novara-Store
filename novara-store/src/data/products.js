// =====================================================================
//  PRODUCT DATA  —  all products live here. Edit this file to change
//  names, prices, images, colours, etc. No backend needed.
// =====================================================================

// Builds an Unsplash image URL. `variant` gives us extra gallery shots
// by zooming into different parts of the same photo.
export const img = (photoId, w = 900, variant = 0) => {
  const base = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&q=80&w=${w}`
  if (variant === 1) return `${base}&h=${Math.round(w * 1.25)}&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8`
  if (variant === 2) return `${base}&h=${Math.round(w * 1.25)}&crop=focalpoint&fp-x=0.3&fp-y=0.7&fp-z=1.4`
  return `${base}&h=${Math.round(w * 1.25)}`
}

const apparelSizes = ['S', 'M', 'L', 'XL']
const shoeSizes = ['8', '9', '10', '11']
const oneSize = ['One Size']

const C = {
  black: { name: 'Onyx', hex: '#17171a' },
  sand: { name: 'Sand', hex: '#d8c7a8' },
  stone: { name: 'Stone', hex: '#9c9a94' },
  cream: { name: 'Cream', hex: '#efe8da' },
  olive: { name: 'Olive', hex: '#5d6048' },
  navy: { name: 'Navy', hex: '#1f2a44' },
  tan: { name: 'Tan', hex: '#a9744a' },
  white: { name: 'Ivory', hex: '#f6f4ef' },
  rose: { name: 'Rose', hex: '#c9877e' },
  silver: { name: 'Silver', hex: '#c4c6ca' },
  gold: { name: 'Gold', hex: '#c9a35e' },
}

export const products = [
  {
    id: 'oversized-hoodie',
    name: 'Premium Oversized Hoodie',
    category: 'Fashion',
    price: 59,
    originalPrice: 79,
    rating: 4.8,
    reviews: 312,
    photo: 'photo-1556821840-3a63f95609a7',
    colors: [C.black, C.stone, C.sand],
    sizes: apparelSizes,
    sold: 980,
    createdAt: '2026-09-20',
    collections: ['best-sellers', 'trending', 'sale'],
    description:
      'A heavyweight brushed-fleece hoodie cut in a relaxed, oversized silhouette. Garment-washed for a lived-in softness, with a double-layered hood and clean, logo-free detailing.',
  },
  {
    id: 'minimal-leather-bag',
    name: 'Minimal Leather Bag',
    category: 'Accessories',
    price: 89,
    originalPrice: 119,
    rating: 4.9,
    reviews: 204,
    photo: 'photo-1548036328-c9fa89d128fa',
    colors: [C.tan, C.black, C.cream],
    sizes: oneSize,
    sold: 760,
    createdAt: '2026-09-28',
    collections: ['new-arrivals', 'best-sellers', 'sale'],
    description:
      'Full-grain vegetable-tanned leather shaped into a quiet, structured everyday bag. Soft suede lining, hidden magnetic closure and a pocket sized exactly for your phone.',
  },
  {
    id: 'chronograph-watch',
    name: 'Classic Chronograph Watch',
    category: 'Accessories',
    price: 129,
    originalPrice: 169,
    rating: 4.7,
    reviews: 158,
    photo: 'photo-1524592094714-0f0654e20314',
    colors: [C.silver, C.black, C.gold],
    sizes: oneSize,
    sold: 540,
    createdAt: '2026-08-30',
    collections: ['best-sellers', 'limited-edition', 'sale'],
    description:
      'A refined chronograph with a sapphire-coated crystal, brushed steel case and a slim 10mm profile. Water resistant to 50 metres and finished with a Italian-style leather strap.',
  },
  {
    id: 'essential-sneakers',
    name: 'Essential Sneakers',
    category: 'Fashion',
    price: 99,
    originalPrice: null,
    rating: 4.6,
    reviews: 427,
    photo: 'photo-1542291026-7eec264c27ff',
    colors: [C.white, C.black, C.sand],
    sizes: shoeSizes,
    sold: 1210,
    createdAt: '2026-07-14',
    collections: ['best-sellers', 'trending'],
    description:
      'Low-profile court sneakers in smooth premium leather with a cushioned, recycled-foam insole. Minimal by design and comfortable from the first step.',
  },
  {
    id: 'wireless-headphones',
    name: 'Premium Wireless Headphones',
    category: 'Technology',
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    reviews: 689,
    photo: 'photo-1505740420928-5e560c06d30e',
    colors: [C.black, C.silver, C.sand],
    sizes: oneSize,
    sold: 1520,
    createdAt: '2026-09-02',
    collections: ['best-sellers', 'trending', 'sale'],
    description:
      'Adaptive noise cancelling, 40-hour battery life and memory-foam ear cushions tuned for all-day wear. Studio-grade drivers deliver warm, detailed sound over Bluetooth 5.3.',
  },
  {
    id: 'minimal-sunglasses',
    name: 'Minimal Sunglasses',
    category: 'Accessories',
    price: 49,
    originalPrice: 69,
    rating: 4.5,
    reviews: 96,
    photo: 'photo-1572635196237-14b3f281503f',
    colors: [C.black, C.tan, C.silver],
    sizes: oneSize,
    sold: 430,
    createdAt: '2026-10-01',
    collections: ['new-arrivals', 'sale'],
    description:
      'Lightweight acetate frames with polarised UV400 lenses. A timeless rounded shape that suits nearly every face and arrives with a slim protective case.',
  },
  {
    id: 'everyday-backpack',
    name: 'Everyday Backpack',
    category: 'Lifestyle',
    price: 79,
    originalPrice: 99,
    rating: 4.7,
    reviews: 241,
    photo: 'photo-1553062407-98eeb64c6a62',
    colors: [C.olive, C.black, C.navy],
    sizes: oneSize,
    sold: 690,
    createdAt: '2026-08-12',
    collections: ['trending', 'sale'],
    description:
      'A water-repellent backpack with a padded 16" laptop sleeve, quick-access pockets and breathable straps. Built to carry a full day without looking like gear.',
  },
  {
    id: 'signature-perfume',
    name: 'Signature Perfume',
    category: 'Beauty',
    price: 69,
    originalPrice: null,
    rating: 4.8,
    reviews: 372,
    photo: 'photo-1541643600914-78b084683601',
    colors: [C.cream, C.black],
    sizes: ['50ml', '100ml'],
    sold: 880,
    createdAt: '2026-09-25',
    collections: ['new-arrivals', 'limited-edition', 'trending'],
    description:
      'A warm, modern fragrance with notes of bergamot, cedarwood and soft amber. Long-lasting, skin-close and presented in a weighted glass bottle.',
  },
  {
    id: 'linen-overshirt',
    name: 'Linen Overshirt',
    category: 'Fashion',
    price: 74,
    originalPrice: null,
    rating: 4.6,
    reviews: 87,
    photo: 'photo-1596755094514-f87e34085b2c',
    colors: [C.sand, C.olive, C.white],
    sizes: apparelSizes,
    sold: 310,
    createdAt: '2026-10-03',
    collections: ['new-arrivals'],
    description:
      'A breathable European-linen overshirt with mother-of-pearl buttons. Wear it open over a tee or buttoned up — it softens beautifully with every wash.',
  },
  {
    id: 'pour-over-set',
    name: 'Ceramic Pour-Over Set',
    category: 'Lifestyle',
    price: 54,
    originalPrice: null,
    rating: 4.8,
    reviews: 133,
    photo: 'photo-1495474472287-4d71bcdd2085',
    colors: [C.white, C.black],
    sizes: oneSize,
    sold: 360,
    createdAt: '2026-09-10',
    collections: ['trending', 'limited-edition'],
    description:
      'Hand-glazed ceramic dripper and carafe for slow, beautiful mornings. Designed to brew a clean, balanced cup and look good on the counter.',
  },
  {
    id: 'smart-band',
    name: 'Smart Fitness Band',
    category: 'Technology',
    price: 89,
    originalPrice: 109,
    rating: 4.4,
    reviews: 264,
    photo: 'photo-1575311373937-040b8e1fd5b6',
    colors: [C.black, C.rose, C.olive],
    sizes: oneSize,
    sold: 590,
    createdAt: '2026-08-20',
    collections: ['sale', 'trending'],
    description:
      'A slim AMOLED fitness band with heart-rate, sleep and workout tracking. Up to 14 days of battery life and water resistant to 5ATM.',
  },
  {
    id: 'face-serum',
    name: 'Hydrating Face Serum',
    category: 'Beauty',
    price: 39,
    originalPrice: null,
    rating: 4.7,
    reviews: 518,
    photo: 'photo-1620916566398-39f1143ab7be',
    colors: [C.cream],
    sizes: ['30ml', '50ml'],
    sold: 1040,
    createdAt: '2026-09-18',
    collections: ['best-sellers', 'new-arrivals'],
    description:
      'A lightweight hyaluronic and niacinamide serum that hydrates, smooths and balances. Fragrance-free and gentle enough for daily use.',
  },
  {
    id: 'charging-stand',
    name: 'Wireless Charging Stand',
    category: 'Technology',
    price: 45,
    originalPrice: null,
    rating: 4.3,
    reviews: 74,
    photo: 'photo-1608043152269-423dbba4e7e1',
    colors: [C.black, C.white],
    sizes: oneSize,
    sold: 220,
    createdAt: '2026-07-30',
    collections: ['new-arrivals'],
    description:
      'A 15W fast-charging stand with a weighted aluminium base and soft-touch pad. Keeps your phone upright and visible while it charges.',
  },
  {
    id: 'throw-blanket',
    name: 'Woven Throw Blanket',
    category: 'Lifestyle',
    price: 64,
    originalPrice: null,
    rating: 4.9,
    reviews: 112,
    photo: 'photo-1580301762395-21ce84d00bc6',
    colors: [C.cream, C.stone, C.tan],
    sizes: oneSize,
    sold: 295,
    createdAt: '2026-09-05',
    collections: ['limited-edition', 'trending'],
    description:
      'A chunky-woven cotton-blend throw with fringed edges. Soft, breathable and designed to make any sofa feel finished.',
  },
  {
    id: 'card-holder',
    name: 'Leather Card Holder',
    category: 'Accessories',
    price: 35,
    originalPrice: null,
    rating: 4.6,
    reviews: 189,
    photo: 'photo-1627123424574-724758594e93',
    colors: [C.black, C.tan, C.navy],
    sizes: oneSize,
    sold: 640,
    createdAt: '2026-06-22',
    collections: ['best-sellers'],
    description:
      'A slim four-slot card holder in supple full-grain leather. Fits in any pocket and ages into a rich patina.',
  },
  {
    id: 'lip-collection',
    name: 'Matte Lip Collection',
    category: 'Beauty',
    price: 29,
    originalPrice: 38,
    rating: 4.5,
    reviews: 226,
    photo: 'photo-1586495777744-4413f21062fa',
    colors: [C.rose, C.tan, C.black],
    sizes: oneSize,
    sold: 520,
    createdAt: '2026-10-04',
    collections: ['new-arrivals', 'sale'],
    description:
      'Three velvet-matte lip colours in a refined everyday palette. Comfortable, highly pigmented and enriched with vitamin E.',
  },
].map((p) => ({
  ...p,
  discount: p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0,
  // Three gallery images (main + 2 detail crops)
  images: [img(p.photo, 900, 0), img(p.photo, 900, 1), img(p.photo, 900, 2)],
  thumb: img(p.photo, 480, 0),
}))

export const getProduct = (id) => products.find((p) => p.id === id)

// First 8 products are the "Featured" ones on the homepage
export const featuredProducts = products.slice(0, 8)

export const categories = [
  { name: 'Fashion', photo: 'photo-1445205170230-053b83016050', blurb: 'Elevated essentials' },
  { name: 'Accessories', photo: 'photo-1523170335258-f5ed11844a49', blurb: 'The finishing touch' },
  { name: 'Lifestyle', photo: 'photo-1484101403633-562f891dc89a', blurb: 'Made for home & travel' },
  { name: 'Beauty', photo: 'photo-1522335789203-aabd1fc54bc9', blurb: 'Rituals worth keeping' },
  { name: 'Technology', photo: 'photo-1498049794561-7780e7231661', blurb: 'Smart, simply designed' },
]

export const collections = [
  {
    slug: 'new-arrivals',
    name: 'New Arrivals',
    blurb: 'Just landed this season',
    photo: 'photo-1483985988355-763728e1935b',
  },
  {
    slug: 'best-sellers',
    name: 'Best Sellers',
    blurb: 'Loved by thousands',
    photo: 'photo-1441984904996-e0b6ba687e04',
  },
  {
    slug: 'trending',
    name: 'Trending',
    blurb: 'What everyone is wearing',
    photo: 'photo-1469334031218-e382a71b716b',
  },
  {
    slug: 'limited-edition',
    name: 'Limited Edition',
    blurb: 'Small batch, once only',
    photo: 'photo-1490481651871-ab68de25d43d',
  },
  {
    slug: 'sale',
    name: 'Sale',
    blurb: 'Premium pieces, better prices',
    photo: 'photo-1607082348824-0a96f2a4b9da',
  },
]

export const getCollection = (slug) => collections.find((c) => c.slug === slug)

export const productsInCollection = (slug) => {
  if (slug === 'sale') return products.filter((p) => p.discount > 0)
  return products.filter((p) => p.collections.includes(slug))
}

export const allColors = Array.from(
  new Map(products.flatMap((p) => p.colors).map((c) => [c.name, c])).values()
)
export const allSizes = ['S', 'M', 'L', 'XL', '8', '9', '10', '11', '50ml', '100ml', 'One Size']
