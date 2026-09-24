import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type FadeInProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

const ease = [0.22, 1, 0.36, 1] as const

export function FadeIn({
  children,
  delay = 0,
  y = 16,
  className,
  once = true,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
