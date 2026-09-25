import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import { OrderSummary } from '@/components/checkout'
import { Button, Container } from '@/components/ui'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { getOrder } from '@/lib/checkout'
import { ROUTES } from '@/lib/constants'
import { formatDate } from '@/lib/format'
import { SHIPPING_CONFIRMED_LABEL } from '@/lib/shipping'
import type { Order } from '@/types/commerce'
import { NotFoundPage } from './NotFoundPage'

export function OrderConfirmationPage() {
  const { reference } = useParams()
  const order = reference ? getOrder(reference) : undefined

  if (!order) return <NotFoundPage />
  return <OrderConfirmation order={order} />
}

function OrderConfirmation({ order }: { order: Order }) {
  useDocumentTitle(`Order ${order.reference}`)
  const reduced = usePrefersReducedMotion()
  const { details } = order
  const itemCount = order.lines.reduce((sum, line) => sum + line.quantity, 0)

  const address = [
    `${details.firstName} ${details.lastName}`,
    details.address,
    details.apartment,
    [details.city, details.region, details.postalCode].filter(Boolean).join(', '),
    details.country,
  ].filter(Boolean)

  return (
    <section aria-labelledby="confirmation-heading" className="bg-canvas">
      <Container size="wide" className="pb-[var(--spacing-section)] pt-12 md:pt-20">
        <motion.div
          className="max-w-3xl"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionDuration.slow, ease: editorialEase }}
        >
          <p className="editorial-label mb-4 text-burgundy">Order Received</p>
          <h1 id="confirmation-heading" className="font-display text-h1 text-balance">
            Thank you, {details.firstName}.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-body-lg text-muted">
            Your order <span className="tabular-nums text-ink">{order.reference}</span>{' '}
            was placed on {formatDate(order.placedAt)}.
          </p>
          <p className="mt-8 max-w-xl border-l-2 border-burgundy pl-4 text-small leading-relaxed text-ink-secondary">
            Online payment isn&apos;t connected yet, so no charge was made. This
            order is saved on this device only.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-12 border-t border-border pt-12 md:mt-20 lg:grid-cols-12 lg:gap-16 xl:gap-24">
          <div className="space-y-10 lg:col-span-5">
            <div>
              <h2 className="editorial-label mb-4 text-ink">Delivering To</h2>
              <address className="text-body-lg not-italic leading-relaxed text-ink-secondary">
                {address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div>
              <h2 className="editorial-label mb-4 text-ink">Contact</h2>
              <p className="text-body-lg text-ink-secondary">{details.email}</p>
              {details.phone ? (
                <p className="text-body-lg text-ink-secondary">{details.phone}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-8 pt-2">
              <Button href={ROUTES.shop}>Continue Shopping</Button>
              <Button href={ROUTES.account} variant="secondary">
                View Your Orders
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="editorial-label mb-6 text-ink">
              Your Pieces ({itemCount})
            </h2>
            <OrderSummary
              lines={order.lines}
              subtotal={order.subtotal}
              currency={order.currency}
              shipping={order.freeShipping ? 'Free' : SHIPPING_CONFIRMED_LABEL}
              linkProducts
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
