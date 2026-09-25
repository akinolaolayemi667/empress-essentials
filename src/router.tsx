import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/components/layout'
import {
  CollectionPage,
  CollectionsPage,
  HomePage,
  NotFoundPage,
  ProductPage,
  ShopPage,
} from '@/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop/:category?', element: <ShopPage /> },
      { path: 'product/:slug', element: <ProductPage /> },
      { path: 'collections', element: <CollectionsPage /> },
      { path: 'collections/:slug', element: <CollectionPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
