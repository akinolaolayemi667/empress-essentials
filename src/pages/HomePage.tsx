import { RootLayout } from '@/components/layout'
import {
  BrandStory,
  FeaturedCollections,
  Hero,
  Lookbook,
  NewArrivals,
  Newsletter,
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
      <BrandStory />
      <Newsletter />
    </RootLayout>
  )
}
