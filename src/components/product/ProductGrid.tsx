import { useState } from 'react'
import { Stagger, StaggerItem } from '@/components/animations'
import { useWishlist } from '@/hooks/useWishlist'
import { cn } from '@/lib/cn'
import type { Product } from '@/types/commerce'
import { ProductCard } from './ProductCard'
import { QuickViewModal } from './QuickViewModal'

type ProductGridProps = {
  products: Product[]
  columns?: 3 | 4
  className?: string
}

/** Product listing grid with wishlist and Quick View wired in */
export function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  const { has, toggle } = useWishlist()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  return (
    <>
      <Stagger
        key={products.map((product) => product.id).join('|')}
        className={cn(
          'grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:gap-x-6 lg:gap-x-7 lg:gap-y-12',
          columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
          className,
        )}
        stagger={0.06}
      >
        {products.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard
              product={product}
              wishlisted={has(product.id)}
              onToggleWishlist={(item) => toggle(item.id)}
              onQuickView={setQuickViewProduct}
            />
          </StaggerItem>
        ))}
      </Stagger>

      <QuickViewModal
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  )
}
