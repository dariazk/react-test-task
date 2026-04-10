import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import CatalogPage from "./features/catalog/pages/CatalogPage"
import ProductPage from "./features/product/pages/ProductPage"
import CartPage from "./features/cart/pages/CartPage"

const router = createBrowserRouter([
  { path: "/", element: <CatalogPage /> },
  { path: "/product/:productId", element: <ProductPage /> },
  { path: "/cart", element: <CartPage /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
