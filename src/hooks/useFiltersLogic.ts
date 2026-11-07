import { useSearchParams } from "react-router-dom";

export interface Filters {
  category: string;
  brands: string[];
  minPrice: string;
  maxPrice: string;
  search: string;
  page: number;
}

export function useFiltersLogic() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramPage = Number(searchParams.get("page"));

  const filters: Filters = {
    category: searchParams.get("category") || "",
    brands: searchParams.get("brand")?.split(",") || [],
    minPrice: searchParams.get("min") || "",
    maxPrice: searchParams.get("max") || "",
    search: searchParams.get("q") || "",
    page: Number.isInteger(paramPage) && paramPage > 1 ? paramPage : 1,
  };

  // Accept partial filter updates
  const updateSearchParams = (changes: Partial<Filters>) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);

        const keyMapping: Record<keyof Filters, string> = {
          category: "category",
          brands: "brand",
          minPrice: "min",
          maxPrice: "max",
          search: "q",
          page: "page",
        };

        Object.entries(changes).forEach(([key, value]) => {
          const paramKey = keyMapping[key as keyof Filters];

          params.delete(paramKey);

          if (Array.isArray(value)) {
            const selectedValues = value
              .map((item) => item.trim())
              .filter(Boolean);

            if (selectedValues.length > 0) {
              params.set(paramKey, selectedValues.join(","));
            }
          } else if (typeof value === "string") {
            const trimmedValue = value.trim();

            if (trimmedValue) {
              params.set(paramKey, trimmedValue);
            }
          } else if (value !== null && value !== undefined) {
            params.set(paramKey, String(value));
          }
        });

        // Any filter change resets pagination
        if (!("page" in changes)) {
          params.delete("page");
        }

        return params;
      },
      { replace: true },
    );
  };

  const handleSelectCategory = (category: string) => {
    updateSearchParams({ category, brands: [] });
  };

  const handleSelectBrand = (brand: string) => {
    const selected = filters.brands.includes(brand)
      ? filters.brands.filter((item) => item !== brand)
      : [...filters.brands, brand];

    updateSearchParams({ brands: selected });
  };

  const handleSelectPriceRange = (min: string, max: string) => {
    updateSearchParams({ minPrice: min, maxPrice: max });
  };

  const handleClearFilters = () => {
    updateSearchParams({
      category: "",
      brands: [],
      minPrice: "",
      maxPrice: "",
      search: "",
    });
  };

  const setPage = (page: number, replace = false) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);

        if (Number.isInteger(page) && page > 1) {
          params.set("page", String(page));
        } else {
          params.delete("page");
        }

        return params;
      },
      { replace },
    );
  };

  return {
    filters,
    handleSelectCategory,
    handleSelectBrand,
    handleSelectPriceRange,
    handleClearFilters,
    setPage,
  };
}
