import type { Product } from '@/types/commerce'
import { cn } from '@/lib/cn'
import { ProductBadge } from './ProductBadge'
import { ProductImage } from './ProductImage'
import { ProductPrice } from './ProductPrice'

type ProductCardProps = {
  product: Product
  className?: string
  onSelect?: (product: Product) => void
  href?: string
}

/** Reusable product card — not mounted in a grid in Phase 1 */
export function ProductCard({
  product,
  className,
  onSelect,
  href,
}: ProductCardProps) {
  const content = (
    <>
      <ProductImage src={product.image} alt={product.name} />
      <div className="mt-4 space-y-1.5">
        {product.badge ? <ProductBadge badge={product.badge} /> : null}
        <h3 className="font-display text-xl font-medium leading-snug text-ink">
          {product.name}
        </h3>
        <ProductPrice
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          currency={product.currency}
        />
        {!product.inStock ? (
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            Sold out
          </p>
        ) : null}
      </div>
    </>
  )

  const sharedClassName = cn(
    'group block text-left transition-opacity duration-300 hover:opacity-90',
    className,
  )

  if (href) {
    return (
      <a href={href} className={sharedClassName}>
        {content}
      </a>
    )
  }

  if (onSelect) {
    return (
      <button
        type="button"
        className={sharedClassName}
        onClick={() => onSelect(product)}
      >
        {content}
      </button>
    )
  }

  return <article className={sharedClassName}>{content}</article>
}
