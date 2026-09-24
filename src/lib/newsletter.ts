import type { NewsletterSubscriber } from '@/types/commerce'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim())
}

/** Placeholder newsletter capture — swap for API in a later phase */
export function createNewsletterSubscriber(
  email: string,
  source = 'site',
): NewsletterSubscriber | null {
  const normalized = email.trim().toLowerCase()
  if (!isValidEmail(normalized)) return null

  return {
    email: normalized,
    subscribedAt: new Date().toISOString(),
    source,
  }
}
