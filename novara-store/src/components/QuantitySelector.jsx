import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ value, onChange, min = 1, max = 99, small = false }) {
  const btn = small ? 'h-8 w-8' : 'h-11 w-11'
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-surface">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`${btn} flex items-center justify-center rounded-full transition hover:bg-line/60 disabled:opacity-30`}
      >
        <Minus size={small ? 14 : 16} />
      </button>
      <span className={`${small ? 'w-7 text-sm' : 'w-10'} text-center font-medium tabular-nums`}>{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`${btn} flex items-center justify-center rounded-full transition hover:bg-line/60 disabled:opacity-30`}
      >
        <Plus size={small ? 14 : 16} />
      </button>
    </div>
  )
}
