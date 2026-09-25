import { useEffect } from 'react'
import { SITE } from '@/lib/constants'

export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`

    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) meta.content = description ?? SITE.description
  }, [title, description])
}
