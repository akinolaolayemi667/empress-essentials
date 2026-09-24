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
  {
    id: 'thrift_blazer',
    name: 'Vintage Burgundy Blazer',
    slug: 'vintage-burgundy-blazer',
    category: 'thrift',
    styleCategory: 'Thrift',
    collection: 'thrift-edit',
    price: 164,
    currency: 'USD',
    image: '/images/thrift-blazer.jpg',
    images: ['/images/thrift-blazer.jpg', '/images/product-blazer-alt.jpg'],
    badge: 'ONE OF ONE',
    condition: 'Excellent',
    description:
      'A structured burgundy blazer with original lining and soft shoulder — selected for its cut and lasting character.',
    sizes: ['M'],
    colors: ['Burgundy'],
    tags: ['thrift', 'blazer', 'one-of-one'],
    inStock: true,
    isFeatured: true,
    createdAt: '2026-08-20T10:00:00.000Z',
  },
  {
    id: 'thrift_dress',
    name: 'Silk Print Midi Dress',
    slug: 'silk-print-midi-dress',
    category: 'thrift',
    styleCategory: 'Thrift',
    collection: 'thrift-edit',
    price: 148,
    currency: 'USD',
    image: '/images/thrift-dress.jpg',
    images: ['/images/thrift-dress.jpg', '/images/product-luna-alt.jpg'],
    badge: 'CURATED FIND',
    condition: 'Very Good',
    description:
      'A fluid silk midi with an archival print — one-of-a-kind movement for evenings and elevated days.',
    sizes: ['S'],
    colors: ['Multi'],
    tags: ['thrift', 'dress', 'silk'],
    inStock: true,
    createdAt: '2026-08-18T10:00:00.000Z',
  },
  {
    id: 'thrift_denim',
    name: 'Classic Denim Jacket',
    slug: 'classic-denim-jacket',
    category: 'thrift',
    styleCategory: 'Thrift',
    collection: 'thrift-edit',
    price: 118,
    currency: 'USD',
    image: '/images/thrift-denim.jpg',
    images: ['/images/thrift-denim.jpg', '/images/product-avery-alt.jpg'],
    badge: 'PRE-LOVED',
    condition: 'Excellent',
    description:
      'A broken-in denim jacket with soft fade and clean hardware — the layer that finishes every look.',
    sizes: ['M', 'L'],
    colors: ['Indigo'],
    tags: ['thrift', 'denim', 'jacket'],
    inStock: true,
    createdAt: '2026-08-15T10:00:00.000Z',
  },
  {
    id: 'thrift_skirt',
    name: 'Retro Pleated Skirt',
    slug: 'retro-pleated-skirt',
    category: 'thrift',
    styleCategory: 'Thrift',
    collection: 'thrift-edit',
    price: 96,
    currency: 'USD',
    image: '/images/thrift-skirt.jpg',
    images: ['/images/thrift-skirt.jpg', '/images/product-noir-alt.jpg'],
    badge: 'ONE OF ONE',
    condition: 'Very Good',
    description:
      'Fine pleats with a high waist and soft swing — a vintage silhouette styled for now.',
    sizes: ['S'],
    colors: ['Noir'],
    tags: ['thrift', 'skirt', 'one-of-one'],
    inStock: true,
    createdAt: '2026-08-12T10:00:00.000Z',
  },
  {
    id: 'thrift_bag',
    name: 'Vintage Leather Bag',
    slug: 'vintage-leather-bag',
    category: 'thrift',
    styleCategory: 'Thrift',
    collection: 'thrift-edit',
    price: 132,
    currency: 'USD',
    image: '/images/thrift-bag.jpg',
    images: ['/images/thrift-bag.jpg'],
    badge: 'LIMITED PIECE',
    condition: 'Good',
    description:
      'A compact leather bag with a warm patina — carried character that only time can create.',
    sizes: ['One Size'],
    colors: ['Cognac'],
    tags: ['thrift', 'bag', 'leather'],
    inStock: true,
    isFeatured: true,
    createdAt: '2026-08-10T10:00:00.000Z',
  },
  {
    id: 'thrift_top',
    name: 'Printed Evening Top',
    slug: 'printed-evening-top',
    category: 'thrift',
    styleCategory: 'Thrift',
    collection: 'thrift-edit',
    price: 88,
    currency: 'USD',
    image: '/images/thrift-top.jpg',
    images: ['/images/thrift-top.jpg', '/images/product-mia-alt.jpg'],
    badge: 'CURATED FIND',
    condition: 'Excellent',
    description:
      'A printed evening top with a refined neckline — pair with black trousers or a satin skirt.',
    sizes: ['XS', 'S'],
    colors: ['Print'],
    tags: ['thrift', 'top', 'evening'],
    inStock: true,
    createdAt: '2026-08-08T10:00:00.000Z',
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
    productIds: products.filter((p) => p.isNew).map((p) => p.id),
    isFeatured: true,
  },
  {
    id: 'col_thrift',
    name: 'The Thrift Edit',
    slug: 'thrift-edit',
    description: 'One-of-a-kind finds selected for character and quality.',
    image: '/images/thrift-feature.jpg',
    productIds: products.filter((p) => p.category === 'thrift').map((p) => p.id),
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

export function getThriftProducts(): Product[] {
  return products
    .filter((product) => product.category === 'thrift')
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
}
