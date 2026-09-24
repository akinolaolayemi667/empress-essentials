const currencyLocales: Record<string, string> = {
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'en-IE',
}

export function formatPrice(
  amount: number,
  currency: 'USD' | 'GBP' | 'EUR' = 'USD',
): string {
  return new Intl.NumberFormat(currencyLocales[currency] ?? 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(iso: string, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso))
}
