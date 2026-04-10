import React from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function CartButton() {
  const { totalCount, totalPrice } = useCart()

  return (
    <Link className="cart-nav-button" to="/cart">
      Корзина ({totalCount}) · {totalPrice.toFixed(2)} руб
    </Link>
  )
}
