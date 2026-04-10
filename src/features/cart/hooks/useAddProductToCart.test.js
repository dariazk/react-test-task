import { buildCartItem } from "./useAddProductToCart"

describe("buildCartItem", () => {
  it("builds unique cart item for product+color+size", () => {
    const item = buildCartItem({
      product: { id: 7, name: "Худи", brand: "North Street" },
      selectedColor: { id: 2, name: "бежевый", price: "239.00" },
      selectedSize: { id: 4, name: "L" },
      previewImage: "/images/7/beige.png",
    })

    expect(item.cartItemId).toBe("7-2-4")
    expect(item.colorName).toBe("бежевый")
    expect(item.sizeName).toBe("L")
  })
})
