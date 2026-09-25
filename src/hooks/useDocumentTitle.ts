import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { SITE } from '@/lib/constants'

function setMeta(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector)
  if (element) element.content = content
}

/** Keeps the title, description, canonical URL, and social tags in sync per page */
export function useDocumentTitle(title?: string, description?: string) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`
    const summary = description ?? SITE.description
    const url = `${SITE.url}${pathname === '/' ? '' : pathname}`

    document.title = fullTitle
    setMeta('meta[name="description"]', summary)
    setMeta('meta[property="og:title"]', fullTitle)
    setMeta('meta[property="og:description"]', summary)
    setMeta('meta[property="og:url"]', url)

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, pathname])
}
