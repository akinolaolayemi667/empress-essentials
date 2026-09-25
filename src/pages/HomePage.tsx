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
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function HomePage() {
  useDocumentTitle()

  return (
    <>
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <ShopByCategory />
      <Lookbook />
      <ThriftCollection />
      <BrandStory />
      <Newsletter />
    </>
  )
}
