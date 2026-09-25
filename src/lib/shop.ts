import type { Product, ProductSortOption } from '@/types/commerce'
import { createFilter, filterProducts } from './catalog'

export type PriceRange = {
  id: string
  label: string
  min?: number
  max?: number
}

export const PRICE_RANGES: PriceRange[] = [
  { id: 'under-100', label: 'Under $100', max: 99.99 },
  { id: '100-200', label: '$100 – $200', min: 100, max: 200 },
  { id: 'over-200', label: 'Over $200', min: 200.01 },
]

export const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

const SIZE_ORDER = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']

export type ShopQuery = {
  sizes: string[]
  colors: string[]
  price: string | null
  sort: ProductSortOption
}

const readList = (params: URLSearchParams, key: string) =>
  params.get(key)?.split(',').filter(Boolean) ?? []

export function parseShopQuery(params: URLSearchParams): ShopQuery {
  const sort = params.get('sort') as ProductSortOption | null
  const price = params.get('price')

  return {
    sizes: readList(params, 'size'),
    colors: readList(params, 'color'),
    price: PRICE_RANGES.some((range) => range.id === price) ? price : null,
    sort: SORT_OPTIONS.some((option) => option.value === sort)
      ? (sort as ProductSortOption)
      : 'featured',
  }
}

export function serializeShopQuery(query: ShopQuery): URLSearchParams {
  const params = new URLSearchParams()
  if (query.sizes.length) params.set('size', query.sizes.join(','))
  if (query.colors.length) params.set('color', query.colors.join(','))
  if (query.price) params.set('price', query.price)
  if (query.sort !== 'featured') params.set('sort', query.sort)
  return params
}

export function applyShopQuery(catalog: Product[], query: ShopQuery): Product[] {
  const range = PRICE_RANGES.find((item) => item.id === query.price)

  return filterProducts(
    catalog,
    createFilter({
      sizes: query.sizes,
      colors: query.colors,
      priceMin: range?.min,
      priceMax: range?.max,
      sortBy: query.sort,
    }),
  )
}

/** Only offer sizes and colours that exist in the current listing */
export function getFacetOptions(catalog: Product[]) {
  const sizes = new Set<string>()
  const colors = new Set<string>()

  catalog.forEach((product) => {
    product.sizes?.forEach((size) => sizes.add(size))
    product.colors?.forEach((color) => colors.add(color))
  })

  const rank = (size: string) => {
    const index = SIZE_ORDER.indexOf(size)
    return index === -1 ? SIZE_ORDER.length : index
  }

  return {
    sizes: [...sizes].sort((a, b) => rank(a) - rank(b)),
    colors: [...colors].sort((a, b) => a.localeCompare(b)),
  }
}

export function countActiveFilters(query: ShopQuery): number {
  return query.sizes.length + query.colors.length + (query.price ? 1 : 0)
}

export function toggleValue(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value]
}
