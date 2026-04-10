import React from "react"
import { useCart } from "../context/CartContext"
import PageLayout from "../../shared/layouts/PageLayout"

export default function CartPage() {
  const { items, totalCount, totalPrice, removeItem, setQuantity, clearCart } = useCart()

  return (
    <PageLayout title="Корзина" backTo="/" showCartButton>
      {items.length === 0 ? (
        <p>Корзина пустая.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li className="cart-item" key={item.cartItemId ?? item.id}>
                {item.image ? (
                  <img className="cart-item-image" src={item.image} alt={item.name} />
                ) : (
                  <div className="cart-item-image cart-item-image-placeholder">Нет фото</div>
                )}
                <div className="cart-item-content">
                  <h3 className="cart-item-title">{item.name}</h3>
                  <p className="cart-item-brand">{item.brand}</p>
                  <p className="cart-item-brand">Цвет: {item.colorName ?? "—"}</p>
                  <p className="cart-item-brand">Размер: {item.sizeName ?? "—"}</p>
                  <p className="cart-item-price">Цена: {item.price} руб</p>
                  <p className="cart-item-price">
                    Сумма по позиции:{" "}
                    {(Number(item.price || 0) * item.quantity).toFixed(2)} руб
                  </p>
                </div>
                <div className="cart-item-controls">
                  <button
                    className="cart-item-control-button"
                    type="button"
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      setQuantity(item.cartItemId ?? String(item.id), item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="cart-item-control-button"
                    type="button"
                    onClick={() =>
                      setQuantity(item.cartItemId ?? String(item.id), item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="cart-item-remove-button"
                    type="button"
                    onClick={() => removeItem(item.cartItemId ?? String(item.id))}
                  >
                    Удалить
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>Товаров: {totalCount}</p>
            <p>Итого: {totalPrice.toFixed(2)} руб</p>
            <button type="button" onClick={clearCart}>
              Очистить корзину
            </button>
          </div>
        </>
      )}
    </PageLayout>
  )
}
