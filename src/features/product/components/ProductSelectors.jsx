import React from "react"

export default function ProductSelectors({
  product,
  sizes,
  selection,
}) {
  const { color, size, colorSizeIds, selectColor, selectSize } = selection

  return (
    <>
      <div className="product-options-block">
        <p className="product-details-color">Цвет:</p>
        <div className="product-option-list">
          {product.colors.map((itemColor) => (
            <button
              key={itemColor.id}
              type="button"
              className={`product-option-button ${
                String(itemColor.id) === String(color?.id) ? "is-active" : ""
              }`}
              onClick={() => selectColor(itemColor.id)}
            >
              {itemColor.name}
            </button>
          ))}
        </div>
      </div>

      <div className="product-options-block">
        <p className="product-details-sizes">Размер:</p>
        <div className="product-option-list">
          {sizes.map((itemSize) => {
            const isAvailable = colorSizeIds.some(
              (id) => String(id) === String(itemSize.id),
            )
            const isSelected = String(itemSize.id) === String(size?.id)

            return (
              <button
                key={itemSize.id}
                type="button"
                className={`product-option-button ${isSelected ? "is-active" : ""}`}
                onClick={() => selectSize(itemSize.id)}
                disabled={!isAvailable}
              >
                {itemSize.name}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
