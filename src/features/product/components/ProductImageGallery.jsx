import React from "react"

export default function ProductImageGallery({ gallery }) {
  const { productName, colorName, images, imageIndex, selectImage } = gallery
  const previewImage = images[imageIndex] ?? images[0]

  if (!previewImage) {
    return <div className="product-details-image-placeholder">Нет изображения</div>
  }

  return (
    <div>
      <img
        className="product-details-image"
        src={previewImage}
        alt={`${productName} (${colorName})`}
      />
      {images.length > 1 ? (
        <div className="product-thumbs">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={`product-thumb-button ${index === imageIndex ? "is-active" : ""}`}
              onClick={() => selectImage(index)}
              aria-label={`Изображение ${index + 1}`}
            >
              <img
                className="product-thumb-image"
                src={image}
                alt={`${productName} превью ${index + 1}`}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
