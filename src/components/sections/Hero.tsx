import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button, Container, FashionImage } from '@/components/ui'
import { heroContent } from '@/data/homepage'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const lineEase = editorialEase

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-x-hidden bg-canvas"
    >
      <Container
        size="wide"
        className="relative pb-16 pt-10 md:pb-20 md:pt-14 lg:pb-24 lg:pt-16"
      >
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className="order-2 flex flex-col lg:order-1 lg:col-span-5 lg:pb-8">
            <motion.div
              className="mb-6 flex items-center gap-4 md:mb-8"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: motionDuration.base, delay: 0.15 }}
            >
              <span className="editorial-label text-burgundy">
                {heroContent.season}
              </span>
              <span
                aria-hidden
                className="hidden h-px w-12 bg-border sm:block md:w-16"
              />
            </motion.div>

            <h1 id="hero-heading" className="sr-only">
              {heroContent.lines.join(' ')}
            </h1>

            <div
              aria-hidden
              className="font-display text-[clamp(2.75rem,7.5vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink"
            >
              {heroContent.lines.map((line, index) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={reduced ? false : { y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.95,
                      delay: 0.35 + index * 0.18,
                      ease: lineEase,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </div>

            <motion.p
              className="mt-6 max-w-md text-pretty text-body-lg leading-relaxed text-muted md:mt-8"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionDuration.slow,
                delay: 0.85,
                ease: lineEase,
              }}
            >
              {heroContent.description}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-6 md:mt-11 md:gap-8"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionDuration.base,
                delay: 1.05,
                ease: lineEase,
              }}
            >
              <Button
                href={heroContent.primaryCta.href}
                rightIcon={<ArrowRight size={14} strokeWidth={1.5} />}
              >
                {heroContent.primaryCta.label}
              </Button>
              <Button
                href={heroContent.secondaryCta.href}
                variant="secondary"
              >
                {heroContent.secondaryCta.label}
              </Button>
            </motion.div>

            <motion.div
              className="mt-12 hidden max-w-[14rem] lg:mt-16 lg:block xl:max-w-[16rem]"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 1.2,
                ease: lineEase,
              }}
            >
              <FashionImage
                src={heroContent.secondaryImage.src}
                alt={heroContent.secondaryImage.alt}
                aspect="square"
                className="shadow-soft"
              />
              <p className="editorial-label mt-3 text-muted">Look 02</p>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <motion.div
              className="group relative ml-auto w-full lg:max-w-[92%] xl:max-w-[88%]"
              initial={
                reduced
                  ? false
                  : { opacity: 0, clipPath: 'inset(6% 6% 6% 6%)' }
              }
              animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.25, delay: 0.1, ease: lineEase }}
            >
              <FashionImage
                src={heroContent.primaryImage.src}
                alt={heroContent.primaryImage.alt}
                aspect="editorial"
                priority
                className="min-h-[58vw] sm:min-h-[28rem] lg:min-h-[min(72vh,42rem)]"
              />

              <motion.div
                className="pointer-events-none absolute bottom-5 left-5 hidden md:block"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.35, duration: 0.7 }}
              >
                <span className="editorial-label bg-canvas/90 px-3 py-2 text-ink backdrop-blur-sm">
                  {heroContent.label}
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-6 w-[42%] max-w-[11rem] sm:w-[38%] lg:hidden"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.8, ease: lineEase }}
            >
              <FashionImage
                src={heroContent.secondaryImage.src}
                alt={heroContent.secondaryImage.alt}
                aspect="square"
              />
            </motion.div>
          </div>
        </div>

        <motion.a
          href="#featured-collections"
          className={cn(
            'mt-14 flex flex-col items-center gap-2 md:mt-16 lg:absolute lg:bottom-8 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2',
          )}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45, duration: 0.8 }}
          aria-label="Scroll to explore featured collections"
        >
          <span className="editorial-label text-[0.6rem] tracking-[0.28em] text-muted">
            Scroll to explore
          </span>
          <motion.span
            aria-hidden
            className="text-muted"
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            ↓
          </motion.span>
        </motion.a>
      </Container>
    </section>
  )
}
