import type { NewsletterSubscriber } from '@/types/commerce'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STORAGE_KEY = 'empress:newsletter'

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim())
}

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

/**
 * Stores the signup locally until an email provider (Klaviyo, Mailchimp, etc.)
 * is connected. Replace the body with an API call when that integration lands.
 */
export async function subscribeToNewsletter(
  email: string,
  source = 'site',
): Promise<{ ok: true } | { ok: false; error: string }> {
  const subscriber = createNewsletterSubscriber(email, source)
  if (!subscriber) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const existing: NewsletterSubscriber[] = raw ? JSON.parse(raw) : []
    if (!existing.some((entry) => entry.email === subscriber.email)) {
      existing.push(subscriber)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Something went wrong. Please try again.' }
  }
}
