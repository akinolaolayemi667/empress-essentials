import { ChevronDown, Lock } from 'lucide-react'
import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { OrderSummary, TextField } from '@/components/checkout'
import { Breadcrumbs } from '@/components/layout'
import { Button, Container } from '@/components/ui'
import { openBagDrawer } from '@/hooks/useBagDrawer'
import { useCart } from '@/hooks/useCart'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { resolveBagLines, summarizeBag } from '@/lib/bag'
import {
  emptyCheckoutDetails,
  placeOrder,
  toOrderLines,
  validateCheckout,
  type CheckoutErrors,
  type CheckoutField,
} from '@/lib/checkout'
import { ROUTES, SITE } from '@/lib/constants'
import { formatPrice } from '@/lib/format'
import { deliveryEstimate, isDomestic, shippingLabel } from '@/lib/shipping'

type Status = 'idle' | 'submitting' | 'error'

function CheckoutSection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: ReactNode
}) {
  const headingId = useId()
  return (
    <section aria-labelledby={headingId} className="border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 id={headingId} className="mb-8 flex items-baseline gap-4">
        <span className="editorial-label text-burgundy">{number}</span>
        <span className="font-display text-h3 text-ink">{title}</span>
      </h2>
      {children}
    </section>
  )
}

export function CheckoutPage() {
  useDocumentTitle('Checkout')
  const navigate = useNavigate()
  const summaryId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const { items, itemCount, clear } = useCart()
  const [details, setDetails] = useState(emptyCheckoutDetails)
  const [errors, setErrors] = useState<CheckoutErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [formError, setFormError] = useState('')

  const lines = resolveBagLines(items)
  const { subtotal, currency, remaining, overFreeShippingThreshold } = summarizeBag(lines)
  const shipping = shippingLabel(subtotal, details.country)
  const estimate = deliveryEstimate(details)
  const international = details.country.trim() !== '' && !isDomestic(details.country)
  const summary = (
    <OrderSummary
      lines={toOrderLines(lines)}
      subtotal={subtotal}
      currency={currency}
      shipping={shipping}
    />
  )

  const threshold = formatPrice(SITE.freeShippingThreshold, currency)
  const shippingNote = international
    ? 'International shipping is quoted for your address and confirmed before payment. Customs duties or import taxes set by your country are not included.'
    : overFreeShippingThreshold
      ? `Your order qualifies for free shipping within Nigeria on orders over ${threshold}.`
      : `Add ${formatPrice(remaining, currency)} more for free shipping within Nigeria.`

  const update = (name: CheckoutField) => (event: ChangeEvent<HTMLInputElement>) => {
    const { type, checked, value } = event.target
    setDetails((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const field = (name: Exclude<CheckoutField, 'marketingOptIn'>) => ({
    name,
    value: details[name],
    onChange: update(name),
    error: errors[name],
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateCheckout(details)
    setErrors(nextErrors)

    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)
        ?.focus()
      return
    }

    setStatus('submitting')
    const result = await placeOrder(details, lines)
    if (!result.ok) {
      setFormError(result.error)
      setStatus('error')
      return
    }
    navigate(`${ROUTES.checkout}/confirmation/${result.order.reference}`)
    clear()
  }

  const errorCount = Object.keys(errors).length

  return (
    <section aria-labelledby="checkout-heading" className="bg-canvas">
      <Container size="wide" className="pb-[var(--spacing-section)] pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'Checkout' }]} />

        <div className="mt-8 md:mt-12">
          <p className="editorial-label mb-4 text-burgundy">Checkout</p>
          <h1 id="checkout-heading" className="font-display text-h1 text-balance">
            Complete Your Order
          </h1>
        </div>

        {lines.length === 0 ? (
          <div className="mt-10 flex flex-col items-start border-t border-border py-16 md:py-24">
            <p className="font-display text-h3 text-ink">Your bag is empty.</p>
            <p className="mt-3 max-w-md text-small text-muted">
              Add a piece or two and you&apos;ll be able to check out here.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Button href={ROUTES.newArrivals}>Shop New Arrivals</Button>
              <Button href={ROUTES.wishlist} variant="secondary">
                View Wishlist
              </Button>
            </div>
          </div>
        ) : (
          <>
            <details className="group mt-8 border-y border-border lg:hidden">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <span className="editorial-label flex items-center gap-2 text-ink">
                  <span className="group-open:hidden">Show</span>
                  <span className="hidden group-open:inline">Hide</span>
                  order summary ({itemCount})
                  <ChevronDown
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden
                    className="transition-transform duration-300 group-open:rotate-180"
                  />
                </span>
                <span className="font-display text-xl tabular-nums text-ink">
                  {formatPrice(subtotal, currency)}
                </span>
              </summary>
              <div className="pb-6 pt-2">{summary}</div>
            </details>

            <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16 xl:gap-24">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="lg:col-span-7"
              >
                {errorCount > 0 || status === 'error' ? (
                  <p role="alert" className="mb-10 border-l-2 border-burgundy pl-4 text-small text-burgundy">
                    {status === 'error'
                      ? formError
                      : `Please check the ${errorCount === 1 ? 'highlighted field' : `${errorCount} highlighted fields`}.`}
                  </p>
                ) : null}

                <CheckoutSection number="01" title="Contact">
                  <TextField
                    label="Email address"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    {...field('email')}
                  />
                  <label className="mt-6 flex cursor-pointer items-start gap-3 text-small text-ink-secondary">
                    <input
                      type="checkbox"
                      name="marketingOptIn"
                      checked={details.marketingOptIn}
                      onChange={update('marketingOptIn')}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-burgundy"
                    />
                    Email me about new arrivals and thrift drops.
                  </label>
                </CheckoutSection>

                <CheckoutSection number="02" title="Delivery">
                  <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
                    <TextField label="First name" autoComplete="given-name" required {...field('firstName')} />
                    <TextField label="Last name" autoComplete="family-name" required {...field('lastName')} />
                    <TextField
                      label="Address"
                      autoComplete="address-line1"
                      required
                      className="sm:col-span-2"
                      {...field('address')}
                    />
                    <TextField
                      label="Apartment, suite, etc."
                      autoComplete="address-line2"
                      optional
                      className="sm:col-span-2"
                      {...field('apartment')}
                    />
                    <TextField label="City" autoComplete="address-level2" required {...field('city')} />
                    <TextField
                      label="State / Region"
                      autoComplete="address-level1"
                      optional
                      {...field('region')}
                    />
                    <TextField label="Postal code" autoComplete="postal-code" required {...field('postalCode')} />
                    <TextField label="Country" autoComplete="country-name" required {...field('country')} />
                    <TextField
                      label="Phone"
                      type="tel"
                      autoComplete="tel"
                      optional
                      hint="Only used if we need to reach you about delivery."
                      className="sm:col-span-2"
                      {...field('phone')}
                    />
                  </div>
                </CheckoutSection>

                <CheckoutSection number="03" title="Delivery Method">
                  <div className="flex items-start justify-between gap-6 border border-ink px-5 py-5">
                    <div>
                      <p className="text-body-lg text-ink">
                        {international ? 'International delivery' : 'Standard delivery'}
                      </p>
                      <p className="mt-1 text-small text-ink-secondary" aria-live="polite">
                        {estimate ?? 'Enter your address to see the delivery estimate.'}
                      </p>
                      <p className="mt-2 text-small text-muted">{shippingNote}</p>
                    </div>
                    <p className="shrink-0 text-right text-small text-ink">{shipping}</p>
                  </div>
                  <a
                    href={ROUTES.shipping}
                    className="mt-4 inline-block text-[0.75rem] text-muted underline underline-offset-4 transition-colors hover:text-ink"
                  >
                    Shipping &amp; Returns policy
                  </a>
                </CheckoutSection>

                <CheckoutSection number="04" title="Payment">
                  <div className="flex gap-4 bg-soft px-5 py-6">
                    <Lock size={18} strokeWidth={1.4} aria-hidden className="mt-0.5 shrink-0 text-burgundy" />
                    <div>
                      <p className="text-body-lg text-ink">Online payment is being connected.</p>
                      <p className="mt-2 text-small leading-relaxed text-muted">
                        No card details are collected on this page. Placing your
                        order saves it on this device only. No charge is made.
                      </p>
                    </div>
                  </div>
                </CheckoutSection>

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={status === 'submitting'}
                  className="mt-2"
                >
                  {status === 'submitting' ? 'Placing Order' : 'Place Order'}
                </Button>
                <p className="mt-4 text-center text-[0.75rem] leading-relaxed text-muted">
                  By placing your order you agree to our{' '}
                  <a href={ROUTES.terms} className="text-ink underline underline-offset-4 hover:text-burgundy">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href={ROUTES.privacy} className="text-ink underline underline-offset-4 hover:text-burgundy">
                    Privacy Policy
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={openBagDrawer}
                  className="editorial-label mt-5 w-full text-center text-muted transition-colors hover:text-ink"
                >
                  Edit Bag
                </button>
              </form>

              <aside aria-labelledby={summaryId} className="hidden lg:col-span-5 lg:block">
                <div className="sticky top-32 border-t border-ink pt-6">
                  <div className="mb-6 flex items-baseline justify-between gap-4">
                    <h2 id={summaryId} className="editorial-label text-ink">
                      Order Summary ({itemCount})
                    </h2>
                    <button
                      type="button"
                      onClick={openBagDrawer}
                      className="text-[0.75rem] text-muted underline underline-offset-4 transition-colors hover:text-burgundy"
                    >
                      Edit
                    </button>
                  </div>
                  {summary}
                </div>
              </aside>
            </div>
          </>
        )}
      </Container>
    </section>
  )
}
