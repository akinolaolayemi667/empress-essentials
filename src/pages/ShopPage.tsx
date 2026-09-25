import { SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { PageHeader } from '@/components/layout'
import { ProductGrid } from '@/components/product'
import { ActiveFilters, CategoryNav, FilterDrawer, SortSelect } from '@/components/shop'
import { Button, Container } from '@/components/ui'
import { getShopListing, products, shopAllListing, type ShopListing } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/lib/constants'
import {
  applyShopQuery,
  countActiveFilters,
  getFacetOptions,
  parseShopQuery,
  serializeShopQuery,
  type ShopQuery,
} from '@/lib/shop'
import { NotFoundPage } from './NotFoundPage'

export function ShopPage() {
  const { category } = useParams()
  const listing = getShopListing(category)

  if (!listing) return <NotFoundPage />
  return <ShopListingView listing={listing} />
}

function ShopListingView({ listing }: { listing: ShopListing }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const isAll = listing.slug === shopAllListing.slug

  useDocumentTitle(isAll ? 'Shop All' : listing.name, listing.description)

  const query = parseShopQuery(searchParams)
  const listingProducts = useMemo(() => products.filter(listing.matches), [listing])
  const facets = useMemo(() => getFacetOptions(listingProducts), [listingProducts])
  const results = applyShopQuery(listingProducts, query)
  const activeCount = countActiveFilters(query)

  const updateQuery = (next: ShopQuery) => {
    setSearchParams(serializeShopQuery(next), { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <PageHeader
        label={listing.label}
        title={listing.title}
        description={listing.description}
        breadcrumbs={[
          { label: 'Home', href: ROUTES.home },
          { label: 'Shop', href: isAll ? undefined : ROUTES.shop },
          ...(isAll ? [] : [{ label: listing.name }]),
        ]}
      />

      <section aria-label={`${listing.title} products`} className="bg-canvas">
        <Container size="wide" className="pb-[var(--spacing-section)]">
          <CategoryNav activeSlug={listing.slug} />

          {listingProducts.length === 0 ? (
            <div className="flex flex-col items-start py-20 md:py-28">
              <p className="max-w-lg font-display text-h3 text-balance text-ink">
                {listing.emptyMessage}
              </p>
              <Button href={ROUTES.shop} className="mt-8">
                Shop All
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4 border-b border-border py-4">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="editorial-label inline-flex min-h-10 items-center gap-2.5 text-ink transition-colors hover:text-burgundy"
                >
                  <SlidersHorizontal size={14} strokeWidth={1.5} aria-hidden />
                  Filter
                  {activeCount > 0 ? <span className="text-muted">({activeCount})</span> : null}
                </button>

                <p className="hidden text-small text-muted sm:block" aria-live="polite">
                  {results.length} {results.length === 1 ? 'piece' : 'pieces'}
                </p>

                <SortSelect
                  value={query.sort}
                  onChange={(sort) => updateQuery({ ...query, sort })}
                />
              </div>

              <ActiveFilters query={query} onChange={updateQuery} />

              <div className="pt-10 md:pt-12">
                {results.length > 0 ? (
                  <ProductGrid products={results} />
                ) : (
                  <div className="flex flex-col items-start py-16">
                    <p className="font-display text-h3 text-ink">
                      No pieces match these filters.
                    </p>
                    <p className="mt-3 text-small text-muted">
                      Try removing a filter to see more of the edit.
                    </p>
                    <Button
                      type="button"
                      variant="secondary"
                      className="mt-8"
                      onClick={() => updateQuery({ ...query, sizes: [], colors: [], price: null })}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </Container>
      </section>

      <FilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        query={query}
        onChange={updateQuery}
        facets={facets}
        resultCount={results.length}
      />
    </>
  )
}
