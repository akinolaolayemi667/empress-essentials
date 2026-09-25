import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/components/layout'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { RouteErrorPage } from '@/pages/RouteErrorPage'
import {
  AboutPage,
  AccountPage,
  CheckoutPage,
  CollectionPage,
  CollectionsPage,
  LookbookPage,
  OrderConfirmationPage,
  ProductPage,
  SearchPage,
  ShopPage,
  WishlistPage,
} from '@/pages/lazy'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: (
      <RootLayout>
        <RouteErrorPage />
      </RootLayout>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop/:category?', element: <ShopPage /> },
      { path: 'product/:slug', element: <ProductPage /> },
      { path: 'collections', element: <CollectionsPage /> },
      { path: 'collections/:slug', element: <CollectionPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'lookbook', element: <LookbookPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'checkout/confirmation/:reference', element: <OrderConfirmationPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
