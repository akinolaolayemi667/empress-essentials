const RELOAD_KEY = 'empress:chunk-reload'

const CHUNK_ERROR_PATTERN =
  /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS/i

export function isChunkLoadError(error: unknown): boolean {
  return error instanceof Error && CHUNK_ERROR_PATTERN.test(error.message)
}

/**
 * After a deploy, tabs opened on the previous build request chunks that no
 * longer exist. Reload once per session to pick up the new build; if that
 * still fails, the route error page takes over.
 */
export function installChunkReload() {
  window.addEventListener('vite:preloadError', (event) => {
    if (sessionStorage.getItem(RELOAD_KEY)) return
    event.preventDefault()
    sessionStorage.setItem(RELOAD_KEY, '1')
    window.location.reload()
  })

  window.addEventListener('load', () => {
    window.setTimeout(() => sessionStorage.removeItem(RELOAD_KEY), 10_000)
  })
}
