import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

type SectionTone = 'canvas' | 'soft' | 'elevated' | 'ink'

const toneClasses: Record<SectionTone, string> = {
  canvas: 'bg-canvas text-ink',
  soft: 'bg-soft text-ink',
  elevated: 'bg-canvas-elevated text-ink',
  ink: 'bg-ink text-canvas',
}

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  tone?: SectionTone
  contained?: boolean
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'wide' | 'full'
  children: ReactNode
  eyebrow?: string
  title?: string
  description?: string
  align?: 'left' | 'center' | 'asymmetric'
}

export function Section({
  as: Component = 'section',
  tone = 'canvas',
  contained = true,
  containerSize = 'wide',
  children,
  className,
  eyebrow,
  title,
  description,
  align = 'left',
  ...props
}: SectionProps) {
  const headerAlign =
    align === 'center'
      ? 'mx-auto max-w-2xl text-center'
      : align === 'asymmetric'
        ? 'ml-0 max-w-xl md:ml-[8%] md:max-w-2xl'
        : 'max-w-2xl'

  const header =
    eyebrow || title || description ? (
      <header className={cn('mb-12 md:mb-16', headerAlign)}>
        {eyebrow ? (
          <p className="editorial-label mb-4 text-muted">{eyebrow}</p>
        ) : null}
        {title ? (
          <h2 className="font-display text-h2 text-balance">{title}</h2>
        ) : null}
        {description ? (
          <p className="mt-5 text-pretty text-body-lg text-muted">
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
