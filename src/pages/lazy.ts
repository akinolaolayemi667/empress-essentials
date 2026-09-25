import { lazy } from 'react'

export const ShopPage = lazy(() =>
  import('./ShopPage').then((m) => ({ default: m.ShopPage })),
)
export const ProductPage = lazy(() =>
  import('./ProductPage').then((m) => ({ default: m.ProductPage })),
)
export const CollectionsPage = lazy(() =>
  import('./CollectionsPage').then((m) => ({ default: m.CollectionsPage })),
)
export const CollectionPage = lazy(() =>
  import('./CollectionPage').then((m) => ({ default: m.CollectionPage })),
)
export const SearchPage = lazy(() =>
  import('./SearchPage').then((m) => ({ default: m.SearchPage })),
)
export const WishlistPage = lazy(() =>
  import('./WishlistPage').then((m) => ({ default: m.WishlistPage })),
)
export const LookbookPage = lazy(() =>
  import('./LookbookPage').then((m) => ({ default: m.LookbookPage })),
)
export const AboutPage = lazy(() =>
  import('./AboutPage').then((m) => ({ default: m.AboutPage })),
)
export const CheckoutPage = lazy(() =>
  import('./CheckoutPage').then((m) => ({ default: m.CheckoutPage })),
)
export const OrderConfirmationPage = lazy(() =>
  import('./OrderConfirmationPage').then((m) => ({ default: m.OrderConfirmationPage })),
)
export const SizeGuidePage = lazy(() =>
  import('./SizeGuidePage').then((m) => ({ default: m.SizeGuidePage })),
)
export const FaqPage = lazy(() =>
  import('./FaqPage').then((m) => ({ default: m.FaqPage })),
)
export const InfoPendingPage = lazy(() =>
  import('./InfoPendingPage').then((m) => ({ default: m.InfoPendingPage })),
)
export const AccountPage = lazy(() =>
  import('./AccountPage').then((m) => ({ default: m.AccountPage })),
)
