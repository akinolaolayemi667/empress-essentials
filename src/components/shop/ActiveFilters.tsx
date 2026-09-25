import { X } from 'lucide-react'
import { PRICE_RANGES, countActiveFilters, type ShopQuery } from '@/lib/shop'

type ActiveFiltersProps = {
  query: ShopQuery
  onChange: (query: ShopQuery) => void
}

export function ActiveFilters({ query, onChange }: ActiveFiltersProps) {
  if (countActiveFilters(query) === 0) return null

  const priceLabel = PRICE_RANGES.find((range) => range.id === query.price)?.label

  const chips = [
    ...query.sizes.map((size) => ({
      key: `size-${size}`,
      label: `Size ${size}`,
      remove: () => onChange({ ...query, sizes: query.sizes.filter((item) => item !== size) }),
    })),
    ...query.colors.map((color) => ({
      key: `color-${color}`,
      label: color,
      remove: () => onChange({ ...query, colors: query.colors.filter((item) => item !== color) }),
    })),
    ...(priceLabel
      ? [{ key: 'price', label: priceLabel, remove: () => onChange({ ...query, price: null }) }]
      : []),
  ]

  return (
    <div className="flex flex-wrap items-center gap-2 pt-5">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.remove}
          aria-label={`Remove filter: ${chip.label}`}
          className="inline-flex min-h-9 items-center gap-2 border border-border px-3 text-[0.75rem] text-ink transition-colors hover:border-ink"
        >
          {chip.label}
          <X size={12} strokeWidth={1.5} aria-hidden />
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange({ ...query, sizes: [], colors: [], price: null })}
        className="editorial-label ml-2 text-muted underline underline-offset-4 transition-colors hover:text-ink"
      >
        Clear all
      </button>
    </div>
  )
}
