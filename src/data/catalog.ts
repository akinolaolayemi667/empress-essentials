import type { Category, Collection, Product, Review } from '@/types/commerce'

/**
 * Product catalog — Autumn / Winter 2026, quiet luxury and minimalist tailoring.
 * Photography is licensed from Unsplash; credits live in /public/images/CREDITS.md.
 */
export const products: Product[] = [
  {
    id: 'prod_sienna',
    name: 'Sienna Funnel-Neck Wool Coat',
    slug: 'sienna-funnel-neck-wool-coat',
    category: 'statement',
    styleCategory: 'Statement',
    collection: 'new-arrivals',
    price: 348,
    currency: 'USD',
    image: '/images/product-sienna-coat.jpg',
    images: ['/images/product-sienna-coat.jpg', '/images/product-sienna-coat-detail.jpg'],
    badge: 'New',
    description:
      'A long camel coat in a dense wool blend, cut with a softly funnelled collar and a self-tie belt — the one layer that makes every look feel considered.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel'],
    tags: ['coat', 'outerwear', 'wool', 'tailoring', 'statement'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: '2026-09-24T10:00:00.000Z',
  },
  {
    id: 'prod_margaux',
    name: 'Margaux Sculpted Blazer',
    slug: 'margaux-sculpted-blazer',
    category: 'statement',
    styleCategory: 'Statement',
    collection: 'new-arrivals',
    price: 312,
    currency: 'USD',
    image: '/images/product-margaux-blazer.jpg',
    images: ['/images/product-margaux-blazer.jpg'],
    badge: 'Statement',
    description:
      'Sculpted shoulders and a nipped waist in the colour of the season — a deep burgundy blazer that sharpens denim, satin and everything between.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Burgundy'],
    tags: ['blazer', 'tailoring', 'statement'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: '2026-09-23T10:00:00.000Z',
  },
  {
    id: 'prod_aurelie',
    name: 'Aurelie Fine-Rib Turtleneck',
    slug: 'aurelie-fine-rib-turtleneck',
    category: 'new',
    styleCategory: 'Tops',
    collection: 'new-arrivals',
    price: 128,
    currency: 'USD',
    image: '/images/product-aurelie-turtleneck.jpg',
    images: [
      '/images/product-aurelie-turtleneck.jpg',
      '/images/product-aurelie-turtleneck-ivory.jpg',
    ],
    badge: 'New',
    description:
      'A close, fine-rib turtleneck with a soft fold at the neck — the quiet base layer under tailoring, and polished enough to wear alone.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Camel', 'Ivory'],
    tags: ['top', 'knit', 'turtleneck', 'essential'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-22T10:00:00.000Z',
  },
  {
    id: 'prod_isla',
    name: 'Isla Silk Blouse',
    slug: 'isla-silk-blouse',
    category: 'new',
    styleCategory: 'Tops',
    collection: 'new-arrivals',
    price: 148,
    currency: 'USD',
    image: '/images/product-isla-blouse.jpg',
    images: ['/images/product-isla-blouse.jpg', '/images/product-isla-blouse-detail.jpg'],
    badge: 'New',
    description:
      'A fluid ivory blouse with a soft V neckline, covered buttons and fluted sleeves — made to move from the desk to dinner.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory'],
    tags: ['top', 'blouse', 'silk'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-21T10:00:00.000Z',
  },
  {
    id: 'prod_vera',
    name: 'Vera Pleated Wide-Leg Trousers',
    slug: 'vera-pleated-wide-leg-trousers',
    category: 'new',
    styleCategory: 'Bottoms',
    collection: 'new-arrivals',
    price: 178,
    currency: 'USD',
    image: '/images/product-vera-trousers.jpg',
    images: ['/images/product-vera-trousers.jpg', '/images/product-vera-trousers-cream.jpg'],
    badge: 'New',
    description:
      'High-rise trousers with front pleats and a long, fluid leg — relaxed tailoring that pairs with a crisp shirt or a fine knit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Taupe', 'Cream'],
    tags: ['trousers', 'tailoring', 'wide-leg'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-20T10:00:00.000Z',
  },
  {
    id: 'prod_noemi',
    name: 'Noemi Bias Satin Skirt',
    slug: 'noemi-bias-satin-skirt',
    category: 'new',
    styleCategory: 'Bottoms',
    collection: 'new-arrivals',
    price: 138,
    currency: 'USD',
    image: '/images/product-noemi-skirt.jpg',
    images: ['/images/product-noemi-skirt.jpg'],
    badge: 'New',
    description:
      'A bias-cut satin midi that skims rather than clings — wear it with a knit by day and a silk blouse after dark.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Noir'],
    tags: ['skirt', 'satin', 'midi'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-19T10:00:00.000Z',
  },
  {
    id: 'prod_elise',
    name: 'Elise Satin Slip Gown',
    slug: 'elise-satin-slip-gown',
    category: 'statement',
    styleCategory: 'Dresses',
    collection: 'new-arrivals',
    price: 268,
    currency: 'USD',
    image: '/images/product-elise-gown.jpg',
    images: ['/images/product-elise-gown.jpg', '/images/product-elise-gown-alt.jpg'],
    badge: 'Limited',
    description:
      'A floor-length slip in liquid burgundy satin with a deep V and a high leg split — evening dressing, pared back to one perfect line.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Burgundy'],
    tags: ['dress', 'satin', 'evening', 'statement'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: '2026-09-18T10:00:00.000Z',
  },
  {
    id: 'prod_clara',
    name: 'Clara Rib-Knit Maxi Dress',
    slug: 'clara-rib-knit-maxi-dress',
    category: 'new',
    styleCategory: 'Dresses',
    collection: 'new-arrivals',
    price: 198,
    currency: 'USD',
    image: '/images/product-clara-dress.jpg',
    images: ['/images/product-clara-dress.jpg', '/images/product-clara-dress-alt.jpg'],
    badge: 'New',
    description:
      'A long-sleeve rib-knit maxi in warm cocoa with a gentle back split — soft, close and effortless from first coffee to late dinner.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Cocoa'],
    tags: ['dress', 'knit', 'maxi'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-17T10:00:00.000Z',
  },
  {
    id: 'prod_rosa',
    name: 'Rosa Knit Midi Dress',
    slug: 'rosa-knit-midi-dress',
    category: 'new',
    styleCategory: 'Dresses',
    collection: 'new-arrivals',
    price: 186,
    currency: 'USD',
    image: '/images/product-rosa-dress.jpg',
    images: ['/images/product-rosa-dress.jpg'],
    badge: 'New',
    description:
      'A fitted mock-neck midi in deep wine knit — polished enough for meetings, easy enough for weekends.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Wine'],
    tags: ['dress', 'knit', 'midi'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-16T10:00:00.000Z',
  },
  {
    id: 'prod_solene',
    name: 'Solene Knit Lounge Set',
    slug: 'solene-knit-lounge-set',
    category: 'new',
    styleCategory: 'Sets',
    collection: 'new-arrivals',
    price: 224,
    currency: 'USD',
    image: '/images/product-solene-set.jpg',
    images: [
      '/images/product-solene-set.jpg',
      '/images/product-solene-set-oatmeal.jpg',
      '/images/product-solene-set-detail.jpg',
    ],
    badge: 'New',
    description:
      'A fine-knit top and straight-leg trouser, made to be worn together or apart — the definition of dressed-up comfort.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Cocoa', 'Oatmeal'],
    tags: ['set', 'knit', 'lounge', 'co-ord'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: '2026-09-15T10:00:00.000Z',
  },
  {
    id: 'prod_maren',
    name: 'Maren Tailored Suit',
    slug: 'maren-tailored-suit',
    category: 'new',
    styleCategory: 'Sets',
    collection: 'new-arrivals',
    price: 385,
    currency: 'USD',
    image: '/images/product-maren-suit.jpg',
    images: ['/images/product-maren-suit.jpg', '/images/product-maren-suit-alt.jpg'],
    badge: 'New',
    description:
      'A relaxed single-breasted blazer and wide trouser in soft sand — easy, unstructured tailoring that works as a suit or as separates.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Sand'],
    tags: ['set', 'suit', 'tailoring', 'co-ord'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-14T10:00:00.000Z',
  },
  {
    id: 'prod_odile',
    name: 'Odile Utility Co-ord',
    slug: 'odile-utility-co-ord',
    category: 'new',
    styleCategory: 'Sets',
    collection: 'new-arrivals',
    price: 345,
    currency: 'USD',
    image: '/images/product-odile-coord.jpg',
    images: [
      '/images/product-odile-coord.jpg',
      '/images/product-odile-coord-side.jpg',
      '/images/product-odile-coord-back.jpg',
    ],
    badge: 'New',
    description:
      'A boxy cropped jacket and generous balloon trouser in khaki cotton twill — utility shapes, softened for the city.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Khaki'],
    tags: ['set', 'utility', 'co-ord'],
    inStock: true,
    isNew: true,
    createdAt: '2026-09-13T10:00:00.000Z',
  },
  {
    id: 'thrift_trench',
    name: 'Vintage Belted Trench',
    slug: 'vintage-belted-trench',
    category: 'thrift',
    styleCategory: 'Thrift',
    collection: 'thrift-edit',
    price: 142,
    currency: 'USD',
    image: '/images/thrift-trench.jpg',
    images: ['/images/thrift-trench.jpg'],
    badge: 'ONE OF ONE',
    condition: 'Excellent',
    description:
      'A classic stone trench with a generous cut and original buttons — the timeless layer, already softened by the years.',
    sizes: ['M'],
    colors: ['Stone'],
    tags: ['thrift', 'coat', 'trench', 'one-of-one'],
    inStock: true,
    isFeatured: true,
    createdAt: '2026-09-10T10:00:00.000Z',
  },
  {
    id: 'thrift_tweed',
    name: 'Vintage Wool Tweed Blazer',
    slug: 'vintage-wool-tweed-blazer',
    category: 'thrift',
    styleCategory: 'Thrift',
    collection: 'thrift-edit',
    price: 124,
    currency: 'USD',
    image: '/images/thrift-tweed-blazer.jpg',
    images: ['/images/thrift-tweed-blazer.jpg'],
    badge: 'CURATED FIND',
    condition: 'Very Good',
    description:
      'A moss-green wool tweed blazer with a soft shoulder and horn-effect buttons — heritage character for jeans and a white shirt.',
    sizes: ['S'],
    colors: ['Moss'],
    tags: ['thrift', 'blazer', 'tweed'],
    inStock: true,
    createdAt: '2026-09-08T10:00:00.000Z',
  },
  {
    id: 'thrift_cable',
    name: 'Vintage Cable-Knit Jumper',
    slug: 'vintage-cable-knit-jumper',
    category: 'thrift',
    styleCategory: 'Thrift',
    collection: 'thrift-edit',
    price: 86,
    currency: 'USD',
    image: '/images/thrift-cable-knit.jpg',
    images: ['/images/thrift-cable-knit.jpg'],
    badge: 'PRE-LOVED',
    condition: 'Excellent',
    description:
      'A chunky cream cable knit with a relaxed body — the kind of jumper that only gets better with every wear.',
    sizes: ['M', 'L'],
    colors: ['Cream'],
    tags: ['thrift', 'knit', 'jumper'],
    inStock: true,
    createdAt: '2026-09-06T10:00:00.000Z',
  },
  {
    id: 'thrift_satchel',
    name: 'Vintage Leather Satchel',
    slug: 'vintage-leather-satchel',
    category: 'thrift',
    styleCategory: 'Thrift',
    collection: 'thrift-edit',
    price: 132,
    currency: 'USD',
    image: '/images/thrift-satchel.jpg',
    images: ['/images/thrift-satchel.jpg'],
    badge: 'LIMITED PIECE',
    condition: 'Good',
    description:
      'A structured brown leather satchel with twin buckled pockets and a warm patina — carried character that only time can create.',
    sizes: ['One Size'],
    colors: ['Chocolate'],
    tags: ['thrift', 'bag', 'leather', 'satchel'],
    inStock: true,
    isFeatured: true,
    createdAt: '2026-09-04T10:00:00.000Z',
  },
  {
    id: 'thrift_velvet',
    name: 'Vintage Velvet Wrap Dress',
    slug: 'vintage-velvet-wrap-dress',
    category: 'thrift',
    styleCategory: 'Thrift',
    collection: 'thrift-edit',
    price: 164,
    currency: 'USD',
    image: '/images/thrift-velvet-dress.jpg',
    images: ['/images/thrift-velvet-dress.jpg'],
    badge: 'ONE OF ONE',
    condition: 'Very Good',
    description:
      'Deep burgundy velvet with a plunging wrap front and self-tie waist — an archival evening piece in the colour of the season.',
    sizes: ['S'],
    colors: ['Burgundy'],
    tags: ['thrift', 'dress', 'velvet', 'one-of-one'],
    inStock: true,
    createdAt: '2026-09-02T10:00:00.000Z',
  },
  {
    id: 'thrift_pleated',
    name: 'Vintage Pleated Midi Skirt',
    slug: 'vintage-pleated-midi-skirt',
    category: 'thrift',
    styleCategory: 'Thrift',
    collection: 'thrift-edit',
    price: 78,
    currency: 'USD',
    image: '/images/thrift-pleated-skirt.jpg',
    images: ['/images/thrift-pleated-skirt.jpg'],
    badge: 'CURATED FIND',
    condition: 'Excellent',
    description:
      'Crisp knife pleats in soft black with a high waist and easy swing — a vintage silhouette styled for now.',
    sizes: ['S', 'M'],
    colors: ['Noir'],
    tags: ['thrift', 'skirt', 'pleated'],
    inStock: true,
    createdAt: '2026-08-30T10:00:00.000Z',
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
  {
    id: 'col_statement',
    name: 'Statement Pieces',
    slug: 'statement-pieces',
    description: 'Standout pieces designed to make the look unforgettable.',
    image: '/images/collection-statement.jpg',
    productIds: products
      .filter((p) => p.category === 'statement' || p.tags?.includes('statement'))
      .map((p) => p.id),
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

/** Same style or collection first, then anything else — never the product itself */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const others = products.filter((item) => item.id !== product.id)
  const score = (item: Product) =>
    (item.styleCategory === product.styleCategory ? 2 : 0) +
    (item.collection === product.collection ? 1 : 0)

  return [...others].sort((a, b) => score(b) - score(a)).slice(0, limit)
}

export function getThriftProducts(): Product[] {
  return products
    .filter((product) => product.category === 'thrift')
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
}
