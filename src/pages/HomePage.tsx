import { RootLayout } from '@/components/layout'
import {
  FeaturedCollections,
  Hero,
  Lookbook,
  NewArrivals,
  ShopByCategory,
  ThriftCollection,
} from '@/components/sections'

export function HomePage() {
  return (
    <RootLayout>
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <ShopByCategory />
      <Lookbook />
      <ThriftCollection />
    </RootLayout>
  )
}
