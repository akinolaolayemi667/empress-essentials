type ClassValue = string | false | null | undefined

/** Lightweight className merger — no extra deps */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
