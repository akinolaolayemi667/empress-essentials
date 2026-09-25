import { PageHeader } from '@/components/layout'
import { Button, Container } from '@/components/ui'
import { measuringSteps, sizeConversions, sizeGuideNotes } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/lib/constants'

export function SizeGuidePage() {
  useDocumentTitle(
    'Size Guide',
    'International size conversions and how to measure for Empress Essentials pieces.',
  )

  return (
    <>
      <PageHeader
        label="Customer Care"
        title="Size Guide"
        description="Find your fit with international conversions and a simple guide to measuring yourself."
        breadcrumbs={[{ label: 'Home', href: ROUTES.home }, { label: 'Size Guide' }]}
      />

      <section aria-labelledby="conversions-heading" className="bg-canvas">
        <Container size="wide" className="pb-16 md:pb-24">
          <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-14">
            <div className="lg:col-span-4">
              <h2 id="conversions-heading" className="font-display text-h3">
                Size Conversions
              </h2>
              <p className="mt-3 max-w-sm text-small text-muted">
                Standard international womenswear sizing. Each product lists the
                sizes it comes in.
              </p>
            </div>

            <div className="-mx-[var(--spacing-gutter)] overflow-x-auto px-[var(--spacing-gutter)] lg:col-span-8 lg:mx-0 lg:px-0">
              <table className="w-full min-w-[28rem] border-collapse text-left">
                <caption className="sr-only">Womenswear size conversions</caption>
                <thead>
                  <tr className="border-b border-ink">
                    {['Size', 'US', 'UK', 'EU'].map((heading) => (
                      <th key={heading} scope="col" className="editorial-label pb-4 pr-6 font-medium text-ink">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeConversions.map((row) => (
                    <tr key={row.size} className="border-b border-border">
                      <th scope="row" className="py-5 pr-6 font-display text-xl font-medium text-ink">
                        {row.size}
                      </th>
                      <td className="py-5 pr-6 tabular-nums text-ink-secondary">{row.us}</td>
                      <td className="py-5 pr-6 tabular-nums text-ink-secondary">{row.uk}</td>
                      <td className="py-5 tabular-nums text-ink-secondary">{row.eu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="measure-heading" className="bg-soft">
        <Container size="wide" className="py-[var(--spacing-section)]">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="editorial-label mb-4 text-burgundy">Find Your Fit</p>
              <h2 id="measure-heading" className="font-display text-h2 text-balance">
                How to Measure
              </h2>
            </div>

            <div className="lg:col-span-8">
              <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
                {measuringSteps.map((step, index) => (
                  <li key={step.title} className="border-t border-ink pt-5">
                    <p className="editorial-label text-burgundy">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 font-display text-2xl text-ink">{step.title}</h3>
                    <p className="mt-3 text-small leading-relaxed text-muted">{step.body}</p>
                  </li>
                ))}
              </ol>

              <ul className="mt-14 space-y-4 border-t border-border pt-8">
                {sizeGuideNotes.map((note) => (
                  <li key={note} className="flex gap-4 text-small leading-relaxed text-ink-secondary">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-burgundy" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Continue shopping" className="bg-canvas">
        <Container size="wide" className="flex flex-wrap items-center gap-8 py-16 md:py-20">
          <Button href={ROUTES.shop}>Shop All</Button>
          <Button href={ROUTES.faq} variant="secondary">
            Read the FAQ
          </Button>
        </Container>
      </section>
    </>
  )
}
