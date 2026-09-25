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
  story: string
  productSlugs: string[]
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
    story:
      'Soft knits, easy tailoring and a clean foundation layer — pieces that move from morning plans to evening without a second thought.',
    productSlugs: [
      'mia-knit-top',
      'amara-wide-leg-trousers',
      'classic-ribbed-bodysuit',
      'avery-oversized-shirt',
    ],
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
    story:
      'Satin that catches the light, a skirt with controlled movement and a printed find with a past — dressing for the hours after sunset.',
    productSlugs: ['luna-satin-dress', 'noir-evening-skirt', 'printed-evening-top'],
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
    story:
      'Sculptural lines and a deep burgundy palette — new season tailoring beside a one-of-one vintage blazer, each made to be remembered.',
    productSlugs: [
      'elora-statement-dress',
      'burgundy-tailored-blazer',
      'vintage-burgundy-blazer',
    ],
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
