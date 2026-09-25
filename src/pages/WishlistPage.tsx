import { PageHeader } from '@/components/layout'
import { ProductGrid } from '@/components/product'
import { Button, Container } from '@/components/ui'
import { getProductById } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useWishlist } from '@/hooks/useWishlist'
import { ROUTES } from '@/lib/constants'
import type { Product } from '@/types/commerce'

export function WishlistPage() {
  useDocumentTitle('Wishlist')
  const { items, clear } = useWishlist()

  const saved = [...items]
    .reverse()
    .map((item) => getProductById(item.productId))
    .filter((product): product is Product => Boolean(product))

  return (
    <>
      <PageHeader
        label="Saved Pieces"
        title="Your Wishlist"
        description={
          saved.length > 0
            ? `${saved.length} ${saved.length === 1 ? 'piece' : 'pieces'} saved for later.`
            : 'Save the pieces you love and come back to them anytime.'
        }
        breadcrumbs={[{ label: 'Home', href: ROUTES.home }, { label: 'Wishlist' }]}
      />

      <section aria-label="Saved pieces" className="bg-canvas">
        <Container size="wide" className="pb-[var(--spacing-section)]">
          {saved.length === 0 ? (
            <div className="flex flex-col items-start border-t border-border py-16 md:py-24">
              <p className="font-display text-h3 text-ink">Nothing saved yet.</p>
              <p className="mt-3 max-w-md text-small text-muted">
                Tap the heart on any piece to keep it here while you decide.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <Button href={ROUTES.newArrivals}>Shop New Arrivals</Button>
                <Button href={ROUTES.thrift} variant="secondary">
                  Explore Thrift
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4 border-y border-border py-4">
                <p className="text-small text-muted">
                  Saved on this device. Hearts remove a piece.
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="editorial-label text-muted underline underline-offset-4 transition-colors hover:text-ink"
                >
                  Clear wishlist
                </button>
              </div>
              <div className="pt-10 md:pt-12">
                <ProductGrid products={saved} />
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  )
}
