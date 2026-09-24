import { Search, X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SEARCH_SUGGESTIONS } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type SearchOverlayProps = {
  open: boolean
  onClose: () => void
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const titleId = useId()
  const reduced = usePrefersReducedMotion()

  useBodyScrollLock(open)
  useEscapeKey(onClose, open)

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 50)
      return () => window.clearTimeout(timer)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/35 px-4 pt-16 backdrop-blur-[2px] sm:pt-24"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              'w-full max-w-2xl border border-border bg-canvas shadow-soft',
            )}
            initial={reduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-4 md:px-7">
              <Search size={18} strokeWidth={1.4} aria-hidden className="text-muted" />
              <label htmlFor={titleId} className="sr-only">
                Search our collection
              </label>
              <input
                ref={inputRef}
                id={titleId}
                type="search"
                placeholder="Search our collection..."
                className="w-full bg-transparent text-body-lg text-ink outline-none placeholder:text-muted"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="flex h-10 w-10 items-center justify-center text-ink transition-opacity hover:opacity-60"
              >
                <X size={18} strokeWidth={1.4} />
              </button>
            </div>

            <div className="px-5 py-6 md:px-7 md:py-8">
              <p className="editorial-label mb-4 text-muted">Suggested</p>
              <ul className="flex flex-col gap-1">
                {SEARCH_SUGGESTIONS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="block py-2.5 font-display text-xl text-ink transition-colors hover:text-burgundy md:text-2xl"
                      onClick={onClose}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
