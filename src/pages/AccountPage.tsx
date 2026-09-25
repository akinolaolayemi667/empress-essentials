import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/layout'
import { Button, Container } from '@/components/ui'
import { openBagDrawer } from '@/hooks/useBagDrawer'
import { useCart } from '@/hooks/useCart'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useWishlist } from '@/hooks/useWishlist'
import { getOrders } from '@/lib/checkout'
import { ROUTES } from '@/lib/constants'
import { formatDate, formatPrice } from '@/lib/format'

const pieces = (count: number) => `${count} ${count === 1 ? 'piece' : 'pieces'}`

export function AccountPage() {
  useDocumentTitle('Account')
  const { count: wishlistCount } = useWishlist()
  const { itemCount } = useCart()
  const orders = getOrders()

  const shortcuts = [
    {
      label: 'Wishlist',
      detail: wishlistCount > 0 ? `${pieces(wishlistCount)} saved` : 'Nothing saved yet',
      href: ROUTES.wishlist,
    },
    {
      label: 'Bag',
      detail: itemCount > 0 ? `${pieces(itemCount)} waiting` : 'Your bag is empty',
      onClick: openBagDrawer,
    },
  ]

  return (
    <>
      <PageHeader
        label="Your Account"
        title="Account"
        description="Signing in and syncing across devices are on their way. Until then, everything here is saved on this device."
        breadcrumbs={[{ label: 'Home', href: ROUTES.home }, { label: 'Account' }]}
      />

      <section aria-label="Shortcuts" className="bg-canvas">
        <Container size="wide">
          <ul className="grid border-t border-border sm:grid-cols-2">
            {shortcuts.map((item) => {
              const content = (
                <>
                  <span>
                    <span className="block font-display text-h3 text-ink">{item.label}</span>
                    <span className="mt-1 block text-small text-muted">{item.detail}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    strokeWidth={1.4}
                    aria-hidden
                    className="text-ink transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </>
              )
              const className =
                'group flex w-full items-center justify-between gap-6 py-8 text-left transition-colors hover:text-burgundy'

              return (
                <li key={item.label} className="border-b border-border sm:odd:border-r sm:odd:pr-10 sm:even:pl-10">
                  {item.href ? (
                    <a href={item.href} className={className}>
                      {content}
                    </a>
                  ) : (
                    <button type="button" onClick={item.onClick} className={className}>
                      {content}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="orders-heading" className="bg-canvas">
        <Container size="wide" className="pb-[var(--spacing-section)] pt-16 md:pt-24">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="orders-heading" className="font-display text-h2">
              Orders
            </h2>
            {orders.length > 0 ? (
              <p className="editorial-label text-muted">{orders.length} on this device</p>
            ) : null}
          </div>

          {orders.length === 0 ? (
            <div className="mt-8 flex flex-col items-start border-t border-border py-14">
              <p className="font-display text-h3 text-ink">No orders yet.</p>
              <p className="mt-3 max-w-md text-small text-muted">
                Orders you place will appear here.
              </p>
              <Button href={ROUTES.newArrivals} className="mt-10">
                Shop New Arrivals
              </Button>
            </div>
          ) : (
            <ul className="mt-8 border-t border-border">
              {orders.map((order) => {
                const count = order.lines.reduce((sum, line) => sum + line.quantity, 0)
                return (
                  <li key={order.reference} className="border-b border-border">
                    <a
                      href={`${ROUTES.checkout}/confirmation/${order.reference}`}
                      className="group flex flex-wrap items-center gap-x-8 gap-y-3 py-6"
                    >
                      <div className="flex -space-x-3">
                        {order.lines.slice(0, 3).map((line) => (
                          <img
                            key={`${line.productId}-${line.size ?? ''}-${line.color ?? ''}`}
                            src={line.image}
                            alt=""
                            className="h-16 w-12 border-2 border-canvas object-cover"
                          />
                        ))}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-xl tabular-nums text-ink transition-colors group-hover:text-burgundy">
                          {order.reference}
                        </p>
                        <p className="mt-1 text-small text-muted">
                          {formatDate(order.placedAt)} · {pieces(count)}
                        </p>
                      </div>
                      <p className="text-small tabular-nums text-ink">
                        {formatPrice(order.subtotal, order.currency)}
                      </p>
                      <ArrowRight
                        size={16}
                        strokeWidth={1.4}
                        aria-hidden
                        className="text-ink transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </Container>
      </section>
    </>
  )
}
