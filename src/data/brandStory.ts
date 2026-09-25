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
    alt: 'Woman in a soft beige knit set and headwrap, seated against a warm studio backdrop',
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

export type AboutChapter = {
  label: string
  title: string
  body: string
  image: string
  imageAlt: string
}

/** Our Story page — philosophy and approach only; add founder or history details when available */
export const aboutPage = {
  label: 'Our Story',
  title: 'More Than What You Wear.',
  intro:
    'Empress Essentials is a considered wardrobe for women who want their clothes to say something — new season pieces and one-of-a-kind thrift finds, curated side by side.',
  heroImage: {
    src: '/images/brand-story.jpg',
    alt: 'Woman in a soft beige knit set and headwrap, seated against a warm studio backdrop',
  },
  quote: 'Style should feel like you, not everyone else.',
  chapters: [
    {
      label: 'New & Thrift',
      title: 'Side by Side, On Purpose.',
      body: 'We believe a great wardrobe is never all new or all vintage. New arrivals bring clean lines and modern ease; thrift brings texture, history and pieces no one else will be wearing. Together, they make getting dressed feel personal.',
      image: '/images/hero-secondary.jpg',
      imageAlt: 'Close detail of a camel wool coat cuff and gold bangle',
    },
    {
      label: 'Curation',
      title: 'Selected, Not Stocked.',
      body: 'Every piece earns its place. We look for cut, fabric and character, and we pass on anything that feels like filler. Thrift finds are chosen one at a time for their condition and the way they wear today.',
      image: '/images/collection-thrift.jpg',
      imageAlt: 'Woman in a vintage check blazer and black felt hat',
    },
    {
      label: 'Versatility',
      title: 'Made to Be Worn.',
      body: 'From everyday essentials to statement pieces, we choose clothes that work harder — pieces that layer, restyle and move from one part of your life to the next.',
      image: '/images/lookbook-02.jpg',
      imageAlt: 'Woman in a sculpted burgundy gown in a candlelit room',
    },
  ] satisfies AboutChapter[],
} as const
