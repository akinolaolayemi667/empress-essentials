import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button, Container, FashionImage } from '@/components/ui'
import { ImageReveal, Stagger, StaggerItem } from '@/components/animations'
import { brandStory } from '@/data/brandStory'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'

export function BrandStory() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="brand-story"
      aria-labelledby="brand-story-heading"
      className="bg-canvas"
    >
      <Container size="wide" className="py-[var(--spacing-section)]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <motion.div
            className="order-1 lg:col-span-6"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.95, ease: editorialEase }}
          >
            <ImageReveal>
              <FashionImage
                src={brandStory.image.src}
                alt={brandStory.image.alt}
                aspect="editorial"
                className="min-h-[22rem] w-full sm:min-h-[28rem] lg:min-h-[38rem]"
              />
            </ImageReveal>
          </motion.div>

          <div className="order-2 lg:col-span-6 lg:pl-4 xl:pl-8">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: motionDuration.slow, ease: editorialEase }}
            >
              <p className="editorial-label mb-5 text-burgundy">
                {brandStory.eyebrow}
              </p>
              <h2
                id="brand-story-heading"
                className="font-display text-h2 max-w-lg text-balance leading-[1.08]"
              >
                {brandStory.headline}
              </h2>
              <p className="mt-4 font-display text-[clamp(1.35rem,2.5vw,1.85rem)] font-medium italic tracking-[-0.01em] text-burgundy">
                {brandStory.subheadline}
              </p>

              <div className="mt-8 max-w-md space-y-5">
                {brandStory.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-pretty text-body leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <Button
                href={brandStory.cta.href}
                variant="secondary"
                className="mt-9"
                rightIcon={<ArrowRight size={14} strokeWidth={1.5} />}
              >
                {brandStory.cta.label}
              </Button>
            </motion.div>

            <Stagger
              className="mt-12 grid gap-0 border-t border-border sm:mt-14"
              stagger={0.12}
            >
              {brandStory.principles.map((principle) => (
                <StaggerItem
                  key={principle.number}
                  className="border-b border-border py-5 sm:py-6"
                >
                  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 sm:gap-x-6">
                    <span className="editorial-label pt-1 text-burgundy">
                      {principle.number}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-medium tracking-[-0.015em] text-ink md:text-2xl">
                        {principle.title}
                      </h3>
                      <p className="mt-1.5 max-w-sm text-small leading-relaxed text-muted md:text-body">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  )
}
