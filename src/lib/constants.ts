import type { ProductFilter } from '@/types/commerce'

export const SITE = {
  name: 'Empress Essentials',
  tagline: 'Curated fashion for the modern woman',
  description:
    'Luxury new and thrift clothing, statement pieces, and seasonal collections.',
  url: 'https://empressessentials.com',
  announcement: 'Free shipping on orders over $100',
} as const

export const ROUTES = {
  home: '/',
  shop: '/shop',
  collections: '/collections',
  newArrivals: '/shop/new',
  thrift: '/shop/thrift',
  lookbook: '/lookbook',
  about: '/about',
  contact: '/contact',
  product: '/product',
  bag: '/bag',
  wishlist: '/wishlist',
  account: '/account',
  search: '/search',
} as const

export type NavLink = {
  label: string
  href: string
}

export const DESKTOP_NAV_LINKS: NavLink[] = [
  { label: 'Shop', href: ROUTES.shop },
  { label: 'Collections', href: ROUTES.collections },
  { label: 'New Arrivals', href: ROUTES.newArrivals },
  { label: 'Thrift', href: ROUTES.thrift },
  { label: 'Lookbook', href: ROUTES.lookbook },
  { label: 'About', href: ROUTES.about },
]

export const MOBILE_NAV_LINKS: NavLink[] = [
  { label: 'Shop', href: ROUTES.shop },
  { label: 'New Arrivals', href: ROUTES.newArrivals },
  { label: 'Collections', href: ROUTES.collections },
  { label: 'Thrift', href: ROUTES.thrift },
  { label: 'Lookbook', href: ROUTES.lookbook },
  { label: 'About', href: ROUTES.about },
  { label: 'Contact', href: ROUTES.contact },
]

export const SEARCH_SUGGESTIONS: NavLink[] = [
  { label: 'New Arrivals', href: ROUTES.newArrivals },
  { label: 'Dresses', href: `${ROUTES.shop}?category=dresses` },
  { label: 'Tops', href: `${ROUTES.shop}?category=tops` },
  { label: 'Thrift', href: ROUTES.thrift },
  { label: 'Accessories', href: `${ROUTES.shop}?category=accessories` },
]

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
