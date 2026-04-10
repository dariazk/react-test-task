import { cartReducer } from "./CartContext"

describe("cartReducer", () => {
  it("adds new item with quantity 1 and increments existing", () => {
    const first = cartReducer([], {
      type: "ADD_ITEM",
      payload: { cartItemId: "1-1-1", price: "100.00" },
    })
    expect(first).toHaveLength(1)
    expect(first[0].quantity).toBe(1)

    const second = cartReducer(first, {
      type: "ADD_ITEM",
      payload: { cartItemId: "1-1-1", price: "100.00" },
    })
    expect(second).toHaveLength(1)
    expect(second[0].quantity).toBe(2)
  })
})
