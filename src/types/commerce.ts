/** Core ecommerce domain types — ready for Phase 2+ wiring */

export type ProductBadge =
  | 'New'
  | 'Thrift'
  | 'Limited'
  | 'Statement'
  | 'Seasonal'
  | 'ONE OF ONE'
  | 'CURATED FIND'
  | 'PRE-LOVED'
  | 'LIMITED PIECE'

export type ProductCategorySlug =
  | 'new'
  | 'thrift'
  | 'womens'
  | 'statement'
  | 'seasonal'

export type ProductStyleCategory =
  | 'Dresses'
  | 'Tops'
  | 'Bottoms'
  | 'Sets'
  | 'Thrift'
  | 'Statement'

export type Product = {
  id: string
  name: string
  slug: string
  category: ProductCategorySlug
  styleCategory: ProductStyleCategory
  collection: string
  price: number
  compareAtPrice?: number
  currency: 'USD' | 'GBP' | 'EUR'
  image: string
  images?: string[]
  badge?: ProductBadge
  description?: string
  condition?: string
  sizes?: string[]
  colors?: string[]
  tags?: string[]
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
  createdAt: string
}

export type Category = {
  id: string
  name: string
  slug: ProductCategorySlug
  description: string
  image?: string
  productCount: number
}

export type Collection = {
  id: string
  name: string
  slug: string
  description: string
  season?: string
  year?: number
  image?: string
  productIds: string[]
  isFeatured?: boolean
}

export type CartItem = {
  id: string
  productId: string
  quantity: number
  size?: string
  color?: string
  addedAt: string
}

export type Cart = {
  items: CartItem[]
  updatedAt: string | null
}

export type WishlistItem = {
  id: string
  productId: string
  addedAt: string
}

export type Wishlist = {
  items: WishlistItem[]
  updatedAt: string | null
}

export type ProductFilter = {
  categories: ProductCategorySlug[]
  collections: string[]
  priceMin?: number
  priceMax?: number
  badges: ProductBadge[]
  inStockOnly: boolean
  sizes: string[]
  colors: string[]
  query: string
  sortBy: ProductSortOption
}

export type ProductSortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'

export type Review = {
  id: string
  productId: string
  author: string
  rating: number
  title: string
  body: string
  createdAt: string
  verifiedPurchase: boolean
}

export type NewsletterSubscriber = {
  email: string
  subscribedAt: string
  source?: string
}

export type SearchResult = {
  products: Product[]
  categories: Category[]
  collections: Collection[]
  query: string
  total: number
}
