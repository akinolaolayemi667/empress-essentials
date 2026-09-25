import { ChevronDown } from 'lucide-react'
import { useId } from 'react'
import { SORT_OPTIONS } from '@/lib/shop'
import type { ProductSortOption } from '@/types/commerce'

type SortSelectProps = {
  value: ProductSortOption
  onChange: (value: ProductSortOption) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const id = useId()

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="editorial-label text-muted">
        Sort
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value as ProductSortOption)}
          className="editorial-label cursor-pointer appearance-none bg-transparent py-1 pr-5 text-ink"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          size={12}
          strokeWidth={1.5}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ink"
        />
      </div>
    </div>
  )
}
