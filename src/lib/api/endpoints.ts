export const API_BASE_URL = "https://dummyjson.com";

export const PRODUCTS_ENDPOINT = {
  GET_PRODUCTS: `/products`, // GET
  GET_SINGLE_PRODUCT: "/products/:productId", // GET
  SEARCH_PRODUCT: "/products/search?q=:query", // GET
};

export const CATEGORIES_ENDPOINT = {
  GET_ALL_CATEGORIES: "/products/categories", // GET
  GET_PRODUCT_BY_CATEGORY: "/products/category/:categorySlug", // GET
};
