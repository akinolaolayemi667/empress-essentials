import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container, FashionImage } from '@/components/ui'
import { shopCategories, type ShopCategoryItem } from '@/data/shopCategories'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

function CategoryTile({
  category,
  className,
  featured = false,
}: {
  category: ShopCategoryItem
  className?: string
  featured?: boolean
}) {
  return (
    <a
      href={category.href}
      className={cn('group relative block overflow-hidden bg-soft', className)}
    >
      <div
        className={cn(
          'relative',
          featured
            ? 'aspect-[16/10] md:aspect-[2.15/1]'
            : 'aspect-[4/5] sm:aspect-[3/4]',
        )}
      >
        <FashionImage
          src={category.image}
          alt={category.imageAlt}
          aspect="auto"
          zoom={false}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/15 to-transparent opacity-75 transition-opacity duration-700 group-hover:opacity-90" />

        <div
          className={cn(
            'absolute inset-x-0 bottom-0 z-10 p-5 md:p-7',
            featured && 'md:max-w-lg md:p-9',
          )}
        >
          <p className="editorial-label mb-2 text-canvas/75">
            {category.index}
          </p>
          <h3
            className={cn(
              'font-display font-medium tracking-[-0.02em] text-canvas transition-transform duration-500 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0',
              featured
                ? 'text-[clamp(1.85rem,3.2vw,2.75rem)]'
                : 'text-[clamp(1.45rem,2.5vw,2rem)]',
            )}
          >
            {category.name}
          </h3>
          {featured || category.description ? (
            <p
              className={cn(
                'mt-2 max-w-md text-pretty text-canvas/85',
                featured ? 'text-small md:text-body' : 'hidden text-small sm:block',
              )}
            >
              {category.description}
            </p>
          ) : null}
          <span className="mt-4 inline-flex items-center gap-2 text-caption font-medium uppercase tracking-[0.2em] text-canvas transition-transform duration-500 group-hover:translate-x-1.5 motion-reduce:group-hover:translate-x-0">
            Explore
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </a>
  )
}

export function ShopByCategory() {
  const reduced = usePrefersReducedMotion()
  const [featured, ...rest] = shopCategories
  const mid = Math.ceil(rest.length / 2)
  const rowOne = rest.slice(0, mid)
  const rowTwo = rest.slice(mid)

  return (
    <section
      id="shop-by-category"
      aria-labelledby="shop-by-category-heading"
      className="bg-soft"
    >
      <Container size="wide" className="py-[var(--spacing-section)]">
        <div className="mb-12 grid gap-6 md:mb-16 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <motion.div
            className="lg:col-span-7"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: motionDuration.slow, ease: editorialEase }}
          >
            <p className="editorial-label mb-4 text-burgundy">Categories</p>
            <h2
              id="shop-by-category-heading"
              className="font-display text-h2 text-balance"
            >
              Shop Your Style
            </h2>
          </motion.div>
          <motion.p
            className="max-w-md text-pretty text-body-lg text-muted lg:col-span-5 lg:justify-self-end"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: motionDuration.slow,
              delay: 0.1,
              ease: editorialEase,
            }}
          >
            Find the pieces that fit your mood, your wardrobe and your moment.
          </motion.p>
        </div>

        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
          {featured ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: editorialEase }}
            >
              <CategoryTile category={featured} featured />
            </motion.div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:gap-6">
            {rowOne.map((category, index) => (
              <motion.div
                key={category.id}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.85,
                  delay: 0.08 + index * 0.1,
                  ease: editorialEase,
                }}
              >
                <CategoryTile category={category} />
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:gap-6">
            {rowTwo.map((category, index) => (
              <motion.div
                key={category.id}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.85,
                  delay: 0.08 + index * 0.1,
                  ease: editorialEase,
                }}
              >
                <CategoryTile category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
