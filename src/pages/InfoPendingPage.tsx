import { PageHeader } from '@/components/layout'
import { Button, Container } from '@/components/ui'
import { pendingPages } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/lib/constants'

type InfoPendingPageProps = {
  page: keyof typeof pendingPages
}

/** Holding page for policies that need confirmed business details */
export function InfoPendingPage({ page }: InfoPendingPageProps) {
  const content = pendingPages[page]
  useDocumentTitle(content.title, content.description)

  return (
    <>
      <PageHeader
        label={content.label}
        title={content.title}
        description={content.description}
        breadcrumbs={[{ label: 'Home', href: ROUTES.home }, { label: content.title }]}
      />

      <section aria-label={`${content.title} details`} className="bg-canvas">
        <Container size="wide" className="pb-[var(--spacing-section)]">
          <div className="max-w-2xl border-t border-border pt-10">
            {content.details ? (
              <>
                <h2 className="editorial-label text-ink">In the Meantime</h2>
                <ul className="mt-6 space-y-4">
                  {content.details.map((detail) => (
                    <li key={detail} className="flex gap-4 text-body-lg leading-relaxed text-ink-secondary">
                      <span aria-hidden className="mt-3.5 h-px w-4 shrink-0 bg-burgundy" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <div className={content.details ? 'mt-12 flex flex-wrap items-center gap-8' : 'flex flex-wrap items-center gap-8'}>
              <Button href={ROUTES.faq}>Read the FAQ</Button>
              <Button href={ROUTES.shop} variant="secondary">
                Continue Shopping
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
