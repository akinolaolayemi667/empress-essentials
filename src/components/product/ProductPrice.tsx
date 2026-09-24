import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/cn'

type ProductPriceProps = {
  price: number
  compareAtPrice?: number
  currency?: 'USD' | 'GBP' | 'EUR'
  className?: string
}

export function ProductPrice({
  price,
  compareAtPrice,
  currency = 'USD',
  className,
}: ProductPriceProps) {
  const onSale = typeof compareAtPrice === 'number' && compareAtPrice > price

  return (
    <p
      className={cn(
        'font-body text-small tracking-wide text-ink tabular-nums',
        className,
      )}
    >
      <span>{formatPrice(price, currency)}</span>
      {onSale ? (
        <span className="ml-2 text-muted line-through">
          {formatPrice(compareAtPrice, currency)}
        </span>
      ) : null}
    </p>
  )
}
