import { Star } from 'lucide-react'

export default function Rating({ value, reviews, size = 14, showNumber = true }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= Math.round(value) ? 'fill-accent text-accent' : 'text-line'}
            strokeWidth={1.5}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-xs text-muted">
          {value.toFixed(1)}
          {reviews != null && ` (${reviews})`}
        </span>
      )}
    </div>
  )
}
