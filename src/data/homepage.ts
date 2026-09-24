import { ROUTES } from '@/lib/constants'

/** Homepage media registry — replace files in /public/images to update photography */
export const homepageMedia = {
  heroPrimary: {
    src: '/images/hero-primary.jpg',
    alt: 'Editorial fashion portrait in soft natural light',
  },
  heroSecondary: {
    src: '/images/hero-secondary.jpg',
    alt: 'Detail of curated fashion styling',
  },
  collectionNew: {
    src: '/images/collection-new.jpg',
    alt: 'New arrivals look — clean contemporary styling',
  },
  collectionThrift: {
    src: '/images/collection-thrift.jpg',
    alt: 'Thrift edit — expressive vintage-inspired layers',
  },
  collectionStatement: {
    src: '/images/collection-statement.jpg',
    alt: 'Statement piece — dramatic fashion-forward silhouette',
  },
} as const

export type FeaturedCollectionItem = {
  id: string
  index: string
  title: string
  description: string
  href: string
  badge: string
  cta: string
  image: string
  imageAlt: string
  layout: 'featured' | 'secondary'
}

export const featuredCollections: FeaturedCollectionItem[] = [
  {
    id: 'new-arrivals',
    index: '01',
    title: 'New Arrivals',
    description: 'Fresh pieces selected for the new season.',
    href: ROUTES.newArrivals,
    badge: 'NEW',
    cta: 'Shop New Arrivals',
    image: homepageMedia.collectionNew.src,
    imageAlt: homepageMedia.collectionNew.alt,
    layout: 'featured',
  },
  {
    id: 'thrift-edit',
    index: '02',
    title: 'The Thrift Edit',
    description:
      'Unique finds with character, style and a story of their own.',
    href: ROUTES.thrift,
    badge: 'CURATED',
    cta: 'Explore Thrift',
    image: homepageMedia.collectionThrift.src,
    imageAlt: homepageMedia.collectionThrift.alt,
    layout: 'secondary',
  },
  {
    id: 'statement-pieces',
    index: '03',
    title: 'Statement Pieces',
    description: 'Standout pieces designed to make the look unforgettable.',
    href: `${ROUTES.shop}?category=statement`,
    badge: 'FEATURED',
    cta: 'Discover Statement',
    image: homepageMedia.collectionStatement.src,
    imageAlt: homepageMedia.collectionStatement.alt,
    layout: 'secondary',
  },
]

export const heroContent = {
  season: 'Autumn / Winter 2026',
  label: 'New Season',
  lines: ['Style That Speaks', 'Before You Do.'],
  description:
    'Discover curated new and thrift pieces designed to make every look feel unmistakably yours.',
  primaryCta: {
    label: 'Shop New Arrivals',
    href: ROUTES.newArrivals,
  },
  secondaryCta: {
    label: 'Explore Thrift',
    href: ROUTES.thrift,
  },
  primaryImage: homepageMedia.heroPrimary,
  secondaryImage: homepageMedia.heroSecondary,
} as const
