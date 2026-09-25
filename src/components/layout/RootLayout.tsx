import type { ReactNode } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { cn } from '@/lib/cn'
import { useInternalLinkNavigation } from '@/hooks/useInternalLinkNavigation'

type RootLayoutProps = {
  children?: ReactNode
  className?: string
}

/** Global page shell with announcement, ecommerce navigation, and footer */
export function RootLayout({ children, className }: RootLayoutProps) {
  useInternalLinkNavigation()

  return (
    <div className={cn('flex min-h-screen flex-col bg-canvas text-ink', className)}>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children ?? <Outlet />}
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  )
}
