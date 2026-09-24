import { Minus, Plus, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, FashionImage } from '@/components/ui'
import { ProductPrice } from '@/components/product/ProductPrice'
import { useCart } from '@/hooks/useCart'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/cn'
import type { Product } from '@/types/commerce'

type QuickViewModalProps = {
  product: Product | null
  open: boolean
  onClose: () => void
  onAddedToBag?: () => void
}

export function QuickViewModal({
  product,
  open,
  onClose,
  onAddedToBag,
}: QuickViewModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const { addItem } = useCart()
  const reduced = usePrefersReducedMotion()
  const [size, setSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState(false)

  useBodyScrollLock(open)
  useEscapeKey(onClose, open)

  useEffect(() => {
    if (!product) return
    setSize(product.sizes?.[0] ?? '')
    setQuantity(1)
    setSizeError(false)
  }, [product])

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  const handleAdd = () => {
    if (!product) return
    if (product.sizes?.length && !size) {
      setSizeError(true)
      return
    }
    addItem({
      productId: product.id,
      quantity,
      size: size || undefined,
    })
    onAddedToBag?.()
    onClose()
  }

  return (
    <AnimatePresence>
      {open && product ? (
        <>
          <motion.button
            type="button"
            aria-label="Close quick view"
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-[2px]"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-x-4 top-[6vh] z-[85] mx-auto flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden border border-border bg-canvas shadow-soft md:inset-x-auto md:top-[8vh]"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3 md:px-6">
              <p className="editorial-label text-muted">Quick View</p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close quick view"
                className="flex h-11 w-11 items-center justify-center text-ink transition-opacity hover:opacity-60"
              >
                <X size={18} strokeWidth={1.4} />
              </button>
            </div>

            <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-2">
              <div className="bg-soft">
                <FashionImage
                  src={product.image}
                  alt={product.name}
                  aspect="portrait"
                  priority
                  zoom={false}
                  className="h-full min-h-[18rem] w-full md:min-h-full"
                />
              </div>

              <div className="flex flex-col px-5 py-6 md:px-8 md:py-8">
                <p className="editorial-label text-muted">
                  {product.styleCategory}
                </p>
                <h2
                  id={titleId}
                  className="mt-2 font-display text-[1.75rem] font-medium leading-tight tracking-[-0.02em] md:text-3xl"
                >
                  {product.name}
                </h2>
                <ProductPrice
                  className="mt-3"
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  currency={product.currency}
                />

                {product.description ? (
                  <p className="mt-5 text-pretty text-small leading-relaxed text-muted md:text-body">
                    {product.description}
                  </p>
                ) : null}

                {product.condition ? (
                  <p className="mt-4 text-small text-ink-secondary">
                    <span className="editorial-label mr-2 text-muted">
                      Condition
                    </span>
                    {product.condition}
                  </p>
                ) : null}

                {product.sizes && product.sizes.length > 0 ? (
                  <fieldset className="mt-7">
                    <legend className="editorial-label mb-3 text-ink">
                      Size
                    </legend>
                    <div className="flex flex-wrap gap-2" role="radiogroup">
                      {product.sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          role="radio"
                          aria-checked={size === option}
                          className={cn(
                            'min-h-11 min-w-11 border px-3 text-small transition-colors duration-300',
                            size === option
                              ? 'border-ink bg-ink text-canvas'
                              : 'border-border bg-canvas text-ink hover:border-ink',
                          )}
                          onClick={() => {
                            setSize(option)
                            setSizeError(false)
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {sizeError ? (
                      <p className="mt-2 text-small text-burgundy" role="alert">
                        Please select a size
                      </p>
                    ) : null}
                  </fieldset>
                ) : null}

                <div className="mt-6">
                  <p className="editorial-label mb-3 text-ink">Quantity</p>
                  <div className="inline-flex items-center border border-border">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="flex h-11 w-11 items-center justify-center text-ink disabled:opacity-30"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus size={14} strokeWidth={1.5} />
                    </button>
                    <span className="min-w-10 text-center text-small tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="flex h-11 w-11 items-center justify-center text-ink"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      <Plus size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button
                    type="button"
                    onClick={handleAdd}
                    disabled={!product.inStock}
                    className="sm:flex-1"
                  >
                    {product.inStock ? 'Add to Bag' : 'Sold Out'}
                  </Button>
                  <Button
                    href={`${ROUTES.product}/${product.slug}`}
                    variant="secondary"
                  >
                    View Product
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
