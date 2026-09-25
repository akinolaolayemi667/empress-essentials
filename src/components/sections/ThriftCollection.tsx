import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Container, FashionImage } from '@/components/ui'
import { ImageReveal } from '@/components/animations'
import { ProductCard, QuickViewModal } from '@/components/product'
import { Stagger, StaggerItem } from '@/components/animations'
import { getThriftProducts } from '@/data'
import { useWishlist } from '@/hooks/useWishlist'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { ROUTES } from '@/lib/constants'
import type { Product } from '@/types/commerce'

export function ThriftCollection() {
  const products = getThriftProducts()
  const { has, toggle } = useWishlist()
  const reduced = usePrefersReducedMotion()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  return (
    <section
      id="thrift-collection"
      aria-labelledby="thrift-heading"
      className="bg-soft"
    >
      <Container size="wide" className="py-[var(--spacing-section)]">
        <div className="mb-12 grid gap-8 md:mb-14 lg:mb-16 lg:grid-cols-12 lg:items-end">
          <motion.div
            className="lg:col-span-7"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: motionDuration.slow, ease: editorialEase }}
          >
            <p className="editorial-label mb-4 text-burgundy">The Thrift Edit</p>
            <h2
              id="thrift-heading"
              className="font-display text-h2 max-w-2xl text-balance"
            >
              Thrift, Curated Differently
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-body-lg text-muted">
              One-of-a-kind finds, carefully selected for their character,
              quality and unmistakable style.
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-5 lg:justify-self-end"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Button
              href={ROUTES.thrift}
              rightIcon={<ArrowRight size={14} strokeWidth={1.5} />}
            >
              Shop The Thrift Edit
            </Button>
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-7">
          <motion.div
            className="relative lg:col-span-5"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.95, ease: editorialEase }}
          >
            <ImageReveal>
              <FashionImage
                src="/images/thrift-feature.jpg"
                alt="Woman in a vintage stone trench seated on steps before a green door"
                aspect="editorial"
                className="min-h-[22rem] w-full lg:min-h-[40rem]"
              />
            </ImageReveal>
            <div className="absolute bottom-5 left-5 max-w-[14rem] bg-canvas/90 px-4 py-3 backdrop-blur-sm">
              <p className="editorial-label text-burgundy">Curated</p>
              <p className="mt-1 font-display text-xl leading-snug text-ink">
                Every piece is singular.
              </p>
            </div>
          </motion.div>

          <Stagger
            className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-8 lg:col-span-7 lg:gap-x-6 lg:gap-y-10"
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
        </div>

        <motion.div
          className="mt-16 border-t border-border pt-12 text-center md:mt-20 md:pt-14"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: motionDuration.slow, ease: editorialEase }}
        >
          <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.02em] text-ink">
            Every piece has a story.
          </p>
          <p className="mx-auto mt-3 max-w-md text-pretty text-body text-muted">
            Find something that feels like it was waiting for you.
          </p>
          <Button
            href={ROUTES.thrift}
            variant="secondary"
            className="mt-8"
            rightIcon={<ArrowRight size={14} strokeWidth={1.5} />}
          >
            Explore All Thrift
          </Button>
        </motion.div>
      </Container>

      <QuickViewModal
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  )
}
