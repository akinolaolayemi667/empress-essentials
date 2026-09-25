import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/layout'
import { Container, FashionImage } from '@/components/ui'
import { collections } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'
import { ROUTES } from '@/lib/constants'

export function CollectionsPage() {
  useDocumentTitle('Collections', 'Explore curated collections from Empress Essentials.')
  const reduced = usePrefersReducedMotion()

  return (
    <>
      <PageHeader
        label="Collections"
        title="Curated For Every Version of You"
        description="Explore pieces selected for effortless everyday style, statement moments and everything in between."
        breadcrumbs={[{ label: 'Home', href: ROUTES.home }, { label: 'Collections' }]}
      />

      <section aria-label="All collections" className="bg-canvas">
        <Container size="wide" className="pb-[var(--spacing-section)]">
          <ol className="border-t border-border">
            {collections.map((collection, index) => {
              const href = `${ROUTES.collections}/${collection.slug}`
              const count = collection.productIds.length
              const flipped = index % 2 === 1

              return (
                <motion.li
                  key={collection.id}
                  className="border-b border-border py-10 md:py-16"
                  initial={reduced ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: motionDuration.slow, ease: editorialEase }}
                >
                  <a
                    href={href}
                    className="group grid items-center gap-8 md:grid-cols-12 md:gap-12"
                  >
                    <div
                      className={cn(
                        'overflow-hidden md:col-span-6 lg:col-span-5',
                        flipped && 'md:order-2 md:col-start-7 lg:col-start-8',
                      )}
                    >
                      {collection.image ? (
                        <FashionImage
                          src={collection.image}
                          alt={collection.name}
                          aspect="editorial"
                        />
                      ) : null}
                    </div>

                    <div
                      className={cn(
                        'md:col-span-6 lg:col-span-6',
                        flipped ? 'md:order-1 md:col-start-1' : 'lg:col-start-7',
                      )}
                    >
                      <p className="editorial-label text-muted">
                        Collection {String(index + 1).padStart(2, '0')}
                      </p>
                      <h2 className="mt-4 font-display text-h2 text-balance transition-colors duration-300 group-hover:text-burgundy">
                        {collection.name}
                      </h2>
                      <p className="mt-4 max-w-md text-pretty text-body-lg text-muted">
                        {collection.description}
                      </p>
                      <p className="mt-6 text-small text-ink-secondary">
                        {count} {count === 1 ? 'piece' : 'pieces'}
                      </p>
                      <span className="editorial-label mt-8 inline-flex items-center gap-2 border-b border-ink pb-1.5 text-ink transition-colors duration-300 group-hover:border-burgundy group-hover:text-burgundy">
                        Explore Collection
                        <ArrowRight
                          size={14}
                          strokeWidth={1.5}
                          className="transition-transform duration-500 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </a>
                </motion.li>
              )
            })}
          </ol>
        </Container>
      </section>
    </>
  )
}
