import type { ProductFilter } from '@/types/commerce'

export const SITE = {
  name: 'Empress Essentials',
  tagline: 'Curated fashion for the modern woman',
  description:
    'Luxury new and thrift clothing, statement pieces, and seasonal collections.',
  url: 'https://empressessentials.com',
} as const

export const ROUTES = {
  home: '/',
  shop: '/shop',
  collections: '/collections',
  product: '/product',
  bag: '/bag',
  wishlist: '/wishlist',
  search: '/search',
  about: '/about',
} as const

export const DEFAULT_FILTER: ProductFilter = {
  categories: [],
  collections: [],
  badges: [],
  inStockOnly: false,
  sizes: [],
  colors: [],
  query: '',
  sortBy: 'featured',
}
