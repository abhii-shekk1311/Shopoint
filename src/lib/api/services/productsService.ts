import { apiClient } from "../apiClient";
import { CATEGORIES_ENDPOINT, PRODUCTS_ENDPOINT } from "../endpoints";

type GetProductsParams = {
  limit: number;
};

// types or productsService
export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail?: string;
};

export type ProductDetailsType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
  reviews?: Review[];
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

// GET ALL PRODUCTS
export const getAllProducts = async ({
  limit = 0,
}: GetProductsParams): Promise<ProductsResponse> => {
  try {
    const params = new URLSearchParams({
      limit: String(limit),
    });
    const response = await apiClient.get<ProductsResponse>(
      PRODUCTS_ENDPOINT.GET_PRODUCTS + `?${params}`,
    );
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return Promise.reject(error);
  }
};

// GET SNGLE PRODUCT DETAILS THROUH ID
export const getSingleProductDetails = async (
  productId: string,
): Promise<ProductDetailsType> => {
  try {
    const response = await apiClient.get<ProductDetailsType>(
      PRODUCTS_ENDPOINT.GET_SINGLE_PRODUCT.replace(
        ":productId",
        encodeURIComponent(productId),
      ),
    );
    return response;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    return Promise.reject(error);
  }
};

// SEARCH PRODUCTS WITH SEARCH QUERY
export const searchProducts = async (
  query: string,
): Promise<ProductsResponse> => {
  try {
    const response = await apiClient.get<ProductsResponse>(
      PRODUCTS_ENDPOINT.SEARCH_PRODUCT.replace(
        ":query",
        encodeURIComponent(query),
      ),
    );
    return response;
  } catch (error) {
    console.error(`Error searching products with query "${query}":`, error);
    return Promise.reject(error);
  }
};

// GET ALL PRODUCT CATEGORIES
export const getAllProductCategories = async (): Promise<
  { slug: string; name: string }[]
> => {
  try {
    const response = await apiClient.get<{ slug: string; name: string }[]>(
      CATEGORIES_ENDPOINT.GET_ALL_CATEGORIES,
    );
    return response;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return Promise.reject(error);
  }
};

// GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async (
  categorySlug: string,
): Promise<ProductsResponse> => {
  try {
    const response = await apiClient.get<ProductsResponse>(
      CATEGORIES_ENDPOINT.GET_PRODUCT_BY_CATEGORY.replace(
        ":categorySlug",
        encodeURIComponent(categorySlug),
      ),
    );
    return response;
  } catch (error) {
    console.error(
      `Error fetching products for category "${categorySlug}":`,
      error,
    );
    return Promise.reject(error);
  }
};
