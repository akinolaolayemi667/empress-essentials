import { useEffect, useState } from 'react'

/** True when the user prefers reduced motion */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export const editorialEase = [0.22, 1, 0.36, 1] as const

export const motionDuration = {
  slow: 0.9,
  base: 0.75,
  fast: 0.5,
} as const
