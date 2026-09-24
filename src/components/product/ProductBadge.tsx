import type { ProductBadge as ProductBadgeType } from '@/types/commerce'
import { cn } from '@/lib/cn'

type ProductBadgeProps = {
  badge: ProductBadgeType
  className?: string
}

export function ProductBadge({ badge, className }: ProductBadgeProps) {
  return (
    <span
      className={cn(
        'editorial-label absolute left-3 top-3 z-10 bg-canvas/90 px-2.5 py-1.5 text-ink backdrop-blur-sm',
        badge === 'New' && 'text-burgundy',
        badge === 'Thrift' && 'text-ink-secondary',
        className,
      )}
    >
      {badge}
    </span>
  )
}
