import { useCart } from "../context/CartContext"

export function buildCartItem({ product, selectedColor, selectedSize, previewImage }) {
  const cartItemId = `${product.id}-${selectedColor.id}-${selectedSize.id}`

  return {
    cartItemId,
    name: product.name,
    brand: product.brand,
    colorName: selectedColor.name,
    sizeName: selectedSize.name,
    price: selectedColor?.price ?? 0,
    image: previewImage ?? "",
  }
}

export function useAddProductToCart() {
  const { addItem } = useCart()

  return ({ product, selection }) => {
    const selectedColor = selection?.color
    const selectedSize = selection?.size
    const previewImage = selection?.previewImage

    if (!selectedColor || !selectedSize) return

    addItem(buildCartItem({ product, selectedColor, selectedSize, previewImage }))
  }
}
