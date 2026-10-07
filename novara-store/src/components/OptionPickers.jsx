import { Check } from 'lucide-react'

// Colour swatches
export function ColorPicker({ colors, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((c) => {
        const active = value === c.name
        return (
          <button
            key={c.name}
            type="button"
            title={c.name}
            aria-label={`Colour ${c.name}`}
            aria-pressed={active}
            onClick={() => onChange(c.name)}
            className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition ${
              active ? 'border-ink ring-2 ring-ink/20 ring-offset-2 ring-offset-bg' : 'border-line hover:border-ink/50'
            }`}
            style={{ backgroundColor: c.hex }}
          >
            {active && <Check size={14} className="text-white mix-blend-difference" />}
          </button>
        )
      })}
    </div>
  )
}

// Size chips
export function SizePicker({ sizes, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => {
        const active = value === s
        return (
          <button
            key={s}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(s)}
            className={`min-w-[3rem] rounded-full border px-4 py-2 text-sm transition ${
              active ? 'border-ink bg-ink text-bg' : 'border-line bg-surface hover:border-ink/50'
            }`}
          >
            {s}
          </button>
        )
      })}
    </div>
  )
}
