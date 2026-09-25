import { formatPrice } from '@/lib/format'
import { ROUTES } from '@/lib/constants'
import type { OrderLine, Product } from '@/types/commerce'

type OrderSummaryProps = {
  lines: OrderLine[]
  subtotal: number
  currency: Product['currency']
  freeShipping: boolean
  linkProducts?: boolean
}

export function OrderSummary({
  lines,
  subtotal,
  currency,
  freeShipping,
  linkProducts = false,
}: OrderSummaryProps) {
  return (
    <div>
      <ul>
        {lines.map((line) => {
          const name = (
            <span className="font-display text-lg leading-snug text-ink">
              {line.name}
            </span>
          )
          return (
            <li
              key={`${line.productId}-${line.size ?? ''}-${line.color ?? ''}`}
              className="flex gap-4 border-b border-border py-4 first:pt-0"
            >
              <div className="relative h-24 w-[4.5rem] shrink-0 bg-soft">
                <img src={line.image} alt="" className="h-full w-full object-cover" />
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center bg-ink px-1 text-[0.65rem] tabular-nums text-canvas">
                  <span className="sr-only">Quantity </span>
                  {line.quantity}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                <div className="min-w-0">
                  {linkProducts ? (
                    <a
                      href={`${ROUTES.product}/${line.slug}`}
                      className="transition-colors hover:text-burgundy"
                    >
                      {name}
                    </a>
                  ) : (
                    name
                  )}
                  {line.size || line.color ? (
                    <p className="mt-1 text-small text-muted">
                      {[line.size, line.color].filter(Boolean).join(' / ')}
                    </p>
                  ) : null}
                </div>
                <p className="shrink-0 text-small tabular-nums text-ink">
                  {formatPrice(line.price * line.quantity, currency)}
                </p>
              </div>
            </li>
          )
        })}
      </ul>

      <dl className="space-y-3 pt-5 text-small">
        <div className="flex justify-between gap-4">
          <dt className="text-ink-secondary">Shipping</dt>
          <dd className="text-right text-ink">
            {freeShipping ? 'Free' : 'Calculated at payment'}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-secondary">Taxes</dt>
          <dd className="text-right text-ink">Calculated at payment</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-border pt-4">
          <dt className="editorial-label text-ink">Subtotal</dt>
          <dd className="font-display text-2xl tabular-nums text-ink">
            {formatPrice(subtotal, currency)}
          </dd>
        </div>
      </dl>
    </div>
  )
}
