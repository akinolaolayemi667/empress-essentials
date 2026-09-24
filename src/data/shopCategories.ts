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
    imageAlt: 'Editorial dress silhouette',
    href: `${ROUTES.shop}/dresses`,
    layout: 'featured',
  },
  {
    id: 'tops',
    index: '02',
    name: 'Tops',
    description: 'Essential layers and statement-making styles.',
    image: '/images/category-tops.jpg',
    imageAlt: 'Curated tops and layers',
    href: `${ROUTES.shop}/tops`,
    layout: 'standard',
  },
  {
    id: 'bottoms',
    index: '03',
    name: 'Bottoms',
    description: 'Tailored, relaxed and everything between.',
    image: '/images/category-bottoms.jpg',
    imageAlt: 'Tailored and relaxed bottoms',
    href: `${ROUTES.shop}/bottoms`,
    layout: 'standard',
  },
  {
    id: 'sets',
    index: '04',
    name: 'Sets',
    description: 'Effortless looks designed to work together.',
    image: '/images/category-sets.jpg',
    imageAlt: 'Coordinated fashion set',
    href: `${ROUTES.shop}/sets`,
    layout: 'standard',
  },
  {
    id: 'thrift',
    index: '05',
    name: 'Thrift',
    description: 'Curated pre-loved pieces with individual character.',
    image: '/images/category-thrift.jpg',
    imageAlt: 'Curated thrift edit',
    href: ROUTES.thrift,
    layout: 'standard',
  },
  {
    id: 'statement',
    index: '06',
    name: 'Statement',
    description: 'Bold pieces made to stand apart.',
    image: '/images/category-statement.jpg',
    imageAlt: 'Bold statement fashion',
    href: `${ROUTES.shop}/statement`,
    layout: 'standard',
  },
]
