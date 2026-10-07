import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Banknote, Check, CreditCard, Lock, ShoppingBag, Smartphone } from 'lucide-react'
import { money, useStore } from '../context/StoreContext'
import SmartImage from '../components/SmartImage'

const ORDER_NUMBER = '#NV-10245'

const paymentMethods = [
  { id: 'cod', label: 'Cash on Delivery', hint: 'Pay when your order arrives', icon: Banknote },
  { id: 'card', label: 'Credit / Debit Card', hint: 'Visa, Mastercard, Amex', icon: CreditCard },
  { id: 'online', label: 'Online Payment', hint: 'Bank transfer or digital wallet', icon: Smartphone },
]

const emptyForm = {
  name: '', email: '', phone: '', address: '', city: '', postal: '',
  cardNumber: '', cardExpiry: '', cardCvc: '',
}

function validate(form, payment) {
  const e = {}
  if (form.name.trim().length < 2) e.name = 'Please enter your full name'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address'
  if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number'
  if (form.address.trim().length < 5) e.address = 'Please enter your street address'
  if (form.city.trim().length < 2) e.city = 'Please enter your city'
  if (form.postal.trim().length < 3) e.postal = 'Enter a valid postal code'
  if (payment === 'card') {
    if (form.cardNumber.replace(/\D/g, '').length < 13) e.cardNumber = 'Enter a valid card number'
    if (!/^\d{2}\s?\/\s?\d{2}$/.test(form.cardExpiry)) e.cardExpiry = 'Use MM/YY'
    if (!/^\d{3,4}$/.test(form.cardCvc)) e.cardCvc = '3–4 digits'
  }
  return e
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-500">{error}</span>}
    </label>
  )
}

export default function Checkout() {
  const { cartItems, subtotal, shipping, total, clearCart } = useStore()
  const [form, setForm] = useState(emptyForm)
  const [payment, setPayment] = useState('cod')
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)
  const [order, setOrder] = useState(null)

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const found = validate(form, payment)
    setErrors(found)
    if (Object.keys(found).length) {
      document.querySelector('[data-error="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setPlacing(true)
    // Demo only: pretend to process, then show the confirmation. No real payment happens.
    setTimeout(() => {
      const eta = new Date()
      eta.setDate(eta.getDate() + 4)
      setOrder({
        number: ORDER_NUMBER,
        items: cartItems,
        subtotal, shipping, total,
        customer: form,
        payment: paymentMethods.find((p) => p.id === payment).label,
        eta: eta.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }),
      })
      clearCart()
      setPlacing(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1100)
  }

  // ---------- Order confirmation ----------
  if (order)
    return (
      <div className="container-x max-w-3xl py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent text-night shadow-glow"
          >
            <Check size={38} strokeWidth={2.5} />
          </motion.div>
          <h1 className="mt-8 text-5xl sm:text-6xl">Order Confirmed</h1>
          <p className="mt-3 text-muted">
            Thank you, {order.customer.name.split(' ')[0]}. A confirmation has been sent to {order.customer.email}.
          </p>
          <p className="mt-6 inline-block rounded-full border border-line bg-surface px-6 py-3 text-sm">
            Order number <span className="ml-2 font-semibold tracking-wide">{order.number}</span>
          </p>
        </motion.div>

        <div className="mt-12 rounded-[2rem] border border-line bg-surface p-6 sm:p-9">
          <div className="grid gap-6 border-b border-line pb-7 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Delivery to</p>
              <p className="mt-2 leading-relaxed">
                {order.customer.name}
                <br />
                {order.customer.address}
                <br />
                {order.customer.city}, {order.customer.postal}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Payment</p>
              <p className="mt-2">{order.payment}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Estimated delivery</p>
              <p className="mt-2">{order.eta}</p>
            </div>
          </div>

          <ul className="divide-y divide-line">
            {order.items.map((i) => (
              <li key={i.key} className="flex items-center gap-4 py-4">
                <SmartImage
                  src={i.product.thumb}
                  alt={i.product.name}
                  label={i.product.name}
                  className="h-16 w-14 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{i.product.name}</p>
                  <p className="text-xs text-muted">
                    {i.color}{i.size !== 'One Size' && ` · ${i.size}`} · Qty {i.qty}
                  </p>
                </div>
                <p className="text-sm font-semibold">{money(i.product.price * i.qty)}</p>
              </li>
            ))}
          </ul>

          <dl className="space-y-2 border-t border-line pt-5 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{money(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd>{order.shipping === 0 ? 'Free' : money(order.shipping)}</dd></div>
            <div className="flex justify-between pt-2 text-lg font-semibold"><dt>Total</dt><dd>{money(order.total)}</dd></div>
          </dl>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/shop" className="btn-primary">Continue shopping</Link>
          <Link to="/" className="btn-ghost">Back to home</Link>
        </div>
        <p className="mt-6 text-center text-xs text-muted">This is a demo store — no real payment was taken.</p>
      </div>
    )

  // ---------- Empty cart ----------
  if (cartItems.length === 0)
    return (
      <div className="container-x flex flex-col items-center py-28 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-line/50">
          <ShoppingBag size={30} className="text-muted" />
        </div>
        <h1 className="mt-6 text-5xl">Your cart is empty</h1>
        <p className="mt-2 text-muted">Add a few things to your cart before checking out.</p>
        <Link to="/shop" className="btn-primary mt-8">Start shopping</Link>
      </div>
    )

  const input = (key, props = {}) => (
    <input
      value={form[key]}
      onChange={set(key)}
      data-error={!!errors[key]}
      className={`field ${errors[key] ? 'border-red-400 focus:border-red-400 focus:ring-red-400/15' : ''}`}
      {...props}
    />
  )

  return (
    <div className="container-x py-10 sm:py-14">
      <h1 className="text-5xl sm:text-6xl">Checkout</h1>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
        <Lock size={13} /> Secure demo checkout
      </p>

      <form onSubmit={submit} noValidate className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <div className="space-y-10">
          {/* Contact & shipping */}
          <section>
            <h2 className="mb-5 text-3xl">Contact & delivery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name} className="sm:col-span-2">
                {input('name', { autoComplete: 'name', placeholder: 'Jane Doe' })}
              </Field>
              <Field label="Email" error={errors.email}>
                {input('email', { type: 'email', autoComplete: 'email', placeholder: 'jane@example.com' })}
              </Field>
              <Field label="Phone" error={errors.phone}>
                {input('phone', { type: 'tel', autoComplete: 'tel', placeholder: '+1 555 000 1234' })}
              </Field>
              <Field label="Address" error={errors.address} className="sm:col-span-2">
                {input('address', { autoComplete: 'street-address', placeholder: 'Street, apartment, suite' })}
              </Field>
              <Field label="City" error={errors.city}>
                {input('city', { autoComplete: 'address-level2', placeholder: 'City' })}
              </Field>
              <Field label="Postal code" error={errors.postal}>
                {input('postal', { autoComplete: 'postal-code', placeholder: '00000' })}
              </Field>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="mb-5 text-3xl">Payment</h2>
            <div className="space-y-3">
              {paymentMethods.map(({ id, label, hint, icon: Icon }) => {
                const on = payment === id
                return (
                  <label
                    key={id}
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
                      on ? 'border-ink bg-surface shadow-soft' : 'border-line hover:border-ink/40'
                    }`}
                  >
                    <input type="radio" name="payment" checked={on} onChange={() => setPayment(id)} className="sr-only" />
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${on ? 'border-ink' : 'border-line'}`}>
                      {on && <span className="h-2.5 w-2.5 rounded-full bg-ink" />}
                    </span>
                    <Icon size={22} strokeWidth={1.5} className="shrink-0 text-accent" />
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{label}</span>
                      <span className="block text-xs text-muted">{hint}</span>
                    </span>
                  </label>
                )
              })}
            </div>

            {payment === 'card' && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Card number" error={errors.cardNumber} className="sm:col-span-2">
                  {input('cardNumber', { inputMode: 'numeric', autoComplete: 'off', placeholder: '1234 5678 9012 3456', maxLength: 23 })}
                </Field>
                <Field label="Expiry (MM/YY)" error={errors.cardExpiry}>
                  {input('cardExpiry', { inputMode: 'numeric', autoComplete: 'off', placeholder: 'MM/YY', maxLength: 7 })}
                </Field>
                <Field label="CVC" error={errors.cardCvc}>
                  {input('cardCvc', { inputMode: 'numeric', autoComplete: 'off', placeholder: '123', maxLength: 4 })}
                </Field>
                <p className="text-xs text-muted sm:col-span-2">Demo only — don't enter a real card number. Nothing is sent anywhere.</p>
              </motion.div>
            )}
            {payment === 'online' && (
              <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl bg-accent/10 p-4 text-sm text-muted">
                In a live store you'd be redirected to your bank or wallet to complete payment securely. For this demo, simply place the order.
              </motion.p>
            )}
            {payment === 'cod' && (
              <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl bg-accent/10 p-4 text-sm text-muted">
                Pay in cash when your order is delivered. Please keep the exact amount ready if you can.
              </motion.p>
            )}
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-3xl">Order summary</h2>
            <ul className="mt-5 max-h-72 divide-y divide-line overflow-y-auto">
              {cartItems.map((i) => (
                <li key={i.key} className="flex items-center gap-4 py-3.5">
                  <div className="relative">
                    <SmartImage src={i.product.thumb} alt={i.product.name} label={i.product.name} className="h-16 w-14 rounded-lg object-cover" />
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold text-bg">
                      {i.qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{i.product.name}</p>
                    <p className="text-xs text-muted">{i.color}{i.size !== 'One Size' && ` · ${i.size}`}</p>
                  </div>
                  <p className="text-sm">{money(i.product.price * i.qty)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{money(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd>{shipping === 0 ? 'Free' : money(shipping)}</dd></div>
              <div className="flex justify-between border-t border-line pt-4 text-xl font-semibold"><dt>Total</dt><dd>{money(total)}</dd></div>
            </dl>
            <button type="submit" disabled={placing} className="btn-primary mt-6 w-full py-4">
              {placing ? 'Processing…' : `Place Order · ${money(total)}`}
            </button>
            <p className="mt-4 text-center text-xs text-muted">By placing your order you agree to our terms. Demo only.</p>
          </div>
        </aside>
      </form>
    </div>
  )
}
