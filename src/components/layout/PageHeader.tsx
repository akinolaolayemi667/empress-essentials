import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'

type PageHeaderProps = {
  label: string
  title: string
  description?: string
  breadcrumbs?: Crumb[]
  children?: ReactNode
}

/** Editorial page opener — label, serif headline, and quiet supporting copy */
export function PageHeader({
  label,
  title,
  description,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <header className="bg-canvas">
      <Container size="wide" className="pb-10 pt-8 md:pb-14 md:pt-10">
        {breadcrumbs ? (
          <Breadcrumbs items={breadcrumbs} className="mb-10 md:mb-16" />
        ) : null}

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionDuration.slow, ease: editorialEase }}
        >
          <p className="editorial-label mb-4 text-burgundy">{label}</p>
          <h1 className="max-w-4xl font-display text-h1 text-balance">{title}</h1>
          {description ? (
            <p className="mt-5 max-w-xl text-pretty text-body-lg text-muted">
              {description}
            </p>
          ) : null}
        </motion.div>

        {children}
      </Container>
    </header>
  )
}
