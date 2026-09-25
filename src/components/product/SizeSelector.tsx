import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SizeSelectorProps = {
  sizes: string[]
  value: string
  onChange: (size: string) => void
  label?: string
  error?: boolean
  action?: ReactNode
  className?: string
}

/** Single-choice option picker — sizes by default, reusable for colours */
export function SizeSelector({
  sizes,
  value,
  onChange,
  label = 'Size',
  error = false,
  action,
  className,
}: SizeSelectorProps) {
  const legendId = useId()

  return (
    <fieldset className={cn('relative', className)}>
      <legend id={legendId} className="editorial-label mb-3 text-ink">
        {label}
      </legend>
      {action ? <div className="absolute right-0 top-0">{action}</div> : null}
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby={legendId}>
        {sizes.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            className={cn(
              'min-h-11 min-w-11 border px-3 text-small transition-colors duration-300',
              value === option
                ? 'border-ink bg-ink text-canvas'
                : 'border-border bg-canvas text-ink hover:border-ink',
            )}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {error ? (
        <p className="mt-2 text-small text-burgundy" role="alert">
          Please select a {label.toLowerCase()}
        </p>
      ) : null}
    </fieldset>
  )
}
