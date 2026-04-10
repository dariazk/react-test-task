import React from "react"
import { useParams } from "react-router-dom"
import NotFoundPage from "../../shared/pages/NotFoundPage"
import PageLayout from "../../shared/layouts/PageLayout"
import ProductDetails from "../components/ProductDetails"
import { useProductData } from "../hooks/useProductData"

export default function ProductPage() {
  const { productId } = useParams()
  const { product, sizes, loading, error, notFound } = useProductData(productId)

  if (loading) {
    return (
      <PageLayout backTo="/" showCartButton>
        <p>Загрузка товара…</p>
      </PageLayout>
    )
  }
  if (notFound) return <NotFoundPage />
  if (error) {
    return (
      <PageLayout backTo="/" showCartButton>
        <p>Ошибка загрузки товара.</p>
      </PageLayout>
    )
  }
  if (!product) return null

  return <ProductDetails product={product} sizes={sizes} />
}
