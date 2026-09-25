import { ROUTES } from '@/lib/constants'

export type ShopCategoryItem = {
  id: string
  index: string
  name: string
  description: string
  image: string
  imageAlt: string
  href: string
  layout: 'featured' | 'standard'
}

export const shopCategories: ShopCategoryItem[] = [
  {
    id: 'dresses',
    index: '01',
    name: 'Dresses',
    description:
      'From effortless everyday silhouettes to standout occasion pieces.',
    image: '/images/category-dresses.jpg',
    imageAlt: 'Woman in a cocoa satin slip dress reclining on warm sandstone',
    href: `${ROUTES.shop}/dresses`,
    layout: 'featured',
  },
  {
    id: 'tops',
    index: '02',
    name: 'Tops',
    description: 'Essential layers and statement-making styles.',
    image: '/images/category-tops.jpg',
    imageAlt: 'Woman in a cream cropped turtleneck in an autumn field',
    href: `${ROUTES.shop}/tops`,
    layout: 'standard',
  },
  {
    id: 'bottoms',
    index: '03',
    name: 'Bottoms',
    description: 'Tailored, relaxed and everything between.',
    image: '/images/category-bottoms.jpg',
    imageAlt: 'Woman in a white shirt and navy flared trousers in a bright doorway',
    href: `${ROUTES.shop}/bottoms`,
    layout: 'standard',
  },
  {
    id: 'sets',
    index: '04',
    name: 'Sets',
    description: 'Effortless looks designed to work together.',
    image: '/images/category-sets.jpg',
    imageAlt: 'Woman in a cream cropped blazer and matching wide trousers',
    href: `${ROUTES.shop}/sets`,
    layout: 'standard',
  },
  {
    id: 'thrift',
    index: '05',
    name: 'Thrift',
    description: 'Curated pre-loved pieces with individual character.',
    image: '/images/category-thrift.jpg',
    imageAlt: 'Woman in a camel coat carrying a vintage leather satchel',
    href: ROUTES.thrift,
    layout: 'standard',
  },
  {
    id: 'statement',
    index: '06',
    name: 'Statement',
    description: 'Bold pieces made to stand apart.',
    image: '/images/category-statement.jpg',
    imageAlt: 'Woman in an ivory oversized suit against a pale backdrop',
    href: ROUTES.statement,
    layout: 'standard',
  },
]
