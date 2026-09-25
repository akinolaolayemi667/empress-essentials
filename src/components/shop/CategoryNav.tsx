import { motion } from 'framer-motion'
import { shopAllListing, shopListings } from '@/data/shopListings'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/cn'

type CategoryNavProps = {
  activeSlug: string
}

export function CategoryNav({ activeSlug }: CategoryNavProps) {
  const reduced = usePrefersReducedMotion()
  const items = [shopAllListing, ...shopListings]

  return (
    <nav
      aria-label="Shop categories"
      className="-mx-[var(--spacing-gutter)] overflow-x-auto px-[var(--spacing-gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex min-w-max gap-7 border-b border-border md:gap-9">
        {items.map((item) => {
          const active = item.slug === activeSlug
          const href = item.slug === shopAllListing.slug ? ROUTES.shop : `${ROUTES.shop}/${item.slug}`

          return (
            <li key={item.slug}>
              <a
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'editorial-label relative block pb-4 transition-colors duration-300',
                  active ? 'text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {item.name}
                {active ? (
                  reduced ? (
                    <span className="absolute inset-x-0 -bottom-px h-px bg-ink" />
                  ) : (
                    <motion.span
                      layoutId="shop-category-underline"
                      className="absolute inset-x-0 -bottom-px h-px bg-ink"
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )
                ) : null}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
