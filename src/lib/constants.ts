import type { ProductFilter } from '@/types/commerce'

export const SITE = {
  name: 'Empress Essentials',
  tagline: 'Curated fashion for the modern woman',
  description:
    'Luxury new and thrift clothing, statement pieces, and seasonal collections.',
  url: 'https://empress-essentials.vercel.app',
  announcement: 'Free shipping within Nigeria on orders over $100',
  freeShippingThreshold: 100,
} as const

export const ROUTES = {
  home: '/',
  shop: '/shop',
  collections: '/collections',
  newArrivals: '/shop/new',
  thrift: '/shop/thrift',
  statement: '/shop/statement',
  lookbook: '/lookbook',
  about: '/about',
  contact: '/contact',
  product: '/product',
  bag: '/bag',
  wishlist: '/wishlist',
  account: '/account',
  search: '/search',
  checkout: '/checkout',
  shipping: '/shipping-returns',
  sizeGuide: '/size-guide',
  faq: '/faq',
  privacy: '/privacy',
  terms: '/terms',
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

export type FooterColumn = {
  title: string
  links: NavLink[]
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', href: ROUTES.newArrivals },
      { label: 'Collections', href: ROUTES.collections },
      { label: 'Thrift Edit', href: ROUTES.thrift },
      { label: 'Statement Pieces', href: ROUTES.statement },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Contact', href: ROUTES.contact },
      { label: 'Shipping & Returns', href: ROUTES.shipping },
      { label: 'Size Guide', href: ROUTES.sizeGuide },
      { label: 'FAQ', href: ROUTES.faq },
    ],
  },
  {
    title: 'Empress',
    links: [
      { label: 'Our Story', href: ROUTES.about },
      { label: 'Lookbook', href: ROUTES.lookbook },
      { label: 'Wishlist', href: ROUTES.wishlist },
      { label: 'Account', href: ROUTES.account },
    ],
  },
]

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy Policy', href: ROUTES.privacy },
  { label: 'Terms of Service', href: ROUTES.terms },
]

export const SEARCH_SUGGESTIONS: NavLink[] = [
  { label: 'New Arrivals', href: ROUTES.newArrivals },
  { label: 'Dresses', href: `${ROUTES.shop}/dresses` },
  { label: 'Tops', href: `${ROUTES.shop}/tops` },
  { label: 'Thrift', href: ROUTES.thrift },
  { label: 'Statement Pieces', href: ROUTES.statement },
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
