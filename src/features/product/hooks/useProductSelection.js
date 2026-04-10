import { useEffect, useState } from "react"

export function useProductSelection(product, sizes) {
  const [imageIndex, setImageIndex] = useState(0)
  const [colorId, setColorId] = useState(null)
  const [sizeId, setSizeId] = useState(null)

  const getColorById = (colorId) =>
    product.colors.find((color) => String(color.id) === String(colorId))

  const resolveSizeIdForColor = (color, preferredSizeId) => {
    if (!color) return null
    if (preferredSizeId != null) {
      const isPreferredAvailable = color.sizes.some(
        (id) => String(id) === String(preferredSizeId),
      )
      if (isPreferredAvailable) return preferredSizeId
    }
    return color.sizes[0] ?? null
  }

  useEffect(() => {
    const initialColor = product.colors[0]
    setImageIndex(0)
    setColorId(initialColor?.id ?? null)
    setSizeId(resolveSizeIdForColor(initialColor, null))
  }, [product.id])

  const color = getColorById(colorId) ?? product.colors[0]
  const colorSizeIds = color?.sizes ?? []
  const images = color?.images ?? []
  const previewImage = images[imageIndex] ?? images[0]
  const availableSizes = sizes.filter((size) =>
    colorSizeIds.some((id) => String(id) === String(size.id)),
  )
  const inStock = availableSizes.length > 0
  const size = sizes.find((item) => String(item.id) === String(sizeId))

  const selectColor = (nextColorId) => {
    const nextColor = getColorById(nextColorId) ?? product.colors[0]
    setColorId(nextColor?.id ?? null)
    setImageIndex(0)
    setSizeId((currentSizeId) =>
      resolveSizeIdForColor(nextColor, currentSizeId),
    )
  }

  return {
    color,
    colorSizeIds,
    images,
    previewImage,
    imageIndex,
    selectImage: setImageIndex,
    selectColor,
    size,
    selectSize: setSizeId,
    inStock,
  }
}
