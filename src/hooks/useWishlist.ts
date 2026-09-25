import { useCallback, useSyncExternalStore } from 'react'
import { getProductById } from '@/data'
import { showToast } from '@/hooks/useToast'
import { ROUTES } from '@/lib/constants'
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
    const stored = JSON.parse(raw) as Wishlist
    return {
      ...stored,
      items: stored.items.filter((item) => getProductById(item.productId)),
    }
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

function addToWishlist(productId: string) {
  if (wishlistSnapshot.items.some((item) => item.productId === productId)) return
  writeWishlist({
    items: [
      ...wishlistSnapshot.items,
      { id: `wish_${crypto.randomUUID()}`, productId, addedAt: new Date().toISOString() },
    ],
    updatedAt: new Date().toISOString(),
  })
}

function removeFromWishlist(productId: string) {
  writeWishlist({
    items: wishlistSnapshot.items.filter((item) => item.productId !== productId),
    updatedAt: new Date().toISOString(),
  })
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
      const name = getProductById(productId)?.name ?? 'Piece'

      if (has(productId)) {
        removeFromWishlist(productId)
        showToast(`${name} removed from your wishlist.`, {
          label: 'Undo',
          onClick: () => addToWishlist(productId),
        })
        return
      }

      addToWishlist(productId)
      showToast(`${name} saved to your wishlist.`, {
        label: 'View',
        href: ROUTES.wishlist,
      })
    },
    [has],
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
