import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui'
import { useCart } from '@/hooks/useCart'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { getProductById } from '@/data'
import { formatPrice } from '@/lib/format'

type BagDrawerProps = {
  open: boolean
  onClose: () => void
}

export function BagDrawer({ open, onClose }: BagDrawerProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const { items, itemCount } = useCart()
  const reduced = usePrefersReducedMotion()

  useBodyScrollLock(open)
  useEscapeKey(onClose, open)

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close bag"
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

            <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-start justify-center">
                  <p className="font-display text-2xl text-ink">
                    Your bag is currently empty.
                  </p>
                  <p className="mt-3 max-w-xs text-small text-muted">
                    Discover new arrivals, thrift finds, and statement pieces
                    when you are ready.
                  </p>
                  <Button
                    type="button"
                    variant="primary"
                    className="mt-8"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((item) => {
                    const product = getProductById(item.productId)
                    if (!product) return null
                    return (
                      <li
                        key={item.id}
                        className="flex gap-4 border-b border-border pb-6"
                      >
                        <div className="h-24 w-20 shrink-0 overflow-hidden bg-soft">
                          <img
                            src={product.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-lg leading-snug">
                            {product.name}
                          </p>
                          {(item.size || item.color) && (
                            <p className="mt-1 text-small text-muted">
                              {[item.size, item.color].filter(Boolean).join(' / ')}
                            </p>
                          )}
                          <p className="mt-2 text-small tabular-nums">
                            {formatPrice(product.price, product.currency)} ×{' '}
                            {item.quantity}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
