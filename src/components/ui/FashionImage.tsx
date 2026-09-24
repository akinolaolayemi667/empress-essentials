import { useState } from 'react'
import { cn } from '@/lib/cn'

type FashionImageProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  aspect?: 'portrait' | 'square' | 'editorial' | 'wide' | 'auto'
  priority?: boolean
  zoom?: boolean
}

const aspectClasses = {
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  editorial: 'aspect-[4/5]',
  wide: 'aspect-[16/10]',
  auto: '',
} as const

/**
 * Editorial image shell — swap `src` paths in data files to replace photography.
 * Soft brand-toned fallthrough while loading; object-cover crops never distort.
 */
export function FashionImage({
  src,
  alt,
  className,
  imgClassName,
  aspect = 'portrait',
  priority = false,
  zoom = true,
}: FashionImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-soft',
        aspectClasses[aspect],
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-soft via-pink/30 to-border transition-opacity duration-700',
          loaded ? 'opacity-0' : 'opacity-100',
        )}
      />
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover object-center transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
          zoom && 'image-zoom',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
    </div>
  )
}
