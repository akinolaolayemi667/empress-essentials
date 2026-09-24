import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

type SectionTone = 'canvas' | 'elevated' | 'ink'

const toneClasses: Record<SectionTone, string> = {
  canvas: 'bg-canvas text-ink',
  elevated: 'bg-canvas-elevated text-ink',
  ink: 'bg-ink text-canvas',
}

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  tone?: SectionTone
  contained?: boolean
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: ReactNode
  eyebrow?: string
  title?: string
  description?: string
}

export function Section({
  as: Component = 'section',
  tone = 'canvas',
  contained = true,
  containerSize = 'xl',
  children,
  className,
  eyebrow,
  title,
  description,
  ...props
}: SectionProps) {
  const header =
    eyebrow || title || description ? (
      <header className="mb-10 max-w-2xl md:mb-14">
        {eyebrow ? (
          <p className="mb-3 font-body text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="font-display text-display-md text-balance">{title}</h2>
        ) : null}
        {description ? (
          <p className="mt-4 text-pretty text-editorial text-muted">
            {description}
          </p>
        ) : null}
      </header>
    ) : null

  const content = (
    <>
      {header}
      {children}
    </>
  )

  return (
    <Component
      className={cn(
        'py-[var(--spacing-section)]',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {contained ? (
        <Container size={containerSize}>{content}</Container>
      ) : (
        content
      )}
    </Component>
  )
}
