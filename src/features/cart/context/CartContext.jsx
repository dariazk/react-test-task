import React, { createContext, useContext, useEffect, useReducer } from "react"

const CART_STORAGE_KEY = "cart-items-v1"

const CartContext = createContext(null)

function readInitialCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const payloadKey = action.payload.cartItemId ?? String(action.payload.id)
      const existingIndex = state.findIndex(
        (item) => (item.cartItemId ?? String(item.id)) === payloadKey,
      )
      if (existingIndex === -1) {
        return [...state, { ...action.payload, quantity: 1 }]
      }

      return state.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    }
    case "REMOVE_ITEM":
      return state.filter(
        (item) => (item.cartItemId ?? String(item.id)) !== action.payload.id,
      )
    case "SET_QUANTITY":
      return state
        .map((item) =>
          (item.cartItemId ?? String(item.id)) === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0)
    case "CLEAR":
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], readInitialCart)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0,
  )

  const value = {
    items,
    totalCount,
    totalPrice,
    addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
    setQuantity: (id, quantity) =>
      dispatch({ type: "SET_QUANTITY", payload: { id, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR" }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }
  return context
}
