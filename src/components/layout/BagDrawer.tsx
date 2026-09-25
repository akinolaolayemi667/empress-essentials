import { Minus, Plus, X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui'
import { useCart } from '@/hooks/useCart'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { resolveBagLines, summarizeBag } from '@/lib/bag'
import { formatPrice } from '@/lib/format'
import { ROUTES } from '@/lib/constants'

type BagDrawerProps = {
  open: boolean
  onClose: () => void
}

export function BagDrawer({ open, onClose }: BagDrawerProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const { items, itemCount, updateQuantity, removeItem } = useCart()
  const reduced = usePrefersReducedMotion()

  useBodyScrollLock(open)
  useEscapeKey(onClose, open)

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  const lines = resolveBagLines(items)
  const { subtotal, currency, remaining, progress } = summarizeBag(lines)

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close bag"
            tabIndex={-1}
            className="fixed inset-0 z-[70] bg-ink/35 backdrop-blur-[2px]"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-y-0 right-0 z-[75] flex w-full max-w-md flex-col border-l border-border bg-canvas shadow-soft"
            initial={reduced ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduced ? undefined : { x: '100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 id={titleId} className="font-display text-2xl font-medium">
                Your Bag
                {itemCount > 0 ? (
                  <span className="ml-2 text-base text-muted">({itemCount})</span>
                ) : null}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close bag"
                className="flex h-11 w-11 items-center justify-center text-ink transition-opacity hover:opacity-60"
              >
                <X size={18} strokeWidth={1.4} />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-start justify-center px-6 py-8">
                <p className="font-display text-2xl text-ink">
                  Your bag is currently empty.
                </p>
                <p className="mt-3 max-w-xs text-small text-muted">
                  Discover new arrivals, thrift finds, and statement pieces
                  when you are ready.
                </p>
                <Button type="button" className="mt-8" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="border-b border-border px-6 py-4">
                  <p className="text-small text-ink-secondary" aria-live="polite">
                    {remaining > 0
                      ? `You're ${formatPrice(remaining, currency)} away from free shipping within Nigeria.`
                      : 'You qualify for free shipping within Nigeria.'}
                  </p>
                  <div
                    className="mt-2.5 h-px w-full bg-border"
                    role="progressbar"
                    aria-label="Progress to free shipping"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progress)}
                  >
                    <div
                      className="h-px bg-burgundy transition-[width] duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <ul className="flex-1 overflow-y-auto px-6 py-6">
                  {lines.map(({ item, product }) => (
                    <li
                      key={item.id}
                      className="flex gap-4 border-b border-border py-5 first:pt-0"
                    >
                      <div className="h-28 w-[5.5rem] shrink-0 overflow-hidden bg-soft">
                        <img
                          src={product.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-display text-lg leading-snug text-ink">
                              {product.name}
                            </p>
                            {item.size || item.color ? (
                              <p className="mt-1 text-small text-muted">
                                {[item.size, item.color].filter(Boolean).join(' / ')}
                              </p>
                            ) : null}
                          </div>
                          <p className="shrink-0 text-small tabular-nums text-ink">
                            {formatPrice(product.price * item.quantity, product.currency)}
                          </p>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="inline-flex items-center border border-border">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="flex h-9 w-9 items-center justify-center text-ink disabled:opacity-30"
                              disabled={item.quantity <= 1}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus size={13} strokeWidth={1.5} />
                            </button>
                            <span
                              className="min-w-8 text-center text-small tabular-nums"
                              aria-label={`Quantity ${item.quantity}`}
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${product.name}`}
                              className="flex h-9 w-9 items-center justify-center text-ink"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus size={13} strokeWidth={1.5} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-[0.75rem] text-muted underline underline-offset-4 transition-colors hover:text-burgundy"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-border px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <p className="editorial-label text-ink">Subtotal</p>
                    <p className="font-display text-xl tabular-nums text-ink">
                      {formatPrice(subtotal, currency)}
                    </p>
                  </div>
                  <p className="mt-1.5 text-[0.75rem] text-muted">
                    Shipping is confirmed at checkout.
                  </p>
                  <Button href={ROUTES.checkout} fullWidth className="mt-5">
                    Checkout
                  </Button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="editorial-label mt-4 w-full text-center text-muted transition-colors hover:text-ink"
                  >
                    Continue Shopping
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
