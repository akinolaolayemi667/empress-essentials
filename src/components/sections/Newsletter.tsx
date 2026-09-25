import { ArrowRight } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui'
import {
  editorialEase,
  motionDuration,
  usePrefersReducedMotion,
} from '@/hooks/usePrefersReducedMotion'
import { subscribeToNewsletter } from '@/lib/newsletter'
import { cn } from '@/lib/cn'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function Newsletter() {
  const reduced = usePrefersReducedMotion()
  const inputId = useId()
  const messageId = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    const result = await subscribeToNewsletter(email, 'homepage')
    if (result.ok) {
      setStatus('success')
      setEmail('')
      return
    }
    setError(result.error)
    setStatus('error')
  }

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="border-t border-border bg-soft"
    >
      <Container size="wide" className="py-[var(--spacing-section)]">
        <motion.div
          className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-12 lg:items-end lg:gap-12"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: motionDuration.slow, ease: editorialEase }}
        >
          <div className="lg:col-span-6">
            <p className="editorial-label mb-4 text-burgundy">The Empress List</p>
            <h2
              id="newsletter-heading"
              className="font-display text-h2 text-balance"
            >
              First to Know.
              <span className="block italic text-burgundy">First to Wear.</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-body-lg text-muted">
              New arrivals, thrift drops and the season&apos;s edit, delivered
              quietly to your inbox.
            </p>
          </div>

          <div className="lg:col-span-6">
            {status === 'success' ? (
              <div role="status" className="border-b border-ink pb-4">
                <p className="font-display text-2xl text-ink">
                  You&apos;re on the list.
                </p>
                <p className="mt-2 text-small text-muted">
                  Welcome to Empress Essentials. We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <label htmlFor={inputId} className="editorial-label text-ink">
                  Email address
                </label>
                <div
                  className={cn(
                    'mt-3 flex items-center border-b transition-colors duration-300 focus-within:border-burgundy',
                    status === 'error' ? 'border-burgundy' : 'border-ink',
                  )}
                >
                  <input
                    id={inputId}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      if (status === 'error') setStatus('idle')
                    }}
                    aria-invalid={status === 'error'}
                    aria-describedby={messageId}
                    className="min-h-12 w-full bg-transparent text-body-lg text-ink outline-none placeholder:text-muted/70"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="editorial-label flex min-h-12 shrink-0 items-center gap-2 pl-4 text-ink transition-colors hover:text-burgundy disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Joining' : 'Subscribe'}
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </button>
                </div>
                <p
                  id={messageId}
                  className={cn(
                    'mt-3 text-small',
                    status === 'error' ? 'text-burgundy' : 'text-muted',
                  )}
                  role={status === 'error' ? 'alert' : undefined}
                >
                  {status === 'error'
                    ? error
                    : 'No noise. Unsubscribe anytime.'}
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
