import { ROUTES, SITE } from '@/lib/constants'

export type SizeRow = {
  size: string
  us: string
  uk: string
  eu: string
}

/** Standard international womenswear conversions */
export const sizeConversions: SizeRow[] = [
  { size: 'XS', us: '0–2', uk: '4–6', eu: '32–34' },
  { size: 'S', us: '4–6', uk: '8–10', eu: '36–38' },
  { size: 'M', us: '8–10', uk: '12–14', eu: '40–42' },
  { size: 'L', us: '12–14', uk: '16–18', eu: '44–46' },
  { size: 'XL', us: '16–18', uk: '20–22', eu: '48–50' },
]

export type MeasureStep = {
  title: string
  body: string
}

export const measuringSteps: MeasureStep[] = [
  {
    title: 'Bust',
    body: 'Measure around the fullest part of your bust, keeping the tape level under your arms and across your back.',
  },
  {
    title: 'Waist',
    body: 'Measure around your natural waistline, the narrowest part of your torso, usually just above the navel.',
  },
  {
    title: 'Hips',
    body: 'Stand with your feet together and measure around the fullest part of your hips and seat.',
  },
]

export const sizeGuideNotes: string[] = [
  'Measure over light clothing with a soft tape, snug but not tight.',
  'If you fall between sizes, choose the larger size for a relaxed fit or the smaller for a closer one.',
  'Thrift pieces are listed by the size on their original label. Vintage sizing often runs smaller than today’s, so check the condition notes on each piece.',
]

export type FaqItem = {
  question: string
  answer: string
  link?: { label: string; href: string }
}

/** Only answers what the storefront already guarantees; extend as policies are confirmed */
export const faqItems: FaqItem[] = [
  {
    question: 'Do you offer free shipping?',
    answer: `Yes. Every order over $${SITE.freeShippingThreshold} ships free. For smaller orders, shipping is calculated at payment.`,
  },
  {
    question: 'What makes the Thrift Edit different?',
    answer:
      'Every thrift piece is individually selected for its character, quality and style. Each one is singular, its condition is noted on the product page, and the piece you see is the piece you receive.',
    link: { label: 'Explore the Thrift Edit', href: ROUTES.thrift },
  },
  {
    question: 'How do I find my size?',
    answer:
      'Our Size Guide covers international conversions and how to measure yourself. Thrift pieces follow the size on their original label.',
    link: { label: 'View the Size Guide', href: ROUTES.sizeGuide },
  },
  {
    question: 'Do I need an account to shop?',
    answer:
      'No. Your bag, wishlist and orders are saved in this browser, so you can shop without signing in. Accounts that sync across devices are on their way.',
    link: { label: 'Go to your account', href: ROUTES.account },
  },
  {
    question: 'Where is my wishlist saved?',
    answer:
      'On this device. Tap the heart on any piece to save it. Clearing your browser data will also clear your wishlist.',
    link: { label: 'View your wishlist', href: ROUTES.wishlist },
  },
  {
    question: 'Can I pay online?',
    answer:
      'Online payment is being connected. Until then, checkout saves your order on this device and no card details are collected or charged.',
  },
  {
    question: 'How do I hear about new arrivals and thrift drops?',
    answer:
      'Join the Empress List at the bottom of our homepage. We send new arrivals, thrift drops and the season’s edit. No noise, and you can unsubscribe anytime.',
    link: { label: 'Join the list', href: `${ROUTES.home}#newsletter` },
  },
]

export type PendingPage = {
  slug: string
  label: string
  title: string
  description: string
  details?: string[]
}

/** Policy pages awaiting confirmed business details */
export const pendingPages: Record<string, PendingPage> = {
  contact: {
    slug: 'contact',
    label: 'Customer Care',
    title: 'Contact',
    description:
      'Our contact details are being finalised. Until they’re live, our FAQ answers the most common questions.',
  },
  shipping: {
    slug: 'shipping-returns',
    label: 'Customer Care',
    title: 'Shipping & Returns',
    description: 'Our full shipping and returns policy is being finalised.',
    details: [
      `Every order over $${SITE.freeShippingThreshold} ships free.`,
      'Shipping for smaller orders and any taxes are calculated at payment.',
    ],
  },
  privacy: {
    slug: 'privacy',
    label: 'Legal',
    title: 'Privacy Policy',
    description: 'Our full privacy policy is being finalised.',
    details: [
      'Your bag, wishlist, recently viewed pieces and orders are stored only in this browser. They are not sent to a server.',
      'Newsletter sign-ups are currently stored in this browser until an email provider is connected.',
      'Clearing your browser data removes everything saved here.',
    ],
  },
  terms: {
    slug: 'terms',
    label: 'Legal',
    title: 'Terms of Service',
    description: 'Our terms of service are being finalised and will be published here.',
  },
}
