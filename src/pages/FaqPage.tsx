import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/layout'
import { Container, Disclosure } from '@/components/ui'
import { faqItems } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/lib/constants'

export function FaqPage() {
  useDocumentTitle('FAQ', 'Answers about shipping, thrift pieces, sizing, and shopping with Empress Essentials.')

  return (
    <>
      <PageHeader
        label="Customer Care"
        title="Frequently Asked Questions"
        description="Everything you need to know about shopping with Empress Essentials."
        breadcrumbs={[{ label: 'Home', href: ROUTES.home }, { label: 'FAQ' }]}
      />

      <section aria-label="Questions" className="bg-canvas">
        <Container size="wide" className="pb-[var(--spacing-section)]">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="max-w-xs text-small leading-relaxed text-muted lg:sticky lg:top-32">
                Can&apos;t find what you&apos;re looking for? Our{' '}
                <a
                  href={ROUTES.sizeGuide}
                  className="text-ink underline underline-offset-4 hover:text-burgundy"
                >
                  Size Guide
                </a>{' '}
                covers fit and measuring in detail.
              </p>
            </div>

            <div className="border-t border-border lg:col-span-8">
              {faqItems.map((item, index) => (
                <Disclosure key={item.question} title={item.question} defaultOpen={index === 0}>
                  <p className="max-w-2xl text-body text-ink-secondary">{item.answer}</p>
                  {item.link ? (
                    <a
                      href={item.link.href}
                      className="editorial-label mt-4 inline-flex items-center gap-2 text-ink transition-colors hover:text-burgundy"
                    >
                      {item.link.label}
                      <ArrowRight size={13} strokeWidth={1.5} />
                    </a>
                  ) : null}
                </Disclosure>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
