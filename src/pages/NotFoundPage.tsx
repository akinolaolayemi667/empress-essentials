import { Button, Container } from '@/components/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ROUTES } from '@/lib/constants'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <section aria-labelledby="not-found-heading" className="bg-canvas">
      <Container
        size="wide"
        className="flex min-h-[65vh] flex-col items-start justify-center py-24"
      >
        <p className="editorial-label mb-4 text-burgundy">404</p>
        <h1 id="not-found-heading" className="max-w-3xl font-display text-h1 text-balance">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-5 max-w-md text-pretty text-body-lg text-muted">
          It may have moved, or the piece you&apos;re looking for is no longer
          available. There is plenty more to discover.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <Button href={ROUTES.shop}>Shop All</Button>
          <Button href={ROUTES.home} variant="secondary">
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  )
}
