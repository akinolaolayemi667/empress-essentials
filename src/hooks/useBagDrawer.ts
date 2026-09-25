import { useSyncExternalStore } from 'react'

let isOpen = false
const listeners = new Set<() => void>()

function setOpen(next: boolean) {
  if (isOpen === next) return
  isOpen = next
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const openBagDrawer = () => setOpen(true)
export const closeBagDrawer = () => setOpen(false)

/** Shared bag drawer visibility so any component can open the bag */
export function useBagDrawer() {
  const open = useSyncExternalStore(
    subscribe,
    () => isOpen,
    () => false,
  )

  return { open, openBag: openBagDrawer, closeBag: closeBagDrawer }
}
