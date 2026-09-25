import { DEFAULT_FILTER } from '@/lib/constants'
import type { Product, ProductFilter, SearchResult } from '@/types/commerce'
import { categories, collections, products } from '@/data/catalog'

/** Pure filter/search helpers — ready for Phase 2 filter UI */
export function createFilter(
  overrides: Partial<ProductFilter> = {},
): ProductFilter {
  return { ...DEFAULT_FILTER, ...overrides }
}

export function filterProducts(
  catalog: Product[] = products,
  filter: ProductFilter = DEFAULT_FILTER,
): Product[] {
  // Loose plural handling so "dresses" or "tops" still match "dress" / "top"
  const terms = filter.query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => (term.length > 3 ? term.replace(/(es|s)$/, '') : term))

  let result = catalog.filter((product) => {
    if (filter.inStockOnly && !product.inStock) return false
    if (
      filter.categories.length > 0 &&
      !filter.categories.includes(product.category)
    ) {
      return false
    }
    if (
      filter.collections.length > 0 &&
      !filter.collections.includes(product.collection)
    ) {
      return false
    }
    if (
      filter.badges.length > 0 &&
      (!product.badge || !filter.badges.includes(product.badge))
    ) {
      return false
    }
    if (
      typeof filter.priceMin === 'number' &&
      product.price < filter.priceMin
    ) {
      return false
    }
    if (
      typeof filter.priceMax === 'number' &&
      product.price > filter.priceMax
    ) {
      return false
    }
    if (filter.sizes.length > 0) {
      const sizes = product.sizes ?? []
      if (!filter.sizes.some((size) => sizes.includes(size))) return false
    }
    if (filter.colors.length > 0) {
      const colors = product.colors ?? []
      if (!filter.colors.some((color) => colors.includes(color))) return false
    }
    if (terms.length > 0) {
      const haystack = [
        product.name,
        product.description ?? '',
        product.collection,
        product.category,
        product.styleCategory,
        product.badge ?? '',
        ...(product.colors ?? []),
        ...(product.tags ?? []),
      ]
        .join(' ')
        .toLowerCase()
      if (!terms.every((term) => haystack.includes(term))) return false
    }
    return true
  })

  switch (filter.sortBy) {
    case 'newest':
      result = [...result].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      break
    case 'price-asc':
      result = [...result].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result = [...result].sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'featured':
    default:
      result = [...result].sort(
        (a, b) => Number(b.isFeatured) - Number(a.isFeatured),
      )
      break
  }

  return result
}

export function searchCatalog(query: string): SearchResult {
  const trimmed = query.trim()
  const matchedProducts = filterProducts(
    products,
    createFilter({ query: trimmed, sortBy: 'featured' }),
  )
  const q = trimmed.toLowerCase()

  return {
    query: trimmed,
    products: matchedProducts,
    categories: categories.filter(
      (category) =>
        !q ||
        category.name.toLowerCase().includes(q) ||
        category.description.toLowerCase().includes(q),
    ),
    collections: collections.filter(
      (collection) =>
        !q ||
        collection.name.toLowerCase().includes(q) ||
        collection.description.toLowerCase().includes(q),
    ),
    total: matchedProducts.length,
  }
}
