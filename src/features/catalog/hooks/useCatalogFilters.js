import { useState } from "react"

export function getMinPrice(product) {
  if (!product.colors?.length) return Infinity
  return Math.min(...product.colors.map((color) => Number(color.price || 0)))
}

export function matchesCategory(item, selectedCategoryId) {
  return (
    selectedCategoryId === "all" ||
    String(item.categoryId) === String(selectedCategoryId)
  )
}

export function productHasAnySizes(product) {
  return product.colors.some((color) => color.sizes.length > 0)
}

export function matchesStock(item, onlyInStock) {
  return !onlyInStock || productHasAnySizes(item)
}

export function matchesSearch(item, searchQuery) {
  return item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
}

export function getFilteredProducts(products, filters) {
  const {
    selectedCategoryId = "all",
    onlyInStock = false,
    searchQuery = "",
    sortOrder = "asc",
  } = filters

  return products
    .filter((item) => {
      return (
        matchesCategory(item, selectedCategoryId) &&
        matchesStock(item, onlyInStock) &&
        matchesSearch(item, searchQuery)
      )
    })
    .sort((a, b) => {
      const aPrice = getMinPrice(a)
      const bPrice = getMinPrice(b)
      return sortOrder === "asc" ? aPrice - bPrice : bPrice - aPrice
    })
}

export function useCatalogFilters(products) {
  const [categoryId, setCategoryId] = useState("all")
  const [inStockOnly, setInStockOnly] = useState(false)
  const [query, setQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")

  const filteredProducts = getFilteredProducts(products, {
    selectedCategoryId: categoryId,
    onlyInStock: inStockOnly,
    searchQuery: query,
    sortOrder,
  })

  return {
    categoryId,
    setCategoryId,
    inStockOnly,
    setInStockOnly,
    query,
    setQuery,
    sortOrder,
    setSortOrder,
    filteredProducts,
  }
}
