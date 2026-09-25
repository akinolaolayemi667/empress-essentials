import { ROUTES, SITE } from '@/lib/constants'
import { business, deliveryEstimates } from './business'

const threshold = `$${SITE.freeShippingThreshold}`
const returnDays = business.returnWindowDays

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

export const faqItems: FaqItem[] = [
  {
    question: 'Where do you ship?',
    answer: `Anywhere in Nigeria and internationally. Delivery takes ${deliveryEstimates[0].time} in Lagos and ${deliveryEstimates[1].time} elsewhere in Nigeria. International delivery times are confirmed with your shipping quote.`,
    link: { label: 'Shipping & Returns', href: ROUTES.shipping },
  },
  {
    question: 'Do you offer free shipping?',
    answer: `Yes, within Nigeria on orders over ${threshold}. Shipping for other orders, including all international orders, is calculated for your address and confirmed before payment.`,
  },
  {
    question: 'Can I return something?',
    answer: `New pieces can be returned within ${returnDays} days of delivery, unworn and unwashed with their original tags attached. Thrift pieces are final sale. You can choose a refund or store credit.`,
    link: { label: 'Read the returns policy', href: `${ROUTES.shipping}#returns` },
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

export type PolicySection = {
  id: string
  heading: string
  paragraphs?: string[]
  list?: string[]
  table?: { label: string; value: string }[]
  link?: { label: string; href: string }
}

export type PolicyDocument = {
  label: string
  title: string
  intro: string
  sections: PolicySection[]
}

export const shippingPolicy: PolicyDocument = {
  label: 'Customer Care',
  title: 'Shipping & Returns',
  intro: 'Where we deliver, how long it takes, and what to do if a piece isn’t right.',
  sections: [
    {
      id: 'delivery',
      heading: 'Delivery',
      paragraphs: [
        'We ship anywhere in Nigeria and internationally. Working days are Monday to Friday, excluding public holidays.',
      ],
      table: deliveryEstimates.map(({ region, time }) => ({ label: region, value: time })),
    },
    {
      id: 'shipping-costs',
      heading: 'Shipping Costs',
      list: [
        `Orders over ${threshold} delivered within Nigeria ship free.`,
        'For all other orders, shipping is calculated for your address and confirmed with you before payment.',
        'International orders may be subject to customs duties or import taxes set by the destination country. These are not included in our prices or shipping quote.',
      ],
    },
    {
      id: 'returns',
      heading: 'Returns on New Pieces',
      list: [
        `New pieces can be returned within ${returnDays} days of delivery.`,
        'Pieces must be unworn and unwashed, with their original tags attached.',
        'Return shipping is paid by the customer, unless the piece arrived faulty or we sent the wrong item.',
      ],
    },
    {
      id: 'thrift',
      heading: 'Thrift Pieces',
      paragraphs: [
        'Thrift pieces are one of one and are final sale. They cannot be returned or exchanged, so please review the size and condition notes on each piece before ordering.',
      ],
    },
    {
      id: 'refunds',
      heading: 'Refunds & Store Credit',
      paragraphs: [
        'Once your return has arrived and been checked, you can choose a refund to your original payment method or store credit for a future order.',
      ],
    },
    {
      id: 'start-a-return',
      heading: 'Starting a Return',
      paragraphs: [
        `Contact us within ${returnDays} days of delivery with your order reference and the piece you’d like to return. We’ll reply with return instructions.`,
        'These terms do not affect your statutory rights as a consumer.',
      ],
      link: { label: 'Contact us', href: ROUTES.contact },
    },
  ],
}

export const privacyPolicy: PolicyDocument = {
  label: 'Legal',
  title: 'Privacy Policy',
  intro: `How ${business.name} handles your information, written plainly.`,
  sections: [
    {
      id: 'who-we-are',
      heading: 'Who We Are',
      paragraphs: [
        `${business.name} is a fashion store based in ${business.location}. We handle personal data in line with the Nigeria Data Protection Act 2023.`,
      ],
    },
    {
      id: 'what-we-store',
      heading: 'What This Site Stores',
      paragraphs: [
        'The following is saved in your browser’s local storage on your device. It is not sent to us or to anyone else:',
      ],
      list: [
        'Your bag, wishlist and recently viewed pieces.',
        'Orders placed at checkout, including the name, address, email and phone number you enter.',
        'Your email address, if you join the Empress List.',
      ],
    },
    {
      id: 'third-parties',
      heading: 'Services We Use',
      list: [
        'Hosting: the site is hosted by Vercel, which processes standard technical data such as your IP address and browser type to deliver pages securely.',
        'Fonts: typefaces load from Google Fonts, so your browser connects to Google’s servers when you visit.',
      ],
      paragraphs: [
        'We will update this policy before connecting payment, email or account services, and it will name each provider and what they receive.',
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies & Tracking',
      paragraphs: [
        'We do not use advertising or analytics cookies, and we do not track you across other websites. Local storage is used only for the shopping features listed above.',
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your Rights',
      paragraphs: [
        'You have the right to access, correct or delete personal data we hold about you, and to withdraw consent at any time. Because this site currently stores your information only on your device, you can delete it at any time by clearing this site’s data in your browser settings.',
      ],
      link: { label: 'Questions? Contact us', href: ROUTES.contact },
    },
  ],
}

export const termsOfService: PolicyDocument = {
  label: 'Legal',
  title: 'Terms of Service',
  intro: `The terms that apply when you browse and shop with ${business.name}.`,
  sections: [
    {
      id: 'about',
      heading: 'About These Terms',
      paragraphs: [
        `These terms apply to your use of this website and to orders placed with ${business.name}, ${business.location}. By using the site or placing an order, you agree to them.`,
      ],
    },
    {
      id: 'products',
      heading: 'Products',
      list: [
        'We aim to show every piece accurately. Colours can look slightly different depending on your screen.',
        'Thrift pieces are pre-loved and one of one. Their condition is described on each product page.',
        'All pieces are subject to availability.',
      ],
    },
    {
      id: 'orders-pricing',
      heading: 'Orders & Pricing',
      paragraphs: [
        'Prices are shown in the currency displayed on the site. An order is confirmed only once payment has been received. If a price or description is shown in error, we may cancel the affected order and refund any payment in full.',
      ],
    },
    {
      id: 'shipping-returns',
      heading: 'Shipping & Returns',
      paragraphs: [
        'Delivery, shipping costs, returns and refunds are covered by our Shipping & Returns policy, which forms part of these terms.',
      ],
      link: { label: 'Shipping & Returns', href: ROUTES.shipping },
    },
    {
      id: 'content',
      heading: 'Site Content',
      paragraphs: [
        `Text, photography and design on this site belong to ${business.name} or its licensors and may not be copied or reused without permission.`,
      ],
    },
    {
      id: 'liability',
      heading: 'Liability',
      paragraphs: [
        'To the extent permitted by law, we are not liable for indirect or consequential losses arising from use of the site. Nothing in these terms limits your statutory rights as a consumer.',
      ],
    },
    {
      id: 'law',
      heading: 'Governing Law',
      paragraphs: [
        'These terms are governed by the laws of the Federal Republic of Nigeria, and disputes are subject to the courts of Lagos State.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes',
      paragraphs: [
        'We may update these terms from time to time. The date below shows when they last changed.',
      ],
      link: { label: 'Contact us', href: ROUTES.contact },
    },
  ],
}
