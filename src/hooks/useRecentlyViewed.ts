import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'empress:recently-viewed'
const LIMIT = 8

let snapshot: string[] = read()
const listeners = new Set<() => void>()

function read(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Moves the product to the front of this device's viewing history */
export function recordProductView(productId: string) {
  if (snapshot[0] === productId) return
  snapshot = [productId, ...snapshot.filter((id) => id !== productId)].slice(0, LIMIT)
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    // Storage may be full or disabled; history simply won't persist.
  }
  listeners.forEach((listener) => listener())
}

export function useRecentlyViewed() {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => [],
  )
}
