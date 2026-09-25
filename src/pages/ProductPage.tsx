import { ArrowRight, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import { Breadcrumbs } from '@/components/layout'
import {
  ProductGallery,
  ProductGrid,
  ProductPrice,
  SizeSelector,
} from '@/components/product'
import { Button, Container, Disclosure } from '@/components/ui'
import {
  getProductById,
  getProductBySlug,
  getRelatedProducts,
  getShopListing,
  shopListings,
} from '@/data'
import { openBagDrawer } from '@/hooks/useBagDrawer'
import { useCart } from '@/hooks/useCart'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { recordProductView, useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { useWishlist } from '@/hooks/useWishlist'
import { cn } from '@/lib/cn'
import { ROUTES, SITE } from '@/lib/constants'
import { formatPrice } from '@/lib/format'
import { productJsonLd } from '@/lib/structuredData'
import type { Product } from '@/types/commerce'
import { NotFoundPage } from './NotFoundPage'

export function ProductPage() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) return <NotFoundPage />
  return <ProductDetail key={product.id} product={product} />
}

function ProductDetail({ product }: { product: Product }) {
  useDocumentTitle(product.name, product.description)

  const reduced = usePrefersReducedMotion()
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const recentIds = useRecentlyViewed()
  const [size, setSize] = useState(product.sizes?.length === 1 ? product.sizes[0] : '')
  const [color, setColor] = useState(product.colors?.[0] ?? '')
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    recordProductView(product.id)
  }, [product.id])

  const wishlisted = has(product.id)
  const related = getRelatedProducts(product)
  const shownIds = new Set([product.id, ...related.map((item) => item.id)])
  const recentlyViewed = recentIds
    .filter((id) => !shownIds.has(id))
    .map((id) => getProductById(id))
    .filter((item): item is Product => Boolean(item))
    .slice(0, 4)
  const listing =
    product.category === 'thrift'
      ? getShopListing('thrift')
      : shopListings.find((item) => item.name === product.styleCategory)
  const listingHref = listing ? `${ROUTES.shop}/${listing.slug}` : ROUTES.shop

  const handleAdd = () => {
    if (product.sizes?.length && !size) {
      setSizeError(true)
      return
    }
    addItem({
      productId: product.id,
      quantity: 1,
      size: size || undefined,
      color: color || undefined,
    })
    openBagDrawer()
  }

  return (
    <>
      <article className="bg-canvas">
        <Container size="wide" className="pt-8 md:pt-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: ROUTES.home },
              { label: 'Shop', href: ROUTES.shop },
              ...(listing ? [{ label: listing.name, href: listingHref }] : []),
              { label: product.name },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
            <div className="lg:col-span-7">
              <ProductGallery product={product} />
            </div>

            <div className="lg:col-span-5">
              <motion.div
                className="lg:sticky lg:top-32"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionDuration.slow, ease: editorialEase }}
              >
                <div className="flex items-center gap-3">
                  <p className="editorial-label text-muted">{product.styleCategory}</p>
                  {product.badge ? (
                    <>
                      <span aria-hidden className="h-px w-6 bg-border" />
                      <p className="editorial-label text-burgundy">{product.badge}</p>
                    </>
                  ) : null}
                </div>

                <h1 className="mt-3 font-display text-[2.25rem] font-medium leading-[1.05] tracking-[-0.02em] text-balance md:text-5xl">
                  {product.name}
                </h1>

                <ProductPrice
                  className="mt-4 text-body-lg"
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  currency={product.currency}
                />

                {product.description ? (
                  <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted">
                    {product.description}
                  </p>
                ) : null}

                {product.condition ? (
                  <p className="mt-5 text-small text-ink-secondary">
                    <span className="editorial-label mr-2 text-muted">Condition</span>
                    {product.condition}
                  </p>
                ) : null}

                <div className="mt-8 space-y-7">
                  {product.colors && product.colors.length > 1 ? (
                    <SizeSelector
                      label="Colour"
                      sizes={product.colors}
                      value={color}
                      onChange={setColor}
                    />
                  ) : product.colors?.length === 1 ? (
                    <p className="text-small text-ink-secondary">
                      <span className="editorial-label mr-2 text-ink">Colour</span>
                      {product.colors[0]}
                    </p>
                  ) : null}

                  {product.sizes && product.sizes.length > 0 ? (
                    <SizeSelector
                      sizes={product.sizes}
                      value={size}
                      error={sizeError}
                      onChange={(option) => {
                        setSize(option)
                        setSizeError(false)
                      }}
                      action={
                        <a
                          href={ROUTES.sizeGuide}
                          className="text-[0.75rem] text-muted underline underline-offset-4 transition-colors hover:text-ink"
                        >
                          Size Guide
                        </a>
                      }
                    />
                  ) : null}
                </div>

                <div className="mt-8 flex gap-3">
                  <Button
                    type="button"
                    size="lg"
                    className="flex-1"
                    onClick={handleAdd}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Bag' : 'Sold Out'}
                  </Button>
                  <button
                    type="button"
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-pressed={wishlisted}
                    onClick={() => toggle(product.id)}
                    className={cn(
                      'flex h-12 w-12 shrink-0 items-center justify-center border transition-colors duration-300',
                      wishlisted
                        ? 'border-burgundy text-burgundy'
                        : 'border-border text-ink hover:border-ink',
                    )}
                  >
                    <Heart
                      size={17}
                      strokeWidth={1.4}
                      fill={wishlisted ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>

                <p className="mt-4 text-[0.75rem] text-muted">
                  Free shipping on orders over{' '}
                  {formatPrice(SITE.freeShippingThreshold, product.currency)}.
                </p>

                <div className="mt-10 border-t border-border">
                  <Disclosure title="Details" defaultOpen>
                    <ul className="space-y-1.5">
                      <li>Style: {product.styleCategory}</li>
                      {product.sizes?.length ? (
                        <li>Sizes: {product.sizes.join(', ')}</li>
                      ) : null}
                      {product.colors?.length ? (
                        <li>Colour: {product.colors.join(', ')}</li>
                      ) : null}
                      {product.condition ? (
                        <li>Condition: {product.condition}</li>
                      ) : null}
                    </ul>
                  </Disclosure>
                  {product.category === 'thrift' ? (
                    <Disclosure title="About Thrift">
                      Every thrift piece is individually selected for its
                      character, quality and style. Each find is singular, so
                      the piece you see is the piece you receive.
                    </Disclosure>
                  ) : null}
                  <Disclosure title="Shipping & Returns">
                    Free shipping on orders over{' '}
                    {formatPrice(SITE.freeShippingThreshold, product.currency)}.
                    Shipping and taxes for other orders are calculated at
                    checkout.{' '}
                    <a
                      href={ROUTES.shipping}
                      className="text-ink underline underline-offset-4 hover:text-burgundy"
                    >
                      Shipping &amp; Returns details
                    </a>
                  </Disclosure>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="bg-canvas">
          <Container size="wide" className="py-[var(--spacing-section)]">
            <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="editorial-label mb-3 text-burgundy">Complete the Look</p>
                <h2 id="related-heading" className="font-display text-h2 text-balance">
                  You May Also Like
                </h2>
              </div>
              <a
                href={listingHref}
                className="editorial-label inline-flex items-center gap-2 self-start text-ink transition-colors hover:text-burgundy md:self-auto"
              >
                View All
                <ArrowRight size={14} strokeWidth={1.5} />
              </a>
            </div>
            <ProductGrid products={related} />
          </Container>
        </section>
      ) : null}

      {recentlyViewed.length > 0 ? (
        <section aria-labelledby="recent-heading" className="border-t border-border bg-canvas">
          <Container size="wide" className="py-[var(--spacing-section)]">
            <div className="mb-10 md:mb-14">
              <p className="editorial-label mb-3 text-burgundy">Your History</p>
              <h2 id="recent-heading" className="font-display text-h2 text-balance">
                Recently Viewed
              </h2>
            </div>
            <ProductGrid products={recentlyViewed} />
          </Container>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productJsonLd(product) }}
      />
    </>
  )
}
