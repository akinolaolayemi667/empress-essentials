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
    caption: 'Quiet tailoring for days that turn into nights.',
    primaryImage: '/images/lookbook-01.jpg',
    primaryAlt: 'Woman in a draped champagne shirt against a pale studio wall',
    detailImage: '/images/lookbook-01-detail.jpg',
    detailAlt: 'Close detail of a cream rib-knit jumper',
    story:
      'Fine knits, fluid silk and relaxed pleated trousers in oatmeal, ivory and camel — a soft uniform that moves from morning plans to evening without a second thought.',
    productSlugs: [
      'aurelie-fine-rib-turtleneck',
      'isla-silk-blouse',
      'vera-pleated-wide-leg-trousers',
      'solene-knit-lounge-set',
    ],
  },
  {
    id: 'look-02',
    lookNumber: 'LOOK 02',
    title: 'After Dark',
    caption: 'Burgundy, satin and candlelight.',
    primaryImage: '/images/lookbook-02.jpg',
    primaryAlt: 'Woman in a sculpted burgundy gown in a candlelit room',
    detailImage: '/images/lookbook-02-detail.jpg',
    detailAlt: 'Woman in a fine knit and metallic pleated skirt',
    story:
      'Liquid satin, deep wine and one archival velvet find — the colour of the season, dressed for the hours after sunset.',
    productSlugs: [
      'elise-satin-slip-gown',
      'noemi-bias-satin-skirt',
      'margaux-sculpted-blazer',
      'vintage-velvet-wrap-dress',
    ],
  },
  {
    id: 'look-03',
    lookNumber: 'LOOK 03',
    title: 'The Library Edit',
    caption: 'Heritage textures with a past, worn for now.',
    primaryImage: '/images/lookbook-03.jpg',
    primaryAlt: 'Woman in a waistcoat, tie and tweed trousers against a stone wall',
    detailImage: '/images/lookbook-03-detail.jpg',
    detailAlt: 'Brown leather satchel carried with a knit cardigan',
    story:
      'Tweed, cable knits, crisp pleats and a well-worn leather satchel — one-of-one thrift finds with the ease of a favourite book.',
    productSlugs: [
      'vintage-wool-tweed-blazer',
      'vintage-cable-knit-jumper',
      'vintage-pleated-midi-skirt',
      'vintage-leather-satchel',
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
