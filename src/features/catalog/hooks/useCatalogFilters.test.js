import { getFilteredProducts } from "./useCatalogFilters"

const products = [
  {
    id: 1,
    name: "Футболка",
    categoryId: 1,
    colors: [
      { price: "200.00", sizes: [1] },
      { price: "150.00", sizes: [] },
    ],
  },
  {
    id: 2,
    name: "Шорты",
    categoryId: 2,
    colors: [{ price: "99.00", sizes: [] }],
  },
  {
    id: 3,
    name: "Худи",
    categoryId: 1,
    colors: [{ price: "300.00", sizes: [2, 3] }],
  },
]

describe("getFilteredProducts", () => {
  it("filters by category, in-stock and search then sorts by min price asc", () => {
    const result = getFilteredProducts(products, {
      selectedCategoryId: "1",
      onlyInStock: true,
      searchQuery: "у",
      sortOrder: "asc",
    })

    expect(result.map((item) => item.id)).toEqual([1, 3])
  })
})
