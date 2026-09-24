import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  children: ReactNode
}

export function Display({
  as: Component = 'h1',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-display text-display-xl font-medium tracking-[-0.02em] text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Heading({
  as: Component = 'h2',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-display text-display-md font-medium text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Subheading({
  as: Component = 'h3',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn('font-display text-2xl font-medium md:text-3xl', className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Eyebrow({
  as: Component = 'p',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-body text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Body({
  as: Component = 'p',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn('font-body text-base leading-relaxed text-ink-soft', className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Lead({
  as: Component = 'p',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-body text-editorial leading-relaxed text-muted text-pretty',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Caption({
  as: Component = 'p',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-body text-xs uppercase tracking-[0.16em] text-muted',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
