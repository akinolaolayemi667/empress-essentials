import { motion } from 'framer-motion'
import { ImageReveal, Stagger, StaggerItem } from '@/components/animations'
import { Breadcrumbs } from '@/components/layout'
import { Newsletter } from '@/components/sections'
import { Button, Container, FashionImage } from '@/components/ui'
import { aboutPage, brandStory } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'
import { ROUTES } from '@/lib/constants'

export function AboutPage() {
  useDocumentTitle('Our Story', aboutPage.intro)
  const reduced = usePrefersReducedMotion()

  return (
    <>
      <header className="bg-canvas">
        <Container size="wide" className="pt-8 md:pt-10">
          <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'Our Story' }]} />

          <motion.div
            className="mt-10 grid gap-8 md:mt-16 lg:grid-cols-12 lg:items-end"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.slow, ease: editorialEase }}
          >
            <div className="lg:col-span-7">
              <p className="editorial-label mb-4 text-burgundy">{aboutPage.label}</p>
              <h1 className="font-display text-editorial-display text-balance">
                {aboutPage.title}
              </h1>
            </div>
            <p className="max-w-md text-pretty text-body-lg text-muted lg:col-span-5 lg:justify-self-end">
              {aboutPage.intro}
            </p>
          </motion.div>

          <div className="mt-12 md:mt-16">
            <ImageReveal>
              <FashionImage
                src={aboutPage.heroImage.src}
                alt={aboutPage.heroImage.alt}
                aspect="wide"
                priority
                zoom={false}
                className="w-full"
              />
            </ImageReveal>
          </div>
        </Container>
      </header>

      <section aria-label="Our philosophy" className="bg-canvas">
        <Container size="md" className="py-[var(--spacing-section)]">
          <motion.blockquote
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: motionDuration.slow, ease: editorialEase }}
          >
            <p className="font-display text-display-lg italic leading-tight text-balance text-burgundy">
              &ldquo;{aboutPage.quote}&rdquo;
            </p>
          </motion.blockquote>
        </Container>
      </section>

      <section aria-label="How we curate" className="bg-canvas">
        <Container size="wide">
          <ol className="border-t border-border">
            {aboutPage.chapters.map((chapter, index) => {
              const flipped = index % 2 === 1
              return (
                <motion.li
                  key={chapter.title}
                  className="grid items-center gap-8 border-b border-border py-12 md:grid-cols-12 md:gap-12 md:py-20"
                  initial={reduced ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: motionDuration.slow, ease: editorialEase }}
                >
                  <div
                    className={cn(
                      'md:col-span-6 lg:col-span-5',
                      flipped && 'md:order-2 md:col-start-7 lg:col-start-8',
                    )}
                  >
                    <FashionImage src={chapter.image} alt={chapter.imageAlt} aspect="editorial" />
                  </div>
                  <div
                    className={cn(
                      'md:col-span-6',
                      flipped ? 'md:order-1 md:col-start-1' : 'lg:col-start-7',
                    )}
                  >
                    <p className="editorial-label text-muted">
                      {String(index + 1).padStart(2, '0')} — {chapter.label}
                    </p>
                    <h2 className="mt-4 font-display text-h2 text-balance">{chapter.title}</h2>
                    <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
                      {chapter.body}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="principles-heading" className="bg-canvas">
        <Container size="wide" className="py-[var(--spacing-section)]">
          <p className="editorial-label mb-4 text-burgundy">What We Stand For</p>
          <h2 id="principles-heading" className="max-w-xl font-display text-h2 text-balance">
            Three principles behind every piece.
          </h2>
          <Stagger className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-3 md:gap-12" stagger={0.12}>
            {brandStory.principles.map((principle) => (
              <StaggerItem key={principle.number}>
                <p className="editorial-label text-burgundy">{principle.number}</p>
                <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.015em] text-ink md:text-3xl">
                  {principle.title}
                </h3>
                <p className="mt-3 max-w-xs text-pretty leading-relaxed text-muted">
                  {principle.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-16 flex flex-wrap items-center gap-8 md:mt-20">
            <Button href={ROUTES.newArrivals}>Shop New Arrivals</Button>
            <Button href={ROUTES.thrift} variant="secondary">
              Explore Thrift
            </Button>
          </div>
        </Container>
      </section>

      <Newsletter />
    </>
  )
}
