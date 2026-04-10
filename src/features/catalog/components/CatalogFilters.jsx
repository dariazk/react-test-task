import React from "react"

export default function CatalogFilters({
  categories,
  categoryId,
  setCategoryId,
  inStockOnly,
  setInStockOnly,
  query,
  setQuery,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="products-filters">
      <label className="products-filter">
        Категория:{" "}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="all">Все категории</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="products-filter">
        Поиск:{" "}
        <input
          className="products-search-input"
          type="text"
          placeholder="Название товара"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <label className="products-filter">
        Сортировка:{" "}
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Цена: по возрастанию</option>
          <option value="desc">Цена: по убыванию</option>
        </select>
      </label>
      <label className="products-filter products-filter-checkbox">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        />{" "}
        В наличии
      </label>
    </div>
  )
}
