import type { BagLine } from '@/lib/bag'
import { summarizeBag } from '@/lib/bag'
import { isValidEmail } from '@/lib/newsletter'
import type { CheckoutDetails, Order, OrderLine } from '@/types/commerce'

const STORAGE_KEY = 'empress:orders'

export type CheckoutField = keyof CheckoutDetails
export type CheckoutErrors = Partial<Record<CheckoutField, string>>

export const emptyCheckoutDetails: CheckoutDetails = {
  email: '',
  marketingOptIn: false,
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  region: '',
  postalCode: '',
  country: '',
  phone: '',
}

const requiredFields: { field: CheckoutField; message: string }[] = [
  { field: 'email', message: 'Enter your email address.' },
  { field: 'firstName', message: 'Enter your first name.' },
  { field: 'lastName', message: 'Enter your last name.' },
  { field: 'address', message: 'Enter your street address.' },
  { field: 'city', message: 'Enter your city.' },
  { field: 'postalCode', message: 'Enter your postal code.' },
  { field: 'country', message: 'Enter your country.' },
]

/** Field order matches the form so the first error can receive focus. */
export function validateCheckout(details: CheckoutDetails): CheckoutErrors {
  const errors: CheckoutErrors = {}

  for (const { field, message } of requiredFields) {
    const value = details[field]
    if (typeof value === 'string' && !value.trim()) errors[field] = message
  }

  if (!errors.email && !isValidEmail(details.email)) {
    errors.email = 'Enter a valid email address, like you@example.com.'
  }

  return errors
}

export function toOrderLines(lines: BagLine[]): OrderLine[] {
  return lines.map(({ item, product }) => ({
    productId: product.id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  }))
}

function createReference() {
  const stamp = Date.now().toString(36).slice(-4)
  const random = crypto.randomUUID().replace(/-/g, '').slice(0, 4)
  return `EE-${stamp}${random}`.toUpperCase()
}

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
}

export function getOrder(reference: string): Order | undefined {
  return getOrders().find((order) => order.reference === reference)
}

/**
 * Saves the order on this device until a payment provider (Stripe, Shopify,
 * etc.) is connected. Replace the body with an API call when that lands.
 */
export async function placeOrder(
  details: CheckoutDetails,
  lines: BagLine[],
): Promise<{ ok: true; order: Order } | { ok: false; error: string }> {
  if (lines.length === 0) {
    return { ok: false, error: 'Your bag is empty.' }
  }

  const { subtotal, currency, freeShipping } = summarizeBag(lines)
  const order: Order = {
    reference: createReference(),
    placedAt: new Date().toISOString(),
    details: {
      ...details,
      email: details.email.trim().toLowerCase(),
    },
    lines: toOrderLines(lines),
    subtotal,
    currency,
    freeShipping,
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([order, ...getOrders()]),
    )
    return { ok: true, order }
  } catch {
    return { ok: false, error: 'Something went wrong. Please try again.' }
  }
}
