import { Heart } from 'lucide-react'
import type { Product } from '@/types/commerce'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/format'
import { ProductBadge } from './ProductBadge'
import { ProductImage } from './ProductImage'
import { ProductPrice } from './ProductPrice'

const categoryLabels: Record<Product['category'], string> = {
  new: 'New Clothing',
  thrift: 'Thrift',
  womens: "Women's",
  statement: 'Statement',
  seasonal: 'Seasonal',
}

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
  const openProduct = () => {
    if (onSelect) onSelect(product)
  }

  return (
    <article className={cn('group relative text-left', className)}>
      <div className="relative">
        {product.badge ? <ProductBadge badge={product.badge} /> : null}

        {onToggleWishlist ? (
          <button
            type="button"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center bg-canvas/90 text-ink backdrop-blur-sm transition-colors duration-300 hover:text-burgundy"
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

        {href ? (
          <a href={href} className="block" onClick={openProduct}>
            <ProductImage src={product.image} alt={product.name} />
          </a>
        ) : (
          <button type="button" className="block w-full" onClick={openProduct}>
            <ProductImage src={product.image} alt={product.name} />
          </button>
        )}

        {onQuickView ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:opacity-100">
            <button
              type="button"
              className="pointer-events-auto editorial-label min-h-10 bg-canvas px-4 py-2.5 text-ink shadow-soft transition-transform duration-500 hover:-translate-y-0.5"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onQuickView(product)
              }}
            >
              Quick view
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-4 space-y-1.5">
        <p className="editorial-label text-muted">
          {categoryLabels[product.category]}
        </p>
        <h3 className="font-display text-xl font-medium leading-snug text-ink md:text-[1.35rem]">
          {href ? (
            <a href={href} className="transition-colors hover:text-burgundy">
              {product.name}
            </a>
          ) : (
            product.name
          )}
        </h3>
        <ProductPrice
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          currency={product.currency}
        />
        {!product.inStock ? (
          <p className="editorial-label text-muted">Sold out</p>
        ) : null}
        <span className="sr-only">{formatPrice(product.price, product.currency)}</span>
      </div>
    </article>
  )
}
