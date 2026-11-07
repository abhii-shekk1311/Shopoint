import { useEffect, useMemo, useState } from "react";
import { useFiltersLogic } from "../../../../hooks/useFiltersLogic";
import {
  getAllProductCategories,
  getAllProducts,
  getProductsByCategory,
  type Product,
} from "../../../../lib/api/services/productsService";

export const PAGE_SIZE = 12;

const useProductListing = () => {
  const {
    filters,
    handleSelectCategory,
    handleSelectBrand,
    handleSelectPriceRange,
    handleClearFilters,
    setPage,
  } = useFiltersLogic();

  // Raw data for the current category (never mutated by local filters)
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  const [allCategories, setAllCategories] = useState<
    { slug: string; name: string }[]
  >([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  // Draft price inputs (applied only on "Apply")
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);

  useEffect(() => {
    setMinPrice(filters.minPrice);
    setMaxPrice(filters.maxPrice);
  }, [filters.minPrice, filters.maxPrice]);

  // Categories (once)
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoadingCategories(true);
        setCategoriesError(null);
        const results = await getAllProductCategories();
        if (isMounted) setAllCategories(results || []);
      } catch {
        if (isMounted) {
          setCategoriesError("Failed to fetch categories.");
          setAllCategories([]);
        }
      } finally {
        if (isMounted) setLoadingCategories(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Products: refetch ONLY when the category changes (all products of that category)
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoadingProducts(true);
        setProductsError(null);
        const results = filters.category
          ? await getProductsByCategory(filters.category)
          : await getAllProducts({ limit: 0 });
        if (isMounted) setFetchedProducts(results?.products ?? []);
      } catch {
        if (isMounted) {
          setFetchedProducts([]);
          setProductsError("Failed to fetch products.");
        }
      } finally {
        if (isMounted) setLoadingProducts(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [filters.category]);

  // Brands available in the source list
  const brands = useMemo(() => {
    const set = new Set(
      fetchedProducts
        .map((p) => p.brand)
        .filter((b): b is string => Boolean(b)),
    );
    return [...set].sort();
  }, [fetchedProducts]);

  // Stable array for the selected brands (filters.brands is a new array every render)
  const brandsKey = filters.brands.join(",");
  const selectedBrands = useMemo(
    () => (brandsKey ? brandsKey.split(",") : []),
    [brandsKey],
  );

  // Local filters: brand + price (applied values come from the URL)
  const filteredProducts = useMemo(() => {
    const min = filters.minPrice === "" ? null : Number(filters.minPrice);
    const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);
    const searchText = filters.search.trim().toLowerCase();

    return fetchedProducts.filter((p) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand ?? ""))
        return false;
      if (min !== null && p.price < min) return false;
      if (max !== null && p.price > max) return false;
      if (searchText && !p.title.toLowerCase().includes(searchText))
        return false;
      return true;
    });
  }, [
    fetchedProducts,
    selectedBrands,
    filters.minPrice,
    filters.maxPrice,
    filters.search,
  ]);

  // Pagination: computed from the FILTERED list, page comes from the URL
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );
  const currentPage = Math.min(Math.max(filters.page, 1), totalPages);

  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
    [filteredProducts, currentPage],
  );

  // If the URL page is out of range (e.g. edited manually), correct the URL once data is ready
  useEffect(() => {
    if (!loadingProducts && filters.page > totalPages)
      setPage(totalPages, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProducts, filters.page, totalPages]);

  // Handlers
  const onCategoryChange = (category: { slug: string; name: string }) =>
    handleSelectCategory(category?.slug);

  const onBrandChange = (brand: string) => handleSelectBrand(brand);

  const onPriceApply = () => {
    const min = minPrice === "" ? null : Number(minPrice);
    const max = maxPrice === "" ? null : Number(maxPrice);

    if (
      (min !== null && (!Number.isFinite(min) || min < 0)) ||
      (max !== null && (!Number.isFinite(max) || max < 0)) ||
      (min !== null && max !== null && min > max)
    ) {
      return;
    }
    handleSelectPriceRange(minPrice, maxPrice);
  };

  const onClear = () => {
    setMinPrice("");
    setMaxPrice("");
    handleClearFilters();
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    allCategories,
    loadingCategories,
    categoriesError,

    products: paginatedProducts,
    totalProducts: filteredProducts.length,
    loadingProducts,
    productsError,

    brands,

    selectedCategory: filters.category,
    selectedBrands,

    minPrice,
    maxPrice,
    onMinPriceChange: setMinPrice,
    onMaxPriceChange: setMaxPrice,

    filters,
    onCategoryChange,
    onBrandChange,
    onPriceApply,
    onClear,

    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default useProductListing;
