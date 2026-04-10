import React from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import { CartProvider } from "./features/cart/context/CartContext"
import "./styles/index.css"

const domNode = document.getElementById("root")
const root = createRoot(domNode)

root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
)
