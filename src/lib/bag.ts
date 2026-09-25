import { getProductById } from '@/data'
import { SITE } from '@/lib/constants'
import type { CartItem, Product } from '@/types/commerce'

export type BagLine = {
  item: CartItem
  product: Product
}

export function resolveBagLines(items: CartItem[]): BagLine[] {
  return items.flatMap((item) => {
    const product = getProductById(item.productId)
    return product ? [{ item, product }] : []
  })
}

export function summarizeBag(lines: BagLine[]) {
  const subtotal = lines.reduce(
    (sum, { item, product }) => sum + product.price * item.quantity,
    0,
  )
  const threshold = SITE.freeShippingThreshold

  return {
    subtotal,
    currency: lines[0]?.product.currency ?? 'USD',
    remaining: Math.max(0, threshold - subtotal),
    progress: Math.min(100, (subtotal / threshold) * 100),
    overFreeShippingThreshold: subtotal >= threshold,
  }
}
