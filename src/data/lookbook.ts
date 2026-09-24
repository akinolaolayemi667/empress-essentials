import { ROUTES } from '@/lib/constants'

export type LookbookLook = {
  id: string
  lookNumber: string
  title: string
  caption: string
  primaryImage: string
  primaryAlt: string
  detailImage: string
  detailAlt: string
}

export const lookbookLooks: LookbookLook[] = [
  {
    id: 'look-01',
    lookNumber: 'LOOK 01',
    title: 'The Everyday Edit',
    caption: 'Designed for days that turn into nights.',
    primaryImage: '/images/lookbook-01.jpg',
    primaryAlt: 'Everyday editorial look — soft layers and easy silhouette',
    detailImage: '/images/lookbook-01-detail.jpg',
    detailAlt: 'Texture detail from the everyday edit',
  },
  {
    id: 'look-02',
    lookNumber: 'LOOK 02',
    title: 'After Dark',
    caption: 'A balance of structure, softness and confidence.',
    primaryImage: '/images/lookbook-02.jpg',
    primaryAlt: 'Evening look with refined drapery',
    detailImage: '/images/lookbook-02-detail.jpg',
    detailAlt: 'After dark fashion detail',
  },
  {
    id: 'look-03',
    lookNumber: 'LOOK 03',
    title: 'The Statement Edit',
    caption: 'Silhouettes that hold the room without raising their voice.',
    primaryImage: '/images/lookbook-03.jpg',
    primaryAlt: 'Bold statement silhouette',
    detailImage: '/images/lookbook-03-detail.jpg',
    detailAlt: 'Statement texture and form',
  },
]

export const lookbookContent = {
  headline: 'The Empress Edit',
  description:
    "A closer look at the season's silhouettes, textures and effortless combinations.",
  cta: {
    label: 'View Full Lookbook',
    href: ROUTES.lookbook,
  },
  marquee:
    'EMPOWERED STYLE • CURATED PIECES • EVERYDAY ELEGANCE • EMPOWERED STYLE • CURATED PIECES • EVERYDAY ELEGANCE • ',
} as const
