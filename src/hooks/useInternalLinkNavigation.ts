import { useEffect } from 'react'
import { useNavigate } from 'react-router'

/**
 * Routes same-origin <a href> clicks through the client router, so plain
 * anchors across the site navigate without a full page reload.
 */
export function useInternalLinkNavigation() {
  const navigate = useNavigate()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const anchor = (event.target as Element | null)?.closest('a')
      if (!anchor || !anchor.href) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return

      const samePage =
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      if (samePage && url.hash) return

      event.preventDefault()
      navigate(`${url.pathname}${url.search}${url.hash}`)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])
}
