import { cn } from '@/lib/cn'

export type Crumb = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: Crumb[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] uppercase tracking-[0.18em] text-muted">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <a href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className={cn(last && 'text-ink')}
                >
                  {item.label}
                </span>
              )}
              {!last ? <span aria-hidden>/</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
