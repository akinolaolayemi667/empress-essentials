import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'wide' | 'full'

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  wide: 'max-w-[var(--container-wide)]',
  full: 'max-w-none',
}

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
  size?: ContainerSize
  children: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'>

export function Container<T extends ElementType = 'div'>({
  as,
  size = 'wide',
  children,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component
      className={cn(
        'mx-auto w-full px-[var(--spacing-gutter)]',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
