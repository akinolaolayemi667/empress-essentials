import { isRouteErrorResponse, useRouteError } from 'react-router'
import { Button, Container } from '@/components/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { isChunkLoadError } from '@/lib/chunkReload'
import { ROUTES } from '@/lib/constants'
import { NotFoundPage } from './NotFoundPage'

export function RouteErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />
  return <RouteErrorMessage outdated={isChunkLoadError(error)} />
}

function RouteErrorMessage({ outdated }: { outdated: boolean }) {
  useDocumentTitle(outdated ? 'Update available' : 'Something went wrong')

  return (
    <section aria-labelledby="route-error-heading" className="bg-canvas">
      <Container
        size="wide"
        className="flex min-h-[65vh] flex-col items-start justify-center py-24"
      >
        <p className="editorial-label mb-4 text-burgundy">
          {outdated ? 'A Fresh Edit' : 'Unexpected Error'}
        </p>
        <h1 id="route-error-heading" className="max-w-3xl font-display text-h1 text-balance">
          {outdated ? 'The site has just been updated.' : 'Something went wrong.'}
        </h1>
        <p className="mt-5 max-w-md text-pretty text-body-lg text-muted">
          {outdated
            ? 'Reload the page to see the latest version. Your bag and wishlist are saved.'
            : 'Please try again. Your bag and wishlist are saved on this device.'}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <Button type="button" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
          <Button href={ROUTES.home} variant="secondary">
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  )
}
