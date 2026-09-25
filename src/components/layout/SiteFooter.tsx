import { ArrowUp } from 'lucide-react'
import { Container } from '@/components/ui'
import { Logo } from './Logo'
import { FOOTER_COLUMNS, LEGAL_LINKS, SITE } from '@/lib/constants'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-canvas" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <Container size="wide" className="pb-10 pt-16 md:pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo stacked tone="light" />
            <p className="mt-6 max-w-xs text-pretty text-small leading-relaxed text-canvas/65">
              {SITE.description}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="editorial-label mb-5 text-canvas/50">
                  {column.title}
                </p>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-small text-canvas/85 transition-colors duration-300 hover:text-pink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p
          aria-hidden
          className="mt-16 select-none font-display text-[clamp(2.5rem,11vw,9rem)] font-medium leading-none tracking-[-0.03em] text-canvas/[0.07] md:mt-20"
        >
          EMPRESS ESSENTIALS
        </p>

        <div className="mt-8 flex flex-col gap-5 border-t border-canvas/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.75rem] text-canvas/55">
            © {year} {SITE.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[0.75rem] text-canvas/55 transition-colors hover:text-canvas"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#main-content"
              className="editorial-label inline-flex items-center gap-2 text-canvas/70 transition-colors hover:text-canvas"
            >
              Back to top
              <ArrowUp size={13} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
