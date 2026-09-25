import type { Product } from '@/types/commerce'

export type ShopListing = {
  slug: string
  name: string
  label: string
  title: string
  description: string
  emptyMessage: string
  matches: (product: Product) => boolean
}

const hasTag = (product: Product, ...tags: string[]) =>
  tags.some((tag) => product.tags?.includes(tag))

export const shopAllListing: ShopListing = {
  slug: 'all',
  name: 'All',
  label: 'The Collection',
  title: 'Shop All',
  description:
    'New season pieces and one-of-a-kind thrift finds, curated for every version of you.',
  emptyMessage: 'New pieces are on their way.',
  matches: () => true,
}

/** Category listings served at /shop/:slug — order drives the category navigation */
export const shopListings: ShopListing[] = [
  {
    slug: 'new',
    name: 'New Arrivals',
    label: 'Just In',
    title: 'New Arrivals',
    description: "The latest pieces we've selected for your wardrobe.",
    emptyMessage: 'The next drop is being selected.',
    matches: (product) => Boolean(product.isNew),
  },
  {
    slug: 'dresses',
    name: 'Dresses',
    label: 'Category',
    title: 'Dresses',
    description:
      'From effortless everyday silhouettes to standout occasion pieces.',
    emptyMessage: 'New dresses arrive soon.',
    matches: (product) =>
      product.styleCategory === 'Dresses' || hasTag(product, 'dress'),
  },
  {
    slug: 'tops',
    name: 'Tops',
    label: 'Category',
    title: 'Tops',
    description: 'Essential layers and statement-making styles.',
    emptyMessage: 'New tops arrive soon.',
    matches: (product) =>
      product.styleCategory === 'Tops' ||
      hasTag(product, 'top', 'shirt', 'bodysuit'),
  },
  {
    slug: 'bottoms',
    name: 'Bottoms',
    label: 'Category',
    title: 'Bottoms',
    description: 'Tailored, relaxed and everything between.',
    emptyMessage: 'New bottoms arrive soon.',
    matches: (product) =>
      product.styleCategory === 'Bottoms' ||
      hasTag(product, 'skirt', 'trousers'),
  },
  {
    slug: 'sets',
    name: 'Sets',
    label: 'Category',
    title: 'Sets',
    description: 'Effortless looks designed to work together.',
    emptyMessage: 'Our first coordinated sets are being curated.',
    matches: (product) =>
      product.styleCategory === 'Sets' || hasTag(product, 'set'),
  },
  {
    slug: 'thrift',
    name: 'Thrift',
    label: 'The Thrift Edit',
    title: 'Thrift, Curated Differently',
    description:
      'One-of-a-kind finds, carefully selected for their character, quality and unmistakable style.',
    emptyMessage: 'The next thrift drop is being selected.',
    matches: (product) => product.category === 'thrift',
  },
  {
    slug: 'statement',
    name: 'Statement',
    label: 'Featured',
    title: 'Statement Pieces',
    description: 'Standout pieces designed to make the look unforgettable.',
    emptyMessage: 'New statement pieces arrive soon.',
    matches: (product) =>
      product.category === 'statement' ||
      product.styleCategory === 'Statement' ||
      hasTag(product, 'statement'),
  },
]

export function getShopListing(slug?: string): ShopListing | undefined {
  if (!slug) return shopAllListing
  return shopListings.find((listing) => listing.slug === slug)
}
