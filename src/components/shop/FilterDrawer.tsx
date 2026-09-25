import { Check, X } from 'lucide-react'
import { useEffect, useId, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'
import {
  PRICE_RANGES,
  countActiveFilters,
  toggleValue,
  type ShopQuery,
} from '@/lib/shop'

type FilterDrawerProps = {
  open: boolean
  onClose: () => void
  query: ShopQuery
  onChange: (query: ShopQuery) => void
  facets: { sizes: string[]; colors: string[] }
  resultCount: number
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-b border-border py-7">
      <legend className="editorial-label float-left mb-5 w-full text-ink">{title}</legend>
      <div className="clear-left">{children}</div>
    </fieldset>
  )
}

function OptionRow({
  label,
  selected,
  onToggle,
  type,
}: {
  label: string
  selected: boolean
  onToggle: () => void
  type: 'checkbox' | 'radio'
}) {
  return (
    <button
      type="button"
      role={type}
      aria-checked={selected}
      onClick={onToggle}
      className="flex w-full items-center gap-3 py-2 text-left text-small text-ink transition-colors hover:text-burgundy"
    >
      <span
        aria-hidden
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center border transition-colors',
          type === 'radio' && 'rounded-full',
          selected ? 'border-ink bg-ink text-canvas' : 'border-border',
        )}
      >
        {selected ? <Check size={10} strokeWidth={2} /> : null}
      </span>
      {label}
    </button>
  )
}

export function FilterDrawer({
  open,
  onClose,
  query,
  onChange,
  facets,
  resultCount,
}: FilterDrawerProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduced = usePrefersReducedMotion()
  const activeCount = countActiveFilters(query)

  useBodyScrollLock(open)
  useEscapeKey(onClose, open)

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close filters"
            tabIndex={-1}
            className="fixed inset-0 z-[70] bg-ink/35 backdrop-blur-[2px]"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-y-0 left-0 z-[75] flex w-full max-w-sm flex-col border-r border-border bg-canvas shadow-soft"
            initial={reduced ? false : { x: '-100%' }}
            animate={{ x: 0 }}
            exit={reduced ? undefined : { x: '-100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 id={titleId} className="font-display text-2xl font-medium">
                Filter
                {activeCount > 0 ? (
                  <span className="ml-2 text-base text-muted">({activeCount})</span>
                ) : null}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="flex h-11 w-11 items-center justify-center text-ink transition-opacity hover:opacity-60"
              >
                <X size={18} strokeWidth={1.4} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6">
              {facets.sizes.length > 0 ? (
                <FilterGroup title="Size">
                  <div className="flex flex-wrap gap-2">
                    {facets.sizes.map((size) => {
                      const selected = query.sizes.includes(size)
                      return (
                        <button
                          key={size}
                          type="button"
                          aria-pressed={selected}
                          onClick={() =>
                            onChange({ ...query, sizes: toggleValue(query.sizes, size) })
                          }
                          className={cn(
                            'min-h-10 min-w-10 border px-3 text-small transition-colors duration-300',
                            selected
                              ? 'border-ink bg-ink text-canvas'
                              : 'border-border text-ink hover:border-ink',
                          )}
                        >
                          {size}
                        </button>
                      )
                    })}
                  </div>
                </FilterGroup>
              ) : null}

              {facets.colors.length > 0 ? (
                <FilterGroup title="Colour">
                  <div className="flex flex-col">
                    {facets.colors.map((color) => (
                      <OptionRow
                        key={color}
                        type="checkbox"
                        label={color}
                        selected={query.colors.includes(color)}
                        onToggle={() =>
                          onChange({ ...query, colors: toggleValue(query.colors, color) })
                        }
                      />
                    ))}
                  </div>
                </FilterGroup>
              ) : null}

              <FilterGroup title="Price">
                <div className="flex flex-col" role="radiogroup" aria-label="Price">
                  {PRICE_RANGES.map((range) => (
                    <OptionRow
                      key={range.id}
                      type="radio"
                      label={range.label}
                      selected={query.price === range.id}
                      onToggle={() =>
                        onChange({
                          ...query,
                          price: query.price === range.id ? null : range.id,
                        })
                      }
                    />
                  ))}
                </div>
              </FilterGroup>
            </div>

            <footer className="flex items-center gap-4 border-t border-border px-6 py-5">
              <button
                type="button"
                disabled={activeCount === 0}
                onClick={() => onChange({ ...query, sizes: [], colors: [], price: null })}
                className="editorial-label text-muted underline-offset-4 transition-colors hover:text-ink disabled:opacity-40"
              >
                Clear all
              </button>
              <Button type="button" onClick={onClose} className="flex-1">
                View {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}
              </Button>
            </footer>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
