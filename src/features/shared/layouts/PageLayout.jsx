import React from "react"
import { Link } from "react-router-dom"
import CartButton from "../../cart/components/CartButton"

export default function PageLayout({
  title,
  backTo,
  backLabel = "Назад к каталогу",
  showCartButton = false,
  children,
}) {
  return (
    <section className="page-layout">
      {title ? <h1 className="page-layout-title">{title}</h1> : null}
      {backTo ? (
        <Link className="page-layout-back-link" to={backTo}>
          {backLabel}
        </Link>
      ) : null}
      {showCartButton ? <CartButton /> : null}
      {children}
    </section>
  )
}
