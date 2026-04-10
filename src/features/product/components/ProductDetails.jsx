import React from "react"
import { useAddProductToCart } from "../../cart/hooks/useAddProductToCart"
import { useProductSelection } from "../hooks/useProductSelection"
import ProductImageGallery from "./ProductImageGallery"
import ProductSelectors from "./ProductSelectors"
import PageLayout from "../../shared/layouts/PageLayout"

export default function ProductDetails({ product, sizes }) {
  const addProductToCart = useAddProductToCart()
  const selection = useProductSelection(product, sizes)
  const { color, images, imageIndex, size, inStock } = selection

  const handleAddToCart = () => addProductToCart({ product, selection })

  const gallery = {
    productName: product.name,
    colorName: color?.name,
    images,
    imageIndex,
    selectImage: selection.selectImage,
  }

  return (
    <PageLayout backTo="/" showCartButton>
      <article className="product-details-card">
        <ProductImageGallery gallery={gallery} />

        <div className="product-details-content">
          <h1 className="product-details-title">{product.name}</h1>
          <p className="product-details-brand">Бренд: {product.brand}</p>
          <p className="product-details-price">Цена: {color?.price ?? "—"} руб</p>
          <ProductSelectors product={product} sizes={sizes} selection={selection} />
          <p className="product-details-description">
            {color?.description ?? "Описание отсутствует."}
          </p>
          <button
            className="product-add-button"
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock || !size}
          >
            {inStock ? "Добавить в корзину" : "Нет в наличии"}
          </button>
        </div>
      </article>
    </PageLayout>
  )
}
