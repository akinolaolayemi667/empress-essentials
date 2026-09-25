import { useParams } from 'react-router'
import { motion } from 'framer-motion'
import { Breadcrumbs } from '@/components/layout'
import { ProductGrid } from '@/components/product'
import { Button, Container, FashionImage } from '@/components/ui'
import { getCollectionBySlug, getProductsByCollection } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { ROUTES } from '@/lib/constants'
import type { Collection } from '@/types/commerce'
import { NotFoundPage } from './NotFoundPage'

export function CollectionPage() {
  const { slug } = useParams()
  const collection = slug ? getCollectionBySlug(slug) : undefined

  if (!collection) return <NotFoundPage />
  return <CollectionView key={collection.id} collection={collection} />
}

function CollectionView({ collection }: { collection: Collection }) {
  useDocumentTitle(collection.name, collection.description)
  const reduced = usePrefersReducedMotion()
  const items = getProductsByCollection(collection.slug)

  return (
    <>
      <header className="bg-canvas">
        <Container size="wide" className="pt-8 md:pt-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: ROUTES.home },
              { label: 'Collections', href: ROUTES.collections },
              { label: collection.name },
            ]}
          />

          <div className="mt-10 grid items-end gap-10 border-b border-border pb-12 md:mt-16 md:grid-cols-12 md:gap-12 md:pb-16">
            <motion.div
              className="md:col-span-6 lg:col-span-7"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionDuration.slow, ease: editorialEase }}
            >
              <p className="editorial-label mb-4 text-burgundy">Collection</p>
              <h1 className="font-display text-editorial-display text-balance">
                {collection.name}
              </h1>
              <p className="mt-6 max-w-md text-pretty text-body-lg text-muted">
                {collection.description}
              </p>
              <p className="mt-6 text-small text-ink-secondary">
                {items.length} {items.length === 1 ? 'piece' : 'pieces'}
              </p>
            </motion.div>

            {collection.image ? (
              <motion.div
                className="md:col-span-6 lg:col-span-5"
                initial={reduced ? false : { opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: editorialEase }}
              >
                <FashionImage
                  src={collection.image}
                  alt={collection.name}
                  aspect="editorial"
                  priority
                  zoom={false}
                />
              </motion.div>
            ) : null}
          </div>
        </Container>
      </header>

      <section aria-label={`${collection.name} products`} className="bg-canvas">
        <Container size="wide" className="py-12 md:py-16 lg:pb-[var(--spacing-section)]">
          {items.length > 0 ? (
            <ProductGrid products={items} />
          ) : (
            <div className="flex flex-col items-start py-12">
              <p className="font-display text-h3 text-ink">
                This collection is being curated.
              </p>
              <Button href={ROUTES.shop} className="mt-8">
                Shop All
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
