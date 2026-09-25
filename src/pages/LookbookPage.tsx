import { motion } from 'framer-motion'
import { ImageReveal } from '@/components/animations'
import { PageHeader } from '@/components/layout'
import { ProductRow } from '@/components/product'
import { Button, Container, FashionImage } from '@/components/ui'
import { getProductBySlug, lookbookContent, lookbookLooks, type LookbookLook } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'
import { ROUTES } from '@/lib/constants'
import type { Product } from '@/types/commerce'

function LookChapter({ look, index }: { look: LookbookLook; index: number }) {
  const reduced = usePrefersReducedMotion()
  const reverse = index % 2 === 1
  const titleId = `${look.id}-title`
  const pieces = look.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product))

  return (
    <section aria-labelledby={titleId} className="border-t border-border">
      <Container size="wide" className="py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          <motion.div
            className={cn('lg:col-span-7', reverse && 'lg:order-2')}
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.95, ease: editorialEase }}
          >
            <ImageReveal>
              <FashionImage
                src={look.primaryImage}
                alt={look.primaryAlt}
                aspect="editorial"
                priority={index === 0}
                className="w-full"
              />
            </ImageReveal>
          </motion.div>

          <motion.div
            className={cn('flex flex-col lg:col-span-5', reverse && 'lg:order-1')}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: motionDuration.slow, delay: 0.1, ease: editorialEase }}
          >
            <p className="editorial-label text-burgundy">{look.lookNumber}</p>
            <h2 id={titleId} className="mt-3 font-display text-h2 text-balance">
              {look.title}
            </h2>
            <p className="mt-3 font-display text-xl italic text-burgundy md:text-2xl">
              {look.caption}
            </p>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted">
              {look.story}
            </p>

            <div className="mt-10 max-w-[16rem]">
              <FashionImage
                src={look.detailImage}
                alt={look.detailAlt}
                aspect="square"
                className="w-full"
              />
              <p className="editorial-label mt-3 text-muted">Detail</p>
            </div>

            {pieces.length > 0 ? (
              <div className="mt-10">
                <h3 className="editorial-label border-b border-border pb-3 text-ink">
                  Shop the Look
                </h3>
                <ul className="divide-y divide-border">
                  {pieces.map((product) => (
                    <li key={product.id}>
                      <ProductRow product={product} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export function LookbookPage() {
  useDocumentTitle('Lookbook', lookbookContent.description)

  return (
    <>
      <PageHeader
        label="Lookbook"
        title={lookbookContent.headline}
        description={lookbookContent.description}
        breadcrumbs={[{ label: 'Home', href: ROUTES.home }, { label: 'Lookbook' }]}
      />

      {lookbookLooks.map((look, index) => (
        <LookChapter key={look.id} look={look} index={index} />
      ))}

      <section aria-labelledby="lookbook-cta-heading" className="border-t border-border bg-soft">
        <Container size="wide" className="py-[var(--spacing-section)]">
          <p className="editorial-label mb-4 text-burgundy">Continue the Edit</p>
          <h2 id="lookbook-cta-heading" className="max-w-2xl font-display text-h2 text-balance">
            Find the pieces that make it yours.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Button href={ROUTES.newArrivals}>Shop New Arrivals</Button>
            <Button href={ROUTES.thrift} variant="secondary">
              Explore Thrift
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
