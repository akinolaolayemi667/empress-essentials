import type { Category, Collection, Product, Review } from '@/types/commerce'

/** Placeholder catalog — replace images and expand in Phase 2 */
export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Silk Column Slip',
    slug: 'silk-column-slip',
    category: 'new',
    collection: 'atelier-edit',
    price: 248,
    currency: 'USD',
    image: '/images/placeholders/product-01.jpg',
    badge: 'New',
    description: 'Fluid silk column with a clean neckline and bias drape.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ivory', 'Noir'],
    tags: ['silk', 'evening', 'minimal'],
    inStock: true,
    isFeatured: true,
    createdAt: '2026-08-12T10:00:00.000Z',
  },
  {
    id: 'prod_002',
    name: 'Vintage Wool Coat',
    slug: 'vintage-wool-coat',
    category: 'thrift',
    collection: 'found-archive',
    price: 186,
    compareAtPrice: 320,
    currency: 'USD',
    image: '/images/placeholders/product-02.jpg',
    badge: 'Thrift',
    description: 'One-of-a-kind structured wool coat with original lining.',
    sizes: ['M'],
    colors: ['Camel'],
    tags: ['outerwear', 'thrift', 'wool'],
    inStock: true,
    isFeatured: true,
    createdAt: '2026-07-28T10:00:00.000Z',
  },
  {
    id: 'prod_003',
    name: 'Sculpted Blazer',
    slug: 'sculpted-blazer',
    category: 'statement',
    collection: 'atelier-edit',
    price: 312,
    currency: 'USD',
    image: '/images/placeholders/product-03.jpg',
    badge: 'Statement',
    description: 'Sharp shoulder, soft hand — a wardrobe anchor piece.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Espresso', 'Stone'],
    tags: ['tailoring', 'statement'],
    inStock: true,
    createdAt: '2026-09-01T10:00:00.000Z',
  },
  {
    id: 'prod_004',
    name: 'Autumn Linen Set',
    slug: 'autumn-linen-set',
    category: 'seasonal',
    collection: 'autumn-atelier',
    price: 198,
    currency: 'USD',
    image: '/images/placeholders/product-04.jpg',
    badge: 'Seasonal',
    description: 'Two-piece linen set in a soft seasonal wash.',
    sizes: ['S', 'M', 'L'],
    colors: ['Sand', 'Olive'],
    tags: ['linen', 'set', 'seasonal'],
    inStock: false,
    createdAt: '2026-09-10T10:00:00.000Z',
  },
]

export const categories: Category[] = [
  {
    id: 'cat_new',
    name: 'New Clothing',
    slug: 'new',
    description: 'Fresh arrivals with refined construction and modern lines.',
    productCount: 1,
  },
  {
    id: 'cat_thrift',
    name: 'Thrift Clothing',
    slug: 'thrift',
    description: 'Carefully selected pre-loved pieces with lasting character.',
    productCount: 1,
  },
  {
    id: 'cat_womens',
    name: "Women's Fashion",
    slug: 'womens',
    description: 'Everyday essentials elevated for effortless dressing.',
    productCount: 0,
  },
  {
    id: 'cat_statement',
    name: 'Statement Pieces',
    slug: 'statement',
    description: 'Bold silhouettes designed to hold the room.',
    productCount: 1,
  },
  {
    id: 'cat_seasonal',
    name: 'Seasonal Collections',
    slug: 'seasonal',
    description: 'Limited edits shaped by the season.',
    productCount: 1,
  },
]

export const collections: Collection[] = [
  {
    id: 'col_atelier',
    name: 'Atelier Edit',
    slug: 'atelier-edit',
    description: 'Quiet luxury staples with precise proportions.',
    image: '/images/placeholders/collection-atelier.jpg',
    productIds: ['prod_001', 'prod_003'],
    isFeatured: true,
  },
  {
    id: 'col_found',
    name: 'Found Archive',
    slug: 'found-archive',
    description: 'Thrift discoveries restored for a second life.',
    image: '/images/placeholders/collection-found.jpg',
    productIds: ['prod_002'],
    isFeatured: true,
  },
  {
    id: 'col_autumn',
    name: 'Autumn Atelier',
    slug: 'autumn-atelier',
    description: 'Layered textures for cooler days.',
    season: 'Autumn',
    year: 2026,
    image: '/images/placeholders/collection-autumn.jpg',
    productIds: ['prod_004'],
    isFeatured: false,
  },
]

export const reviews: Review[] = [
  {
    id: 'rev_001',
    productId: 'prod_001',
    author: 'Amelia R.',
    rating: 5,
    title: 'Impeccable drape',
    body: 'The slip moves beautifully and feels as refined as it looks.',
    createdAt: '2026-09-02T14:20:00.000Z',
    verifiedPurchase: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug)
}

export function getProductsByCollection(slug: string): Product[] {
  const collection = getCollectionBySlug(slug)
  if (!collection) return []
  return products.filter((product) => collection.productIds.includes(product.id))
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured)
}
