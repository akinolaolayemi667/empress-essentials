import { deliveryEstimates } from '@/data/business'
import { SITE } from '@/lib/constants'

const DOMESTIC_PATTERN = /^(nigeria|ng|nga|federal republic of nigeria)$/i

export const SHIPPING_CONFIRMED_LABEL = 'Confirmed before payment'

export function isDomestic(country: string): boolean {
  return DOMESTIC_PATTERN.test(country.trim())
}

export function qualifiesForFreeShipping(subtotal: number, country: string): boolean {
  return subtotal >= SITE.freeShippingThreshold && isDomestic(country)
}

/** Free shipping applies only to Nigerian addresses over the threshold */
export function shippingLabel(subtotal: number, country: string): string {
  if (subtotal >= SITE.freeShippingThreshold) {
    if (isDomestic(country)) return 'Free'
    if (!country.trim()) return 'Free within Nigeria'
  }
  return SHIPPING_CONFIRMED_LABEL
}

export function deliveryEstimate(address: {
  country: string
  city: string
  region: string
}): string | null {
  if (!address.country.trim()) return null
  const [lagos, otherStates, international] = deliveryEstimates

  if (!isDomestic(address.country)) return `${international.region}: ${international.time.toLowerCase()}`
  if (/lagos/i.test(`${address.city} ${address.region}`)) return `${lagos.region}: ${lagos.time}`
  return `${otherStates.region}: ${otherStates.time}`
}
