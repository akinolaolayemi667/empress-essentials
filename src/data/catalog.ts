import type { Category, Collection, Product, Review } from '@/types/commerce'

/**
 * Product catalog — New Arrivals lead the demo storefront.
 * Swap files in /public/images to replace photography.
 */
export const products: Product[] = [
  {
    id: 'prod_luna',
    name: 'Luna Satin Dress',
    slug: 'luna-satin-dress',
    category: 'new',
    styleCategory: 'Dresses',
    collection: 'new-arrivals',
    price: 268,
    currency: 'USD',
    image: '/images/product-luna.jpg',
    images: ['/images/product-luna.jpg', '/images/product-luna-alt.jpg'],
    badge: 'New',
    description:
      'A fluid satin column with a soft bias drape and refined neckline — evening ease for every occasion.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Champagne', 'Noir'],
    tags: ['dress', 'satin', 'new'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: '2026-09-18T10:00:00.000Z',
  },
  {
    id: 'prod_blazer',
    name: 'Burgundy Tailored Blazer',
    slug: 'burgundy-tailored-blazer',
    category: 'statement',
    styleCategory: 'Statement',
    collection: 'new-arrivals',
    price: 312,
    currency: 'USD',
    image: '/images/product-blazer.jpg',
    images: ['/images/product-blazer.jpg', '/images/product-blazer-alt.jpg'],
    badge: 'Statement',
    description:
      'Sharp shoulders, a soft hand, and a deep burgundy finish — the wardrobe anchor for polished days.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Burgundy'],
    tags: ['blazer', 'tailoring', 'statement'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: '2026-09-17T10:00:00.000Z',
  },
  {
    id: 'prod_mia',
    name: 'Mia Knit Top',
    slug: 'mia-knit-top',
    category: 'new',
    styleCategory: 'Tops',
    collection: 'new-arrivals',
    price: 98,
    currency: 'USD',
    image: '/images/product-mia.jpg',
    images: ['/images/product-mia.jpg', '/images/product-mia-alt.jpg'],
    badge: 'New',
    description:
      'A soft fine-knit top with a clean outline — layer under coats or wear alone for everyday polish.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ivory', 'Soft Pink'],
    tags: ['top', 'knit', 'new'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-16T10:00:00.000Z',
  },
  {
    id: 'prod_amara',
    name: 'Amara Wide-Leg Trousers',
    slug: 'amara-wide-leg-trousers',
    category: 'new',
    styleCategory: 'Bottoms',
    collection: 'new-arrivals',
    price: 178,
    currency: 'USD',
    image: '/images/product-amara.jpg',
    images: ['/images/product-amara.jpg', '/images/product-amara-alt.jpg'],
    badge: 'New',
    description:
      'Relaxed wide-leg trousers with a high rise and fluid fall — tailored ease for day to night.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Stone', 'Ink'],
    tags: ['trousers', 'bottoms', 'new'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-15T10:00:00.000Z',
  },
  {
    id: 'prod_elora',
    name: 'Elora Statement Dress',
    slug: 'elora-statement-dress',
    category: 'statement',
    styleCategory: 'Dresses',
    collection: 'new-arrivals',
    price: 298,
    currency: 'USD',
    image: '/images/product-elora.jpg',
    images: ['/images/product-elora.jpg', '/images/product-elora-alt.jpg'],
    badge: 'Limited',
    description:
      'A sculptural silhouette designed to hold the room — bold lines with an elegant finish.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rouge', 'Noir'],
    tags: ['dress', 'statement', 'limited'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: '2026-09-14T10:00:00.000Z',
  },
  {
    id: 'prod_bodysuit',
    name: 'Classic Ribbed Bodysuit',
    slug: 'classic-ribbed-bodysuit',
    category: 'new',
    styleCategory: 'Tops',
    collection: 'new-arrivals',
    price: 72,
    currency: 'USD',
    image: '/images/product-bodysuit.jpg',
    images: ['/images/product-bodysuit.jpg', '/images/product-bodysuit-alt.jpg'],
    description:
      'A second-skin ribbed bodysuit with a smooth neckline — the quiet foundation for every look.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Ivory'],
    tags: ['bodysuit', 'essential', 'new'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-13T10:00:00.000Z',
  },
  {
    id: 'prod_avery',
    name: 'Avery Oversized Shirt',
    slug: 'avery-oversized-shirt',
    category: 'new',
    styleCategory: 'Tops',
    collection: 'new-arrivals',
    price: 128,
    currency: 'USD',
    image: '/images/product-avery.jpg',
    images: ['/images/product-avery.jpg', '/images/product-avery-alt.jpg'],
    badge: 'New',
    description:
      'An oversized shirt with crisp structure and soft movement — tuck, belt, or leave open.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Soft Blue'],
    tags: ['shirt', 'oversized', 'new'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-12T10:00:00.000Z',
  },
  {
    id: 'prod_noir',
    name: 'Noir Evening Skirt',
    slug: 'noir-evening-skirt',
    category: 'new',
    styleCategory: 'Bottoms',
    collection: 'new-arrivals',
    price: 188,
    currency: 'USD',
    image: '/images/product-noir.jpg',
    images: ['/images/product-noir.jpg', '/images/product-noir-alt.jpg'],
    badge: 'New',
    description:
      'A midi evening skirt in deep noir with a controlled flare — pair with satin or soft knits.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Noir'],
    tags: ['skirt', 'evening', 'new'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-11T10:00:00.000Z',
  },
]

export const categories: Category[] = [
  {
    id: 'cat_new',
    name: 'New Clothing',
    slug: 'new',
    description: 'Fresh arrivals with refined construction and modern lines.',
    productCount: products.filter((p) => p.category === 'new').length,
  },
  {
    id: 'cat_thrift',
    name: 'Thrift Clothing',
    slug: 'thrift',
    description: 'Carefully selected pre-loved pieces with lasting character.',
    productCount: products.filter((p) => p.category === 'thrift').length,
  },
  {
    id: 'cat_womens',
    name: "Women's Fashion",
    slug: 'womens',
    description: 'Everyday essentials elevated for effortless dressing.',
    productCount: products.filter((p) => p.category === 'womens').length,
  },
  {
    id: 'cat_statement',
    name: 'Statement Pieces',
    slug: 'statement',
    description: 'Bold silhouettes designed to hold the room.',
    productCount: products.filter((p) => p.category === 'statement').length,
  },
  {
    id: 'cat_seasonal',
    name: 'Seasonal Collections',
    slug: 'seasonal',
    description: 'Limited edits shaped by the season.',
    productCount: products.filter((p) => p.category === 'seasonal').length,
  },
]

export const collections: Collection[] = [
  {
    id: 'col_new',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'The latest pieces selected for your wardrobe.',
    image: '/images/collection-new.jpg',
    productIds: products.map((p) => p.id),
    isFeatured: true,
  },
]

export const reviews: Review[] = []

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
  return products.filter((product) =>
    collection.productIds.includes(product.id),
  )
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured)
}

export function getNewArrivals(): Product[] {
  return products
    .filter((product) => product.isNew)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
}
