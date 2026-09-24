import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button, Container, FashionImage } from '@/components/ui'
import { ImageReveal } from '@/components/animations'
import { lookbookContent, lookbookLooks } from '@/data/lookbook'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

function LookFrame({
  look,
  reverse = false,
  className,
}: {
  look: (typeof lookbookLooks)[number]
  reverse?: boolean
  className?: string
}) {
  const reduced = usePrefersReducedMotion()

  return (
    <article
      className={cn(
        'grid items-end gap-5 md:gap-6 lg:grid-cols-12 lg:gap-8',
        className,
      )}
    >
      <motion.div
        className={cn(
          'group relative',
          reverse ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-7',
        )}
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.95, ease: editorialEase }}
      >
        <ImageReveal>
          <FashionImage
            src={look.primaryImage}
            alt={look.primaryAlt}
            aspect="editorial"
            className={cn(
              'w-full',
              reverse
                ? 'lg:aspect-[4/5]'
                : 'min-h-[22rem] sm:min-h-[28rem] lg:min-h-[36rem]',
            )}
          />
        </ImageReveal>
        <div className="mt-4 flex items-start justify-between gap-4 opacity-90 transition-opacity duration-500 group-hover:opacity-100">
          <div>
            <p className="editorial-label text-burgundy">{look.lookNumber}</p>
            <h3 className="mt-1 font-display text-2xl font-medium tracking-[-0.02em] md:text-[1.75rem]">
              {look.title}
            </h3>
          </div>
          <p className="max-w-[12rem] text-right text-small leading-relaxed text-muted md:max-w-[14rem]">
            {look.caption}
          </p>
        </div>
      </motion.div>

      <motion.div
        className={cn(
          'group relative md:max-w-sm lg:max-w-none',
          reverse
            ? 'lg:col-span-5 lg:col-start-2 lg:order-1 lg:justify-self-end'
            : 'lg:col-span-4 lg:col-start-9 lg:mb-16',
        )}
        initial={reduced ? false : { opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.12, ease: editorialEase }}
      >
        <ImageReveal delay={0.1}>
          <FashionImage
            src={look.detailImage}
            alt={look.detailAlt}
            aspect="square"
            className="w-full shadow-soft"
          />
        </ImageReveal>
        <p className="editorial-label mt-3 text-muted opacity-70 transition-opacity duration-500 group-hover:opacity-100">
          Detail
        </p>
      </motion.div>
    </article>
  )
}

export function Lookbook() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="lookbook"
      aria-labelledby="lookbook-heading"
      className="overflow-x-hidden bg-canvas"
    >
      <Container size="wide" className="pt-[var(--spacing-section)]">
        <div className="mb-12 grid gap-8 md:mb-16 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <motion.div
            className="lg:col-span-7"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: motionDuration.slow, ease: editorialEase }}
          >
            <p className="editorial-label mb-4 text-burgundy">Lookbook</p>
            <h2
              id="lookbook-heading"
              className="font-display text-h2 max-w-xl text-balance"
            >
              {lookbookContent.headline}
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 lg:col-span-5 lg:items-start lg:justify-self-end"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: motionDuration.slow,
              delay: 0.1,
              ease: editorialEase,
            }}
          >
            <p className="max-w-md text-pretty text-body-lg text-muted">
              {lookbookContent.description}
            </p>
            <Button
              href={lookbookContent.cta.href}
              variant="secondary"
              rightIcon={<ArrowRight size={14} strokeWidth={1.5} />}
            >
              {lookbookContent.cta.label}
            </Button>
          </motion.div>
        </div>

        <div className="flex flex-col gap-16 md:gap-20 lg:gap-28">
          {lookbookLooks.map((look, index) => (
            <LookFrame
              key={look.id}
              look={look}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </Container>

      <div className="mt-16 border-y border-border bg-soft py-4 md:mt-20 lg:mt-24">
        <div className="overflow-hidden">
          <motion.p
            className="editorial-label whitespace-nowrap text-muted"
            animate={
              reduced
                ? undefined
                : { x: ['0%', '-50%'] }
            }
            transition={
              reduced
                ? undefined
                : {
                    duration: 28,
                    ease: 'linear',
                    repeat: Infinity,
                  }
            }
          >
            {lookbookContent.marquee}
            {lookbookContent.marquee}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
