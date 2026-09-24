import type { ProductBadge as ProductBadgeType } from '@/types/commerce'
import { cn } from '@/lib/cn'

type ProductBadgeProps = {
  badge: ProductBadgeType
  className?: string
}

const thriftBadges: ProductBadgeType[] = [
  'ONE OF ONE',
  'CURATED FIND',
  'PRE-LOVED',
  'LIMITED PIECE',
  'Thrift',
]

export function ProductBadge({ badge, className }: ProductBadgeProps) {
  const isThriftLabel = thriftBadges.includes(badge)

  return (
    <span
      className={cn(
        'editorial-label absolute left-3 top-3 z-10 max-w-[calc(100%-4.5rem)] bg-canvas/90 px-2.5 py-1.5 text-ink backdrop-blur-sm',
        badge === 'New' && 'text-burgundy',
        isThriftLabel && 'text-burgundy-deep',
        badge === 'Statement' && 'text-ink',
        className,
      )}
    >
      {badge}
    </span>
  )
}
