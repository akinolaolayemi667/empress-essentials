import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'

type FadeProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  delay?: number
  className?: string
  once?: boolean
}

export function Fade({
  children,
  delay = 0,
  className,
  once = true,
  ...props
}: FadeProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: motionDuration.base, delay, ease: editorialEase }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type FadeUpProps = FadeProps & { y?: number }

export function FadeUp({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
  ...props
}: FadeUpProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: motionDuration.slow, delay, ease: editorialEase }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Alias for existing imports */
export function FadeIn(props: FadeUpProps) {
  return <FadeUp {...props} />
}
