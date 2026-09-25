import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/layout'
import { Container } from '@/components/ui'
import { business, privacyPolicy, shippingPolicy, termsOfService } from '@/data'
import type { PolicyDocument, PolicySection } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/lib/constants'
import { formatDate } from '@/lib/format'

const documents = {
  shipping: shippingPolicy,
  privacy: privacyPolicy,
  terms: termsOfService,
} satisfies Record<string, PolicyDocument>

type PolicyPageProps = {
  policy: keyof typeof documents
}

export function PolicyPage({ policy }: PolicyPageProps) {
  const doc = documents[policy]
  useDocumentTitle(doc.title, doc.intro)

  return (
    <>
      <PageHeader
        label={doc.label}
        title={doc.title}
        description={doc.intro}
        breadcrumbs={[{ label: 'Home', href: ROUTES.home }, { label: doc.title }]}
      />

      <section aria-label={doc.title} className="bg-canvas">
        <Container size="wide" className="pb-[var(--spacing-section)]">
          <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-14">
            <nav aria-label="On this page" className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-32">
                <p className="editorial-label mb-5 text-muted">On This Page</p>
                <ol className="space-y-3">
                  {doc.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-small text-ink-secondary transition-colors hover:text-burgundy"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="max-w-2xl lg:col-span-8">
              {doc.sections.map((section) => (
                <PolicyBlock key={section.id} section={section} />
              ))}
              <p className="mt-4 text-small text-muted">
                Last updated {formatDate(business.policiesUpdated)}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function PolicyBlock({ section }: { section: PolicySection }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-32 border-b border-border pb-10 pt-10 first:pt-0"
    >
      <h2 id={`${section.id}-heading`} className="font-display text-h3 text-ink">
        {section.heading}
      </h2>

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-body leading-relaxed text-ink-secondary">
          {paragraph}
        </p>
      ))}

      {section.list ? (
        <ul className="mt-5 space-y-3">
          {section.list.map((item) => (
            <li key={item} className="flex gap-4 text-body leading-relaxed text-ink-secondary">
              <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-burgundy" />
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {section.table ? (
        <dl className="mt-6 border-t border-ink">
          {section.table.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <dt className="font-display text-xl text-ink">{row.label}</dt>
              <dd className="text-small text-ink-secondary sm:text-right">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {section.link ? (
        <a
          href={section.link.href}
          className="editorial-label mt-6 inline-flex items-center gap-2 text-ink transition-colors hover:text-burgundy"
        >
          {section.link.label}
          <ArrowRight size={13} strokeWidth={1.5} />
        </a>
      ) : null}
    </section>
  )
}
