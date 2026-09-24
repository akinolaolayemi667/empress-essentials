import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui'
import { ProductCard, QuickViewModal } from '@/components/product'
import { getNewArrivals } from '@/data'
import { useWishlist } from '@/hooks/useWishlist'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { ROUTES } from '@/lib/constants'
import type { Product } from '@/types/commerce'
import { Stagger, StaggerItem } from '@/components/animations'

export function NewArrivals() {
  const products = getNewArrivals()
  const { has, toggle } = useWishlist()
  const reduced = usePrefersReducedMotion()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  return (
    <section
      id="new-arrivals"
      aria-labelledby="new-arrivals-heading"
      className="bg-canvas"
    >
      <Container size="wide" className="py-[var(--spacing-section)]">
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <motion.div
            className="max-w-xl"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: motionDuration.slow, ease: editorialEase }}
          >
            <p className="editorial-label mb-3 text-burgundy">Just In</p>
            <h2
              id="new-arrivals-heading"
              className="font-display text-h2 text-balance"
            >
              New Arrivals
            </h2>
            <p className="mt-4 max-w-md text-pretty text-body-lg text-muted">
              The latest pieces we&apos;ve selected for your wardrobe.
            </p>
          </motion.div>

          <motion.a
            href={ROUTES.newArrivals}
            className="editorial-label inline-flex items-center gap-2 self-start text-ink transition-colors hover:text-burgundy md:self-auto"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            View All
            <ArrowRight size={14} strokeWidth={1.5} />
          </motion.a>
        </div>

        <Stagger
          className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:gap-x-6 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-12"
          stagger={0.08}
        >
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard
                product={product}
                wishlisted={has(product.id)}
                onToggleWishlist={(item) => toggle(item.id)}
                onQuickView={setQuickViewProduct}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <QuickViewModal
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  )
}
