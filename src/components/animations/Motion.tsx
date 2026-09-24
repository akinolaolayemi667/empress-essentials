import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'

type ImageRevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  className?: string
  delay?: number
}

/** Soft clip-path style reveal for fashion imagery */
export function ImageReveal({
  children,
  className,
  delay = 0,
  ...props
}: ImageRevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={cn('overflow-hidden', className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={{ opacity: 0, clipPath: 'inset(8% 8% 8% 8%)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, delay, ease: editorialEase }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type SlideProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'left' | 'right' | 'up' | 'down'
  distance?: number
}

const offsets = {
  left: (d: number) => ({ x: -d, y: 0 }),
  right: (d: number) => ({ x: d, y: 0 }),
  up: (d: number) => ({ x: 0, y: -d }),
  down: (d: number) => ({ x: 0, y: d }),
}

export function Slide({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 32,
  ...props
}: SlideProps) {
  const reduced = usePrefersReducedMotion()
  const from = offsets[direction](distance)

  if (reduced) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: motionDuration.slow, delay, ease: editorialEase }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type ScaleProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  className?: string
  delay?: number
  from?: number
}

export function SubtleScale({
  children,
  className,
  delay = 0,
  from = 0.97,
  ...props
}: ScaleProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, scale: from }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: motionDuration.base, delay, ease: editorialEase }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
