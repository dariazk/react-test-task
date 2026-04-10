import { useEffect, useState } from "react"
import { getProduct, getSizes } from "../../../services/api"

export function useProductData(productId) {
  const [product, setProduct] = useState(null)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      setNotFound(false)

      try {
        const [productData, sizesData] = await Promise.all([
          getProduct(productId),
          getSizes(),
        ])

        if (cancelled) return
        setProduct(productData)
        setSizes(sizesData)
      } catch (e) {
        if (cancelled) return

        if (String(e?.message || "").includes("Product not found")) {
          setNotFound(true)
        } else {
          setError(e)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [productId])

  return { product, sizes, loading, error, notFound }
}
