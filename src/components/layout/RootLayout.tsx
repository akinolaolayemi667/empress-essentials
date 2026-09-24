import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type RootLayoutProps = {
  children: ReactNode
  className?: string
}

/**
 * Semantic page shell for Phase 2+.
 * Intentionally excludes Navbar and Footer until those phases.
 */
export function RootLayout({ children, className }: RootLayoutProps) {
  return (
    <div className={cn('flex min-h-screen flex-col bg-canvas text-ink', className)}>
      <main id="main-content" className="flex-1">
        {children}
      </main>
    </div>
  )
}
