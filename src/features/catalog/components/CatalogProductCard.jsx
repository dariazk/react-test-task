import React from "react"
import { Link } from "react-router-dom"

import {
  getMinPrice,
  productHasAnySizes,
} from "../hooks/useCatalogFilters"

export default function CatalogProductCard({ product }) {
  const firstColor = product.colors[0]
  const previewImage = firstColor?.images?.[0]
  const hasAnySizes = productHasAnySizes(product)
  const minPrice = product.colors?.length ? getMinPrice(product) : null

  return (
    <li className="product-card">
      <Link className="product-card-link" to={`/product/${product.id}`}>
        {previewImage ? (
          <img
            className="product-preview-image"
            src={previewImage}
            alt={
              firstColor?.name
                ? `${product.name} (${firstColor.name})`
                : product.name
            }
          />
        ) : (
          <div className="product-image-placeholder">Нет изображения</div>
        )}
        <h3 className="product-name">{product.name}</h3>
        <p className="product-brand">{product.brand}</p>
        <p className="product-price">{minPrice ?? "—"} руб</p>
        <p className="product-stock">{hasAnySizes ? "В наличии" : "Нет в наличии"}</p>
        <span className="product-link">Открыть товар</span>
      </Link>
    </li>
  )
}
