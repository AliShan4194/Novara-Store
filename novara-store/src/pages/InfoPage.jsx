import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../context/StoreContext'

// Simple content pages linked from the footer (Contact, Shipping, Returns, FAQs, Our Story, Careers).
const pages = {
  shipping: {
    title: 'Shipping',
    intro: 'Fast, tracked delivery on every order.',
    sections: [
      { h: 'Free shipping', p: 'Orders over $50 ship free. Orders under $50 have a flat $6.99 shipping fee.' },
      { h: 'Delivery times', p: 'Standard delivery takes 3–5 business days. You will receive tracking details by email as soon as your order ships.' },
      { h: 'Order processing', p: 'Orders placed before 2 PM are usually dispatched the same business day.' },
    ],
  },
  returns: {
    title: 'Returns',
    intro: 'Not quite right? Send it back within 30 days.',
    sections: [
      { h: '30-day returns', p: 'Items can be returned within 30 days of delivery if unworn, unwashed and in original packaging.' },
      { h: 'How to return', p: 'Contact our team with your order number and we will email you a prepaid return label.' },
      { h: 'Refunds', p: 'Refunds are issued to your original payment method within 5–7 business days of us receiving your return.' },
    ],
  },
  'our-story': {
    title: 'Our Story',
    intro: 'NOVARA is a modern lifestyle brand focused on thoughtful design, quality and simplicity.',
    sections: [
      { h: 'Where we started', p: 'A small team, a shared frustration with disposable products and a belief that fewer, better things make life calmer.' },
      { h: 'How we work', p: 'We design in-house, collaborate with trusted makers and test every piece in real life before it reaches you.' },
    ],
    cta: { to: '/about', label: 'Read more about us' },
  },
  careers: {
    title: 'Careers',
    intro: 'Help us build a calmer, better-designed way to shop.',
    sections: [
      { h: 'Join the team', p: 'We are a small, design-led team. We have no open roles right now, but we love meeting talented people — send your portfolio to careers@novara.example.' },
    ],
  },
}

const faqs = [
  { q: 'How long does delivery take?', a: 'Standard delivery takes 3–5 business days. Orders over $50 ship free.' },
  { q: 'Can I return an item?', a: 'Yes. You have 30 days from delivery to return unworn items in their original packaging.' },
  { q: 'Which payment methods do you accept?', a: 'Cash on delivery, credit/debit cards and online payment. This demo store does not process real payments.' },
  { q: 'How do I track my order?', a: 'You will receive an email with a tracking link as soon as your order has shipped.' },
  { q: 'Do you offer gift wrapping?', a: 'Gift wrapping is coming soon. Our packaging is already recycled and presentation-ready.' },
]

function Shell({ title, intro, children }) {
  return (
    <div className="container-x max-w-3xl py-14 sm:py-20">
      <p className="eyebrow">NOVARA</p>
      <h1 className="mt-3 text-5xl sm:text-7xl">{title}</h1>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
      <div className="mt-10">{children}</div>
    </div>
  )
}

function Faqs() {
  const [open, setOpen] = useState(0)
  return (
    <Shell title="FAQs" intro="Quick answers to common questions.">
      <div className="divide-y divide-line rounded-[1.75rem] border border-line bg-surface">
        {faqs.map((f, i) => (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium"
            >
              {f.q}
              <ChevronDown size={18} className={`shrink-0 transition ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-muted">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Shell>
  )
}

function Contact() {
  const { showToast } = useStore()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 5)
      return setError('Please fill in your name, a valid email and a short message.')
    setError('')
    showToast('Message sent — we’ll reply within 24 hours (demo)')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <Shell title="Contact" intro="We usually reply within one business day.">
      <form onSubmit={submit} noValidate className="space-y-4 rounded-[2rem] border border-line bg-surface p-7">
        <input className="field" placeholder="Your name" value={form.name} onChange={update('name')} />
        <input className="field" type="email" placeholder="Email address" value={form.email} onChange={update('email')} />
        <textarea className="field min-h-[140px] resize-y" placeholder="How can we help?" value={form.message} onChange={update('message')} />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" className="btn-primary">Send message</button>
      </form>
    </Shell>
  )
}

export default function InfoPage() {
  const { slug } = useParams()

  if (slug === 'faqs') return <Faqs />
  if (slug === 'contact') return <Contact />

  const page = pages[slug]
  if (!page)
    return (
      <Shell title="Page not found" intro="Sorry, we couldn't find that page.">
        <Link to="/" className="btn-primary">Back to home</Link>
      </Shell>
    )

  return (
    <Shell title={page.title} intro={page.intro}>
      <div className="space-y-8">
        {page.sections.map((s) => (
          <div key={s.h} className="border-t border-line pt-6">
            <h2 className="text-3xl">{s.h}</h2>
            <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
          </div>
        ))}
      </div>
      {page.cta && (
        <Link to={page.cta.to} className="btn-primary mt-10">{page.cta.label}</Link>
      )}
    </Shell>
  )
}
