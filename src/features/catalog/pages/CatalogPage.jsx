import React from "react"
import CatalogFilters from "../components/CatalogFilters"
import CatalogProductCard from "../components/CatalogProductCard"
import { useCatalog } from "../hooks/useCatalog"
import { useCatalogFilters } from "../hooks/useCatalogFilters"
import PageLayout from "../../shared/layouts/PageLayout"

export default function CatalogPage() {
  const { products, categories, loading, error } = useCatalog()
  const { filteredProducts, ...catalogFilters } = useCatalogFilters(products)

  if (loading) {
    return (
      <PageLayout title="Каталог товаров" showCartButton>
        <p>Загрузка каталога…</p>
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout title="Каталог товаров" showCartButton>
        <p>Ошибка загрузки каталога.</p>
      </PageLayout>
    )
  }

  return (
    <PageLayout title="Каталог товаров" showCartButton>
      <CatalogFilters categories={categories} {...catalogFilters} />
      <ul className="products-grid">
        {filteredProducts.map((item) => (
          <CatalogProductCard key={item.id} product={item} />
        ))}
      </ul>

      {filteredProducts.length === 0 ? <p>Товары не найдены.</p> : null}
    </PageLayout>
  )
}
