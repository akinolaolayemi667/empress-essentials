import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react'
import { useCallback, useState, type ReactNode } from 'react'
import { AnnouncementBar } from './AnnouncementBar'
import { BagDrawer } from './BagDrawer'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'
import { SearchOverlay } from './SearchOverlay'
import { Container } from '@/components/ui'
import { DESKTOP_NAV_LINKS, ROUTES } from '@/lib/constants'
import { cn } from '@/lib/cn'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { useScrolled } from '@/hooks/useScrolled'

type IconActionProps = {
  label: string
  onClick?: () => void
  href?: string
  badge?: number
  children: ReactNode
}

function IconAction({ label, onClick, href, badge, children }: IconActionProps) {
  const className =
    'relative flex h-11 w-11 items-center justify-center text-ink transition-opacity duration-300 hover:opacity-60'

  const content = (
    <>
      {children}
      {typeof badge === 'number' && badge > 0 ? (
        <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[0.6rem] font-medium text-canvas">
          {badge > 99 ? '99+' : badge}
        </span>
      ) : null}
    </>
  )

  if (href) {
    return (
      <a href={href} aria-label={label} className={className}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" aria-label={label} className={className} onClick={onClick}>
      {content}
    </button>
  )
}

export function SiteHeader() {
  const scrolled = useScrolled(8)
  const { itemCount } = useCart()
  const { count: wishlistCount } = useWishlist()
  const [searchOpen, setSearchOpen] = useState(false)
  const [bagOpen, setBagOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const openSearch = useCallback(() => {
    setBagOpen(false)
    setMobileOpen(false)
    setSearchOpen(true)
  }, [])

  const openBag = useCallback(() => {
    setSearchOpen(false)
    setMobileOpen(false)
    setBagOpen(true)
  }, [])

  const openMobile = useCallback(() => {
    setSearchOpen(false)
    setBagOpen(false)
    setMobileOpen(true)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-canvas focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <div className="sticky top-0 z-50">
        <AnnouncementBar />

        <header
          className={cn(
            'border-b border-border bg-canvas transition-[background-color,backdrop-filter,box-shadow] duration-500',
            scrolled && 'border-border/80 bg-canvas/85 shadow-none backdrop-blur-md',
          )}
        >
          {/* Desktop */}
          <Container
            size="wide"
            className="hidden h-[4.25rem] items-center justify-between gap-6 lg:flex"
          >
            <nav aria-label="Primary" className="flex min-w-0 flex-1 items-center gap-5 xl:gap-7">
              {DESKTOP_NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="editorial-label whitespace-nowrap text-[0.65rem] text-ink-secondary transition-colors duration-300 hover:text-burgundy xl:text-caption"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="shrink-0 px-4">
              <Logo stacked className="text-center" />
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-0.5">
              <IconAction label="Search" onClick={openSearch}>
                <Search size={18} strokeWidth={1.4} />
              </IconAction>
              <IconAction label="Account" href={ROUTES.account}>
                <User size={18} strokeWidth={1.4} />
              </IconAction>
              <IconAction
                label="Wishlist"
                href={ROUTES.wishlist}
                badge={wishlistCount}
              >
                <Heart size={18} strokeWidth={1.4} />
              </IconAction>
              <IconAction label="Shopping bag" onClick={openBag} badge={itemCount}>
                <ShoppingBag size={18} strokeWidth={1.4} />
              </IconAction>
            </div>
          </Container>

          {/* Mobile / tablet */}
          <Container
            size="wide"
            className="flex h-14 items-center justify-between lg:hidden"
          >
            <IconAction label="Open menu" onClick={openMobile}>
              <Menu size={20} strokeWidth={1.4} />
            </IconAction>

            <Logo className="absolute left-1/2 -translate-x-1/2 text-center" />

            <IconAction label="Shopping bag" onClick={openBag} badge={itemCount}>
              <ShoppingBag size={18} strokeWidth={1.4} />
            </IconAction>
          </Container>
        </header>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <BagDrawer open={bagOpen} onClose={() => setBagOpen(false)} />
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
