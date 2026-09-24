import { cn } from '@/lib/cn'

type ProductImageProps = {
  src: string
  alt: string
  className?: string
  aspect?: 'portrait' | 'square' | 'landscape'
}

const aspectClasses = {
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
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
        'relative overflow-hidden bg-stone/40',
        aspectClasses[aspect],
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  )
}
