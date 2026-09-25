import { useState } from 'react'
import { FashionImage } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Product } from '@/types/commerce'

type ProductGalleryProps = {
  product: Product
}

/** Swipeable on mobile, stacked editorial frames on desktop */
export function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.images?.length ? product.images : [product.image]
  const [active, setActive] = useState(0)

  return (
    <div className="relative">
      <ul
        aria-label={`${product.name} images`}
        className="-mx-[var(--spacing-gutter)] flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] sm:mx-0 lg:flex-col lg:gap-3 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        onScroll={(event) => {
          const target = event.currentTarget
          setActive(Math.round(target.scrollLeft / target.clientWidth))
        }}
      >
        {images.map((src, index) => (
          <li key={src} className="w-full shrink-0 snap-start">
            <FashionImage
              src={src}
              alt={index === 0 ? product.name : `${product.name} — view ${index + 1}`}
              aspect="portrait"
              priority={index === 0}
              zoom={false}
            />
          </li>
        ))}
      </ul>

      {images.length > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2 lg:hidden" aria-hidden>
          {images.map((src, index) => (
            <span
              key={src}
              className={cn(
                'h-px w-6 transition-colors duration-300',
                index === active ? 'bg-ink' : 'bg-border',
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
