import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container, FashionImage } from '@/components/ui'
import {
  featuredCollections,
  type FeaturedCollectionItem,
} from '@/data/homepage'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

function CollectionCard({
  collection,
  className,
  featured = false,
}: {
  collection: FeaturedCollectionItem
  className?: string
  featured?: boolean
}) {
  const reduced = usePrefersReducedMotion()

  return (
    <a
      href={collection.href}
      className={cn(
        'group relative block overflow-hidden bg-soft text-left',
        className,
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          featured ? 'aspect-[16/10] md:aspect-[21/11] lg:aspect-[2.2/1]' : 'aspect-[4/5]',
        )}
      >
        <FashionImage
          src={collection.image}
          alt={collection.imageAlt}
          aspect="auto"
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
          zoom={false}
        />

        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent transition-opacity duration-700',
            'opacity-80 group-hover:opacity-90',
          )}
        />

        <span className="editorial-label absolute left-4 top-4 z-10 bg-canvas/90 px-2.5 py-1.5 text-ink backdrop-blur-sm md:left-5 md:top-5">
          {collection.badge}
        </span>

        <div
          className={cn(
            'absolute inset-x-0 bottom-0 z-10 p-5 md:p-7',
            featured && 'md:p-9 lg:max-w-xl',
          )}
        >
          <p className="editorial-label mb-2 text-canvas/80">
            Collection {collection.index}
          </p>
          <h3
            className={cn(
              'font-display font-medium tracking-[-0.02em] text-canvas',
              featured
                ? 'text-[clamp(1.85rem,3.5vw,2.75rem)]'
                : 'text-[clamp(1.5rem,2.8vw,2rem)]',
            )}
          >
            {collection.title}
          </h3>
          <p
            className={cn(
              'mt-2 max-w-md text-pretty text-canvas/85',
              featured ? 'text-small md:text-body' : 'text-small',
            )}
          >
            {collection.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-caption font-medium uppercase tracking-[0.2em] text-canvas transition-transform duration-500 group-hover:translate-x-1.5 motion-reduce:group-hover:translate-x-0">
            {collection.cta}
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>

      {!reduced ? (
        <span className="sr-only">
          View {collection.title} collection
        </span>
      ) : null}
    </a>
  )
}

export function FeaturedCollections() {
  const reduced = usePrefersReducedMotion()
  const [featured, ...rest] = featuredCollections

  return (
    <section
      id="featured-collections"
      aria-labelledby="featured-collections-heading"
      className="bg-soft"
    >
      <Container size="wide" className="py-[var(--spacing-section)]">
        <div className="mb-12 grid gap-8 md:mb-16 lg:mb-20 lg:grid-cols-12 lg:items-end lg:gap-10">
          <motion.div
            className="lg:col-span-7"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: motionDuration.slow, ease: editorialEase }}
          >
            <p className="editorial-label mb-4 text-burgundy">Collections</p>
            <h2
              id="featured-collections-heading"
              className="font-display text-h2 max-w-xl text-balance leading-[1.1]"
            >
              <span className="block">Curated For</span>
              <span className="block">Every Version of You</span>
            </h2>
          </motion.div>

          <motion.p
            className="max-w-md text-pretty text-body-lg text-muted lg:col-span-5 lg:justify-self-end lg:pb-1"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: motionDuration.slow,
              delay: 0.12,
              ease: editorialEase,
            }}
          >
            Explore pieces selected for effortless everyday style, statement
            moments and everything in between.
          </motion.p>
        </div>

        <div className="flex flex-col gap-5 md:gap-6 lg:gap-7">
          {featured ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: editorialEase }}
            >
              <CollectionCard collection={featured} featured />
            </motion.div>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:gap-7">
            {rest.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={reduced ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + index * 0.12,
                  ease: editorialEase,
                }}
              >
                <CollectionCard collection={collection} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
