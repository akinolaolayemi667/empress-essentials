import type { ProductBadge as ProductBadgeType } from '@/types/commerce'
import { cn } from '@/lib/cn'

type ProductBadgeProps = {
  badge: ProductBadgeType
  className?: string
}

const badgeTone: Record<ProductBadgeType, string> = {
  New: 'text-wine',
  Thrift: 'text-ink-soft',
  Limited: 'text-wine-deep',
  Statement: 'text-ink',
  Seasonal: 'text-muted',
}

export function ProductBadge({ badge, className }: ProductBadgeProps) {
  return (
    <span
      className={cn(
        'font-body text-[0.625rem] font-medium uppercase tracking-[0.2em]',
        badgeTone[badge],
        className,
      )}
    >
      {badge}
    </span>
  )
}
