import { useEffect } from 'react'

let lockCount = 0

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    lockCount += 1
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) {
        document.body.style.overflow = overflow
      }
    }
  }, [locked])
}
