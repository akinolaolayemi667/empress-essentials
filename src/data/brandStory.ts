import { ROUTES } from '@/lib/constants'

export type BrandPrinciple = {
  number: string
  title: string
  description: string
}

export const brandStory = {
  eyebrow: 'Why Empress Essentials',
  headline: 'More Than What You Wear.',
  subheadline: "It's how you show up.",
  paragraphs: [
    'Empress Essentials brings together carefully selected new and thrift pieces for women who want fashion to feel personal, expressive and effortless.',
    'From everyday essentials to statement finds, every piece is selected with an eye for character, versatility and style.',
  ],
  image: {
    src: '/images/brand-story.jpg',
    alt: 'Empress Essentials brand editorial portrait',
  },
  cta: {
    label: 'Explore Our World',
    href: ROUTES.about,
  },
  principles: [
    {
      number: '01',
      title: 'Curated',
      description: 'Every piece is selected with intention.',
    },
    {
      number: '02',
      title: 'Individual',
      description: 'Style should feel like you, not everyone else.',
    },
    {
      number: '03',
      title: 'Effortless',
      description: 'Great fashion should make getting dressed easier.',
    },
  ] satisfies BrandPrinciple[],
} as const
