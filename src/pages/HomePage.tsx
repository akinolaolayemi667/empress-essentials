import { ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations'
import { RootLayout } from '@/components/layout'
import { Body, Button, Container, Display, Eyebrow, Lead } from '@/components/ui'
import { SITE } from '@/lib/constants'
import { categories, products } from '@/data'

/**
 * Foundation status page — confirms architecture wiring.
 * Marketing sections (navbar, hero, grids, footer) arrive in later phases.
 */
export function HomePage() {
  return (
    <RootLayout>
      <Container className="flex min-h-screen flex-col justify-center py-20">
        <FadeIn className="max-w-2xl">
          <Eyebrow>Foundation ready</Eyebrow>
          <Display className="mt-4">{SITE.name}</Display>
          <Lead className="mt-5 max-w-xl">{SITE.tagline}</Lead>
          <Body className="mt-6 max-w-lg">
            Phase 1 establishes the design system, commerce data models, reusable
            UI primitives, and cart/wishlist hooks. Catalog scaffolding includes{' '}
            {products.length} sample products across {categories.length}{' '}
            categories.
          </Body>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              type="button"
              disabled
              rightIcon={<ArrowRight size={14} strokeWidth={1.5} />}
            >
              Shop arriving next
            </Button>
            <Button type="button" variant="secondary" disabled>
              Collections next
            </Button>
          </div>
        </FadeIn>
      </Container>
    </RootLayout>
  )
}
