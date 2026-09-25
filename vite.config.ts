import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, runnerImport, type Plugin } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const alias = { '@': path.resolve(__dirname, './src') }

type Slugged = { slug: string }

/** Emits sitemap.xml from the catalog so new products and collections are indexed */
function sitemap(): Plugin {
  const load = async <T>(file: string) =>
    (await runnerImport<T>(file, { configFile: false, resolve: { alias } })).module

  return {
    name: 'empress-sitemap',
    apply: 'build',
    async generateBundle() {
      const { SITE } = await load<{ SITE: { url: string } }>('./src/lib/constants.ts')
      const { products, collections } = await load<{
        products: Slugged[]
        collections: Slugged[]
      }>('./src/data/catalog.ts')
      const { shopListings } = await load<{ shopListings: Slugged[] }>(
        './src/data/shopListings.ts',
      )

      const paths = [
        '/',
        '/shop',
        ...shopListings.map(({ slug }) => `/shop/${slug}`),
        '/collections',
        ...collections.map(({ slug }) => `/collections/${slug}`),
        ...products.map(({ slug }) => `/product/${slug}`),
        '/lookbook',
        '/about',
        '/size-guide',
        '/faq',
      ]

      const urls = paths
        .map((route) => `  <url><loc>${SITE.url}${route === '/' ? '' : route}</loc></url>`)
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap()],
  resolve: { alias },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|react-router|scheduler|cookie|set-cookie-parser)[\\/]/,
            },
            {
              name: 'motion',
              test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/,
            },
          ],
        },
      },
    },
  },
})
