import { cn } from '@/lib/cn'
import { ROUTES, SITE } from '@/lib/constants'

type LogoProps = {
  className?: string
  stacked?: boolean
  href?: string
  onClick?: () => void
  tone?: 'dark' | 'light'
}

export function Logo({
  className,
  stacked = false,
  href = ROUTES.home,
  onClick,
  tone = 'dark',
}: LogoProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'font-display font-medium tracking-[-0.02em] transition-opacity duration-300 hover:opacity-70',
        tone === 'dark' ? 'text-ink' : 'text-canvas',
        className,
      )}
      aria-label={SITE.name}
    >
      {stacked ? (
        <span className="flex flex-col leading-[0.95]">
          <span className="text-[1.15rem] md:text-[1.35rem]">EMPRESS</span>
          <span className="text-[0.95rem] tracking-[0.08em] md:text-[1.1rem]">
            ESSENTIALS
          </span>
        </span>
      ) : (
        <span className="text-[1.05rem] tracking-[0.04em] md:text-[1.2rem] lg:text-[1.35rem]">
          EMPRESS ESSENTIALS
        </span>
      )}
    </a>
  )
}
