import { Plus } from 'lucide-react'
import type { ReactNode } from 'react'

type DisclosureProps = {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}

/** Native details/summary accordion row with an editorial plus marker */
export function Disclosure({ title, defaultOpen = false, children }: DisclosureProps) {
  return (
    <details className="group border-b border-border" open={defaultOpen}>
      <summary className="editorial-label flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <Plus
          size={14}
          strokeWidth={1.5}
          aria-hidden
          className="shrink-0 transition-transform duration-300 group-open:rotate-45"
        />
      </summary>
      <div className="pb-6 text-small leading-relaxed text-muted">{children}</div>
    </details>
  )
}
