import { Heart } from 'lucide-react'
import type { Product } from '@/types/commerce'
import { cn } from '@/lib/cn'
import { ROUTES } from '@/lib/constants'
import { FashionImage } from '@/components/ui'
import { ProductBadge } from './ProductBadge'
import { ProductPrice } from './ProductPrice'

type ProductCardProps = {
  product: Product
  className?: string
  href?: string
  wishlisted?: boolean
  onSelect?: (product: Product) => void
  onQuickView?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
}

/** Image-forward product card — fashion editorial, minimal chrome */
export function ProductCard({
  product,
  className,
  href,
  wishlisted = false,
  onSelect,
  onQuickView,
  onToggleWishlist,
}: ProductCardProps) {
  const productHref = href ?? `${ROUTES.product}/${product.slug}`
  const secondary = product.images?.[1]

  return (
    <article className={cn('group relative text-left', className)}>
      <div className="relative overflow-hidden bg-soft">
        {product.badge ? <ProductBadge badge={product.badge} /> : null}

        {onToggleWishlist ? (
          <button
            type="button"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            className={cn(
              'absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center bg-canvas/90 text-ink backdrop-blur-sm transition-all duration-500',
              wishlisted
                ? 'opacity-100'
                : 'opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100',
              'hover:text-burgundy motion-reduce:opacity-100',
            )}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onToggleWishlist(product)
            }}
          >
            <Heart
              size={16}
              strokeWidth={1.4}
              fill={wishlisted ? 'currentColor' : 'none'}
              className={cn(wishlisted && 'text-burgundy')}
            />
          </button>
        ) : null}

        <a
          href={productHref}
          className="relative block"
          onClick={(event) => {
            if (onSelect) {
              event.preventDefault()
              onSelect(product)
            }
          }}
        >
          <FashionImage
            src={product.image}
            alt={product.name}
            aspect="portrait"
            zoom
            className={cn(secondary && 'transition-opacity duration-700 group-hover:opacity-0')}
          />
          {secondary ? (
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 motion-reduce:hidden">
              <FashionImage
                src={secondary}
                alt=""
                aspect="portrait"
                zoom={false}
                className="h-full w-full"
              />
            </div>
          ) : null}
        </a>

        {onQuickView ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:opacity-100">
            <button
              type="button"
              className="pointer-events-auto editorial-label min-h-10 bg-canvas px-4 py-2.5 text-ink shadow-soft transition-transform duration-500 hover:-translate-y-0.5"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onQuickView(product)
              }}
            >
              Quick View
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-3 space-y-1 sm:mt-4 sm:space-y-1.5">
        <p className="editorial-label text-[0.6rem] text-muted sm:text-caption">
          {product.styleCategory}
        </p>
        <h3 className="font-display text-base font-medium leading-snug text-ink sm:text-lg md:text-[1.35rem]">
          <a
            href={productHref}
            className="transition-colors hover:text-burgundy"
          >
            {product.name}
          </a>
        </h3>
        <ProductPrice
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          currency={product.currency}
        />
        {!product.inStock ? (
          <p className="editorial-label text-muted">Sold out</p>
        ) : null}
      </div>
    </article>
  )
}
