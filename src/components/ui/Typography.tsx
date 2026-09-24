import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  children: ReactNode
}

/** Oversized magazine-style display type */
export function EditorialDisplay({
  as: Component = 'h1',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-display text-editorial-display font-medium leading-[1.05] tracking-[-0.03em] text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
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
        'font-display text-display-xl font-medium leading-[1.08] tracking-[-0.025em] text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function H1({
  as: Component = 'h1',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-display text-h1 font-medium leading-[1.1] tracking-[-0.02em] text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function H2({
  as: Component = 'h2',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-display text-h2 font-medium leading-[1.15] tracking-[-0.02em] text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function H3({
  as: Component = 'h3',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-display text-h3 font-medium leading-[1.2] tracking-[-0.015em]',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

/** @deprecated Prefer H2 — kept for Phase 1 call sites */
export function Heading(props: TextProps) {
  return <H2 {...props} />
}

/** @deprecated Prefer H3 — kept for Phase 1 call sites */
export function Subheading(props: TextProps) {
  return <H3 {...props} />
}

export function BodyLarge({
  as: Component = 'p',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-body text-body-lg leading-relaxed text-ink-secondary text-pretty',
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
      className={cn(
        'font-body text-body leading-relaxed text-ink-secondary',
        className,
      )}
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
        'font-body text-body-lg leading-relaxed text-muted text-pretty',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Small({
  as: Component = 'p',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn('font-body text-small leading-relaxed text-muted', className)}
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
        'font-body text-caption font-medium uppercase tracking-[0.2em] text-muted',
        className,
      )}
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
        'font-body text-caption font-medium uppercase tracking-[0.22em] text-muted',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
