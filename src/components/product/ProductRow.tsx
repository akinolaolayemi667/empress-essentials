import { ROUTES } from '@/lib/constants'
import type { Product } from '@/types/commerce'
import { ProductPrice } from './ProductPrice'

type ProductRowProps = {
  product: Product
  onClick?: () => void
}

/** Compact thumbnail + name + price link, for search previews and shop-the-look lists */
export function ProductRow({ product, onClick }: ProductRowProps) {
  return (
    <a
      href={`${ROUTES.product}/${product.slug}`}
      onClick={onClick}
      className="group flex items-center gap-4 py-3"
    >
      <div className="h-20 w-16 shrink-0 overflow-hidden bg-soft">
        <img
          src={product.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="editorial-label text-[0.6rem] text-muted">{product.styleCategory}</p>
        <p className="mt-1 truncate font-display text-lg text-ink transition-colors group-hover:text-burgundy">
          {product.name}
        </p>
      </div>
      <ProductPrice
        price={product.price}
        compareAtPrice={product.compareAtPrice}
        currency={product.currency}
      />
    </a>
  )
}
