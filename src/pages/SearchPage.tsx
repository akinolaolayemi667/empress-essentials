import { ArrowRight, Search } from 'lucide-react'
import { useId, useState } from 'react'
import { useSearchParams } from 'react-router'
import { PageHeader } from '@/components/layout'
import { ProductGrid } from '@/components/product'
import { Button, Container } from '@/components/ui'
import { collections, shopListings } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { searchCatalog } from '@/lib/catalog'
import { ROUTES, SEARCH_SUGGESTIONS } from '@/lib/constants'

function SearchForm({
  initialQuery,
  onSearch,
}: {
  initialQuery: string
  onSearch: (query: string) => void
}) {
  const inputId = useId()
  const [draft, setDraft] = useState(initialQuery)

  return (
    <form
      role="search"
      className="mt-10 flex max-w-2xl items-center gap-3 border-b border-ink pb-3"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch(draft.trim())
      }}
    >
      <Search size={18} strokeWidth={1.4} aria-hidden className="shrink-0 text-muted" />
      <label htmlFor={inputId} className="sr-only">
        Search our collection
      </label>
      <input
        id={inputId}
        type="search"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Search by style, colour or category"
        autoComplete="off"
        className="w-full bg-transparent text-body-lg text-ink outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        className="editorial-label inline-flex shrink-0 items-center gap-2 text-ink transition-colors hover:text-burgundy"
      >
        Search
        <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
      </button>
    </form>
  )
}

function Suggestions() {
  return (
    <div>
      <p className="editorial-label mb-4 text-muted">Popular</p>
      <ul className="flex flex-wrap gap-2">
        {SEARCH_SUGGESTIONS.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="inline-flex min-h-10 items-center border border-border px-4 text-small text-ink transition-colors hover:border-ink"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q')?.trim() ?? ''

  useDocumentTitle(query ? `Search: ${query}` : 'Search')

  const results = query ? searchCatalog(query).products : []
  const lowered = query.toLowerCase()
  const relatedListings = query
    ? shopListings.filter((listing) => listing.name.toLowerCase().includes(lowered))
    : []
  const relatedCollections = query
    ? collections.filter((collection) => collection.name.toLowerCase().includes(lowered))
    : []
  const related = [
    ...relatedListings.map((listing) => ({
      label: listing.name,
      href: `${ROUTES.shop}/${listing.slug}`,
    })),
    ...relatedCollections.map((collection) => ({
      label: collection.name,
      href: `${ROUTES.collections}/${collection.slug}`,
    })),
  ]

  return (
    <>
      <PageHeader
        label="Search"
        title={query ? `\u201C${query}\u201D` : 'Search the Collection'}
        description={
          query
            ? `${results.length} ${results.length === 1 ? 'piece' : 'pieces'} found`
            : 'Find pieces by style, colour or category.'
        }
        breadcrumbs={[{ label: 'Home', href: ROUTES.home }, { label: 'Search' }]}
      >
        <SearchForm
          key={query}
          initialQuery={query}
          onSearch={(next) => setParams(next ? { q: next } : {})}
        />
      </PageHeader>

      <section aria-label="Search results" className="bg-canvas">
        <Container size="wide" className="pb-[var(--spacing-section)] pt-4">
          {related.length > 0 ? (
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <p className="editorial-label text-muted">Browse</p>
              {related.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="editorial-label inline-flex items-center gap-2 border-b border-ink pb-1 text-ink transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  {item.label}
                  <ArrowRight size={12} strokeWidth={1.5} aria-hidden />
                </a>
              ))}
            </div>
          ) : null}

          {!query ? (
            <Suggestions />
          ) : results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <div className="flex flex-col items-start gap-10">
              <div>
                <p className="font-display text-h3 text-ink">
                  No pieces match your search.
                </p>
                <p className="mt-3 max-w-md text-small text-muted">
                  Check the spelling, or try something broader — a style like
                  &ldquo;dress&rdquo;, a colour like &ldquo;noir&rdquo;, or
                  &ldquo;thrift&rdquo;.
                </p>
              </div>
              <Suggestions />
              <Button href={ROUTES.shop}>Shop All</Button>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
