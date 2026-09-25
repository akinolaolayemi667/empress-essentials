import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { dismissToast, pauseToast, resumeToast, useToast } from '@/hooks/useToast'

const actionClass =
  'editorial-label shrink-0 text-canvas underline underline-offset-4 transition-opacity hover:opacity-70'

export function Toaster() {
  const toast = useToast()
  const reduced = usePrefersReducedMotion()
  const { pathname } = useLocation()
  const action = toast?.action?.href === pathname ? undefined : toast?.action

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center px-4 pb-4 md:justify-start md:px-6 md:pb-6"
    >
      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            className="pointer-events-auto flex w-full max-w-md items-center gap-5 bg-ink py-3.5 pl-5 pr-2 text-canvas shadow-soft"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={pauseToast}
            onMouseLeave={resumeToast}
            onFocus={pauseToast}
            onBlur={resumeToast}
          >
            <p className="min-w-0 flex-1 text-small">{toast.message}</p>
            {action?.href ? (
              <a href={action.href} className={actionClass} onClick={dismissToast}>
                {action.label}
              </a>
            ) : action ? (
              <button
                type="button"
                className={actionClass}
                onClick={() => {
                  action.onClick?.()
                  dismissToast()
                }}
              >
                {action.label}
              </button>
            ) : null}
            <button
              type="button"
              aria-label="Dismiss"
              onClick={dismissToast}
              className="flex h-9 w-9 shrink-0 items-center justify-center text-canvas/70 transition-colors hover:text-canvas"
            >
              <X size={15} strokeWidth={1.5} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
