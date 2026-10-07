// =====================================================================
//  DESIGN PROMPT LOGIC (demo — no API key, no internet needed)
//  Builds a descriptive "design prompt" for whichever element the user
//  selected. Clicking "Regenerate" bumps `seed`, which picks a different
//  mix of style words.
// =====================================================================

const pick = (list, seed, offset = 0) => list[(seed * 7 + offset * 3) % list.length]

const lighting = [
  'soft studio lighting',
  'warm golden-hour glow',
  'diffused natural window light',
  'crisp high-key lighting with gentle shadows',
  'moody low-key lighting with a subtle rim light',
]
const aesthetic = [
  'a luxury editorial aesthetic',
  'a quiet-luxury, magazine-quality feel',
  'a refined Scandinavian minimalism',
  'a modern, high-end boutique look',
  'a calm, premium lifestyle-brand aesthetic',
]
const spacing = [
  'clean spacing',
  'generous negative space',
  'perfectly balanced margins',
  'airy, uncluttered layout',
  'a disciplined grid with breathing room',
]
const type = [
  'elegant typography',
  'a refined serif and clean sans-serif pairing',
  'confident, understated type hierarchy',
  'sophisticated editorial headlines',
]
const shape = [
  'rounded corners',
  'soft 24px rounded cards',
  'subtle shadows and rounded edges',
  'gentle glassmorphism and soft depth',
]
const palette = [
  'a neutral palette of warm ivory, onyx and champagne gold',
  'muted earth tones with a champagne accent',
  'a monochrome palette with a single warm highlight',
  'soft stone, charcoal and brushed-gold details',
]
const motion = [
  'smooth hover micro-interactions',
  'subtle parallax and tilt on hover',
  'gentle easing and a soft spotlight that follows the cursor',
  'slow, elegant zoom on interaction',
]

const productNoun = (p) => (p.name || 'product').toLowerCase()

export function generatePrompt(target, seed = 0) {
  const t = target || {}
  const L = pick(lighting, seed, 1)
  const A = pick(aesthetic, seed, 2)
  const S = pick(spacing, seed, 3)
  const T = pick(type, seed, 4)
  const R = pick(shape, seed, 5)
  const P = pick(palette, seed, 6)
  const M = pick(motion, seed, 7)

  switch (t.kind) {
    case 'product':
      return `Create a premium e-commerce product card featuring a ${productNoun(t)}${
        t.category ? ` from the ${t.category.toLowerCase()} collection` : ''
      }, ${T}, ${L}, ${S}, ${R} and ${A}. Include a price tag${
        t.discount ? ` with a ${t.discount}% discount badge` : ''
      }, a star rating, and a wishlist button. Use ${P} with ${M}.`

    case 'hero':
      return `Design a full-width luxury hero section for a modern lifestyle brand called NOVARA. Large headline "Elevate Your Everyday" set in ${T}, a lifestyle photograph with ${L}, two clear call-to-action buttons, ${S} and ${A}. Use ${P}, layered glass cards and ${M}.`

    case 'category':
      return `Create an elegant category tile for "${t.name}" in an upscale online store: a full-bleed lifestyle photo with ${L}, a soft gradient overlay, ${T}, ${R} and ${S}. Keep it ${A}, using ${P}, with ${M}.`

    case 'collection':
      return `Design an editorial collection card for "${t.name}"${
        t.blurb ? ` ("${t.blurb}")` : ''
      }: a large cinematic image with ${L}, ${T}, a subtle arrow call-to-action, ${R}, ${S} and ${A}. Palette: ${P}.`

    case 'cart':
      return `Design a refined slide-in shopping cart drawer for a premium store: product thumbnails with ${R}, quantity steppers, a clear subtotal, shipping and total summary, ${T}, ${S} and ${A}. Use ${P} with ${M}.`

    case 'section':
      return `Design the "${t.name || 'featured'}" section of a luxury e-commerce homepage: ${T}, a responsive product grid, ${S}, ${R}, ${L} on imagery and ${A}. Use ${P} and ${M}.`

    case 'navbar':
      return `Design a minimal, sticky glass navigation bar for the brand NOVARA with a wordmark logo, six centered links, and search, account, wishlist and cart icons. Use ${T}, ${S}, ${R}, ${P} and ${M}, with ${A}.`

    case 'footer':
      return `Design a premium dark footer for a modern lifestyle store: four link columns, a newsletter signup, social icons, ${T}, ${S}, ${P} and ${A}.`

    default:
      return `Design a premium, modern UI element for a luxury e-commerce website with ${T}, ${L}, ${S}, ${R} and ${A}. Use ${P} with ${M}.`
  }
}
