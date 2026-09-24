import { useCallback, useSyncExternalStore } from 'react'
import type { Wishlist } from '@/types/commerce'

const STORAGE_KEY = 'empress:wishlist'

const emptyWishlist: Wishlist = {
  items: [],
  updatedAt: null,
}

type WishlistListener = () => void

let wishlistSnapshot: Wishlist = readWishlist()
const listeners = new Set<WishlistListener>()

function readWishlist(): Wishlist {
  if (typeof window === 'undefined') return emptyWishlist
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyWishlist
    return JSON.parse(raw) as Wishlist
  } catch {
    return emptyWishlist
  }
}

function writeWishlist(next: Wishlist) {
  wishlistSnapshot = next
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: WishlistListener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return wishlistSnapshot
}

function getServerSnapshot() {
  return emptyWishlist
}

/** Foundation wishlist hook — localStorage-backed, ready for Phase 2 UI */
export function useWishlist() {
  const wishlist = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  const has = useCallback(
    (productId: string) =>
      wishlist.items.some((item) => item.productId === productId),
    [wishlist.items],
  )

  const toggle = useCallback(
    (productId: string) => {
      if (has(productId)) {
        writeWishlist({
          items: wishlist.items.filter((item) => item.productId !== productId),
          updatedAt: new Date().toISOString(),
        })
        return
      }

      writeWishlist({
        items: [
          ...wishlist.items,
          {
            id: `wish_${crypto.randomUUID()}`,
            productId,
            addedAt: new Date().toISOString(),
          },
        ],
        updatedAt: new Date().toISOString(),
      })
    },
    [has, wishlist.items],
  )

  const clear = useCallback(() => {
    writeWishlist({ items: [], updatedAt: new Date().toISOString() })
  }, [])

  return {
    wishlist,
    items: wishlist.items,
    count: wishlist.items.length,
    has,
    toggle,
    clear,
  }
}
