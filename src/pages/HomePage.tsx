import { RootLayout } from '@/components/layout'
import { FeaturedCollections, Hero } from '@/components/sections'

export function HomePage() {
  return (
    <RootLayout>
      <Hero />
      <FeaturedCollections />
    </RootLayout>
  )
}
