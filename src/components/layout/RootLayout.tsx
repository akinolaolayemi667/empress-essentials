import type { ReactNode } from 'react'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { cn } from '@/lib/cn'

type RootLayoutProps = {
  children: ReactNode
  className?: string
}

/** Global page shell with announcement, ecommerce navigation, and footer */
export function RootLayout({ children, className }: RootLayoutProps) {
  return (
    <div className={cn('flex min-h-screen flex-col bg-canvas text-ink', className)}>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
