import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MOBILE_NAV_LINKS } from '@/lib/constants'
import { Logo } from './Logo'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type MobileNavProps = {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduced = usePrefersReducedMotion()

  useBodyScrollLock(open)
  useEscapeKey(onClose, open)

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[65] flex flex-col bg-canvas"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <Logo stacked onClick={onClose} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center text-ink"
            >
              <X size={20} strokeWidth={1.4} />
            </button>
          </div>

          <nav
            id={titleId}
            aria-label="Mobile"
            className="flex flex-1 flex-col overflow-y-auto px-6 py-10"
          >
            <ul className="flex flex-col gap-1">
              {MOBILE_NAV_LINKS.map((link, index) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    onClick={onClose}
                    className="block py-3.5 font-display text-[2rem] leading-none tracking-[-0.02em] text-ink transition-colors hover:text-burgundy"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 + index * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
