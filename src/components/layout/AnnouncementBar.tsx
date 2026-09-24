import { SITE } from '@/lib/constants'
import { cn } from '@/lib/cn'

type AnnouncementBarProps = {
  className?: string
  message?: string
}

export function AnnouncementBar({
  className,
  message = SITE.announcement,
}: AnnouncementBarProps) {
  return (
    <div
      className={cn(
        'border-b border-border bg-soft text-ink',
        className,
      )}
      role="region"
      aria-label="Site announcement"
    >
      <p className="editorial-label px-4 py-2.5 text-center text-[0.625rem] tracking-[0.24em] text-ink-secondary md:text-caption">
        {message}
      </p>
    </div>
  )
}
