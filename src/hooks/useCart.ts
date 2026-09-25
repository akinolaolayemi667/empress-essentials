import { useCallback, useSyncExternalStore } from 'react'
import { getProductById } from '@/data'
import type { Cart, CartItem } from '@/types/commerce'

const STORAGE_KEY = 'empress:cart'

const emptyCart: Cart = {
  items: [],
  updatedAt: null,
}

type CartListener = () => void

let cartSnapshot: Cart = readCart()
const listeners = new Set<CartListener>()

function readCart(): Cart {
  if (typeof window === 'undefined') return emptyCart
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyCart
    const stored = JSON.parse(raw) as Cart
    return {
      ...stored,
      items: stored.items.filter((item) => getProductById(item.productId)),
    }
  } catch {
    return emptyCart
  }
}

function writeCart(next: Cart) {
  cartSnapshot = next
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: CartListener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return cartSnapshot
}

function getServerSnapshot() {
  return emptyCart
}

/** Foundation cart hook — localStorage-backed, ready for Phase 2 bag UI */
export function useCart() {
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  const addItem = useCallback(
    (item: Omit<CartItem, 'id' | 'addedAt'> & { id?: string }) => {
      const existing = cart.items.find(
        (entry) =>
          entry.productId === item.productId &&
          entry.size === item.size &&
          entry.color === item.color,
      )

      const items = existing
        ? cart.items.map((entry) =>
            entry.id === existing.id
              ? { ...entry, quantity: entry.quantity + item.quantity }
              : entry,
          )
        : [
            ...cart.items,
            {
              id: item.id ?? `cart_${crypto.randomUUID()}`,
              productId: item.productId,
              quantity: item.quantity,
              size: item.size,
              color: item.color,
              addedAt: new Date().toISOString(),
            },
          ]

      writeCart({ items, updatedAt: new Date().toISOString() })
    },
    [cart.items],
  )

  const removeItem = useCallback(
    (itemId: string) => {
      writeCart({
        items: cart.items.filter((item) => item.id !== itemId),
        updatedAt: new Date().toISOString(),
      })
    },
    [cart.items],
  )

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        writeCart({
          items: cart.items.filter((item) => item.id !== itemId),
          updatedAt: new Date().toISOString(),
        })
        return
      }

      writeCart({
        items: cart.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item,
        ),
        updatedAt: new Date().toISOString(),
      })
    },
    [cart.items],
  )

  const clear = useCallback(() => {
    writeCart({ items: [], updatedAt: new Date().toISOString() })
  }, [])

  return {
    cart,
    items: cart.items,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clear,
  }
}
