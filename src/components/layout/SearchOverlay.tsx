import { ArrowRight, Search, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { ProductRow } from '@/components/product/ProductRow'
import { ROUTES, SEARCH_SUGGESTIONS } from '@/lib/constants'
import { searchCatalog } from '@/lib/catalog'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type SearchOverlayProps = {
  open: boolean
  onClose: () => void
}

const MIN_QUERY_LENGTH = 2
const MAX_PREVIEW_RESULTS = 5

function searchPath(query: string) {
  return `${ROUTES.search}?q=${encodeURIComponent(query.trim())}`
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const resultsId = useId()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const trimmed = query.trim()
  const active = trimmed.length >= MIN_QUERY_LENGTH
  const results = active ? searchCatalog(trimmed).products : []
  const preview = results.slice(0, MAX_PREVIEW_RESULTS)

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <form
        role="search"
        className="flex items-center gap-3 border-b border-border px-5 py-4 md:px-7"
        onSubmit={(event) => {
          event.preventDefault()
          if (!trimmed) return
          onClose()
          navigate(searchPath(trimmed))
        }}
      >
        <Search size={18} strokeWidth={1.4} aria-hidden className="text-muted" />
        <label htmlFor={inputId} className="sr-only">
          Search our collection
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search our collection..."
          className="w-full bg-transparent text-body-lg text-ink outline-none placeholder:text-muted"
          autoComplete="off"
          aria-controls={resultsId}
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-ink transition-opacity hover:opacity-60"
        >
          <X size={18} strokeWidth={1.4} />
        </button>
      </form>

      <div id={resultsId} className="max-h-[60vh] overflow-y-auto px-5 py-6 md:px-7 md:py-8">
        <p className="sr-only" aria-live="polite">
          {active ? `${results.length} results for ${trimmed}` : ''}
        </p>

        {!active ? (
          <>
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
          </>
        ) : results.length === 0 ? (
          <div>
            <p className="font-display text-xl text-ink md:text-2xl">
              No pieces found for &ldquo;{trimmed}&rdquo;.
            </p>
            <p className="mt-2 text-small text-muted">
              Try a style, colour or category — like &ldquo;dress&rdquo;,
              &ldquo;noir&rdquo; or &ldquo;thrift&rdquo;.
            </p>
          </div>
        ) : (
          <>
            <p className="editorial-label mb-4 text-muted">Pieces</p>
            <ul className="flex flex-col divide-y divide-border">
              {preview.map((product) => (
                <li key={product.id}>
                  <ProductRow product={product} onClick={onClose} />
                </li>
              ))}
            </ul>

            <a
              href={searchPath(trimmed)}
              onClick={onClose}
              className="editorial-label mt-6 inline-flex items-center gap-2 text-ink transition-colors hover:text-burgundy"
            >
              View all {results.length} {results.length === 1 ? 'result' : 'results'}
              <ArrowRight size={14} strokeWidth={1.5} />
            </a>
          </>
        )}
      </div>
    </>
  )
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const titleId = useId()
  const reduced = usePrefersReducedMotion()

  useBodyScrollLock(open)
  useEscapeKey(onClose, open)

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
            className="w-full max-w-2xl border border-border bg-canvas shadow-soft"
            initial={reduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id={titleId} className="sr-only">
              Search
            </h2>
            <SearchPanel onClose={onClose} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
