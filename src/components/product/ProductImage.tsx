import { cn } from '@/lib/cn'

type ProductImageProps = {
  src: string
  alt: string
  className?: string
  aspect?: 'portrait' | 'square' | 'editorial'
}

const aspectClasses = {
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  editorial: 'aspect-[4/5]',
} as const

export function ProductImage({
  src,
  alt,
  className,
  aspect = 'portrait',
}: ProductImageProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-soft',
        aspectClasses[aspect],
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="image-zoom h-full w-full object-cover"
      />
    </div>
  )
}
