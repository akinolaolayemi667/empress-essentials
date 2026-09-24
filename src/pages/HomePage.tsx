import { RootLayout } from '@/components/layout'
import {
  FeaturedCollections,
  Hero,
  NewArrivals,
  ShopByCategory,
} from '@/components/sections'

export function HomePage() {
  return (
    <RootLayout>
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <ShopByCategory />
    </RootLayout>
  )
}
