import { ROUTES, SITE } from '@/lib/constants'
import type { Product } from '@/types/commerce'

const absolute = (path: string) => (path.startsWith('http') ? path : `${SITE.url}${path}`)

/** schema.org Product markup; `<` is escaped so the JSON can't close its script tag */
export function productJsonLd(product: Product): string {
  const images = [product.image, ...(product.images ?? [])]

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.id,
    description: product.description,
    image: [...new Set(images)].map(absolute),
    brand: { '@type': 'Brand', name: SITE.name },
    color: product.colors?.join(', '),
    offers: {
      '@type': 'Offer',
      url: `${SITE.url}${ROUTES.product}/${product.slug}`,
      price: product.price.toFixed(2),
      priceCurrency: product.currency,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition:
        product.category === 'thrift'
          ? 'https://schema.org/UsedCondition'
          : 'https://schema.org/NewCondition',
    },
  }).replace(/</g, '\\u003c')
}
