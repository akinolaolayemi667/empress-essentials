import { ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/animations'
import { RootLayout } from '@/components/layout'
import {
  Body,
  Button,
  Container,
  EditorialDisplay,
  Eyebrow,
  Lead,
} from '@/components/ui'
import { SITE } from '@/lib/constants'

/**
 * Placeholder page under global navigation.
 * Hero and product sections arrive in later phases.
 */
export function HomePage() {
  return (
    <RootLayout>
      <Container className="flex min-h-[70vh] flex-col justify-center py-24 md:py-32">
        <FadeUp className="max-w-2xl md:ml-[6%]">
          <Eyebrow>New Season</Eyebrow>
          <EditorialDisplay className="mt-5">{SITE.name}</EditorialDisplay>
          <Lead className="mt-6 max-w-lg">{SITE.tagline}</Lead>
          <Body className="mt-5 max-w-md text-muted">
            Navigation, search, and bag are live. Full editorial sections arrive
            next.
          </Body>
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <Button
              type="button"
              rightIcon={<ArrowRight size={14} strokeWidth={1.5} />}
            >
              Shop Collection
            </Button>
            <Button type="button" variant="secondary">
              Explore Lookbook
            </Button>
          </div>
        </FadeUp>
      </Container>
    </RootLayout>
  )
}
