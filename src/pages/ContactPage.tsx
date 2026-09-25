import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/layout'
import { Button, Container } from '@/components/ui'
import { business, contactChannels } from '@/data'
import type { ContactChannel } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/lib/constants'

function channelHref({ id, value }: ContactChannel): string {
  switch (id) {
    case 'email':
      return `mailto:${value}`
    case 'phone':
      return `tel:${value.replace(/[^\d+]/g, '')}`
    case 'whatsapp':
      return `https://wa.me/${value.replace(/\D/g, '')}`
    case 'instagram':
      return `https://instagram.com/${value.replace(/^@/, '')}`
  }
}

export function ContactPage() {
  useDocumentTitle('Contact', `Get in touch with ${business.name} in ${business.location}.`)
  const available = contactChannels.some((channel) => channel.value)

  return (
    <>
      <PageHeader
        label="Customer Care"
        title="Contact"
        description="Questions about an order, sizing or a thrift piece? We’d love to hear from you."
        breadcrumbs={[{ label: 'Home', href: ROUTES.home }, { label: 'Contact' }]}
      />

      <section aria-label="Contact details" className="bg-canvas">
        <Container size="wide" className="pb-[var(--spacing-section)]">
          <div className="grid gap-12 border-t border-border pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-14">
            <div className="lg:col-span-7">
              {!available ? (
                <p className="mb-8 border-l-2 border-burgundy pl-4 text-small text-ink-secondary">
                  Our contact channels are being set up and will appear here shortly.
                </p>
              ) : null}

              <dl className="border-t border-ink">
                {contactChannels.map((channel) => {
                  const external = channel.id === 'whatsapp' || channel.id === 'instagram'
                  return (
                    <div
                      key={channel.id}
                      className="flex flex-col gap-1 border-b border-border py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <dt className="editorial-label text-muted">{channel.label}</dt>
                      <dd className="font-display text-2xl text-ink sm:text-right">
                        {channel.value ? (
                          <a
                            href={channelHref(channel)}
                            className="transition-colors hover:text-burgundy"
                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            {channel.value}
                          </a>
                        ) : (
                          <span className="text-muted">Coming soon</span>
                        )}
                      </dd>
                    </div>
                  )
                })}
                <div className="flex flex-col gap-1 border-b border-border py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="editorial-label text-muted">Based In</dt>
                  <dd className="font-display text-2xl text-ink sm:text-right">{business.location}</dd>
                </div>
              </dl>
            </div>

            <aside className="lg:col-span-5">
              <div className="bg-soft px-6 py-8 md:px-8">
                <h2 className="font-display text-h3 text-ink">Returning a piece?</h2>
                <p className="mt-3 text-small leading-relaxed text-muted">
                  New pieces can be returned within {business.returnWindowDays} days of
                  delivery. Include your order reference when you get in touch.
                  Thrift pieces are final sale.
                </p>
                <a
                  href={ROUTES.shipping}
                  className="editorial-label mt-6 inline-flex items-center gap-2 text-ink transition-colors hover:text-burgundy"
                >
                  Shipping &amp; Returns
                  <ArrowRight size={13} strokeWidth={1.5} />
                </a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <Button href={ROUTES.faq}>Read the FAQ</Button>
                <Button href={ROUTES.sizeGuide} variant="secondary">
                  Size Guide
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
