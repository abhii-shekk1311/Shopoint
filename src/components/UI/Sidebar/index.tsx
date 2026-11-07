type SidebarProps = {
  categories: { slug: string; name: string }[];
  brands: string[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  selectedBrands: string[];
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (category: { slug: string; name: string }) => void;
  onBrandChange: (brand: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onPriceApply: () => void;
  onClear: () => void;
  isSidebarOpen: boolean;
};

const Sidebar = ({
  categories,
  brands,
  loading,
  error,
  selectedCategory,
  selectedBrands,
  minPrice,
  maxPrice,
  isSidebarOpen,
  onCategoryChange,
  onBrandChange,
  onMinPriceChange,
  onMaxPriceChange,
  onPriceApply,
  onClear,
}: SidebarProps) => {
  const hasFilters =
    selectedCategory !== "" ||
    selectedBrands.length > 0 ||
    minPrice !== "" ||
    maxPrice !== "";

  const categoryOptions = [{ slug: "", name: "All Categories" }, ...categories];

  const sectionClass = "border-b border-gray-200 py-5 last:border-b-0";

  const headingClass = "mb-4 text-lg font-semibold text-gray-900";

  const optionClass =
    "flex cursor-pointer items-center gap-3 text-base text-gray-700 hover:text-blue-600";

  const checkboxClass = "h-5 w-5 cursor-pointer accent-blue-500";

  const inputClass =
    "min-w-0 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <aside
      className={`sticky top-17 h-fit max-h-screen w-full overflow-y-auto rounded-bl-xl rounded-br-xl md:bg-gray px-4 transition-all duration-300 ease-in-out md:w-70 md:px-6 ${
        isSidebarOpen
          ? "visible translate-x-0 opacity-100"
          : "invisible -translate-x-full opacity-0"
      }`}
      aria-label="Product filters"
      aria-hidden={!isSidebarOpen}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 py-5">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      <section className={sectionClass}>
        <h3 className={headingClass}>Categories</h3>

        {loading ? (
          <p className="text-sm text-gray-500">Loading categories...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : categoryOptions.length === 0 ? (
          <p className="text-sm text-gray-500">No categories available.</p>
        ) : (
          <ul className="space-y-3 max-h-40 overflow-y-auto no-scrollbar">
            {categoryOptions.map((category) => (
              <li key={category?.slug || ""}>
                <label className={optionClass}>
                  <input
                    type="radio"
                    className={checkboxClass}
                    checked={selectedCategory === category?.slug}
                    onChange={() => onCategoryChange(category)}
                  />
                  <span>{category?.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Price Range */}
      <section className={sectionClass}>
        <h3 className={headingClass}>Price Range</h3>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            placeholder="Min"
            aria-label="Minimum price"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className={inputClass}
          />

          <input
            type="number"
            min="0"
            placeholder="Max"
            aria-label="Maximum price"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className={inputClass}
          />
        </div>

        <button
          type="button"
          onClick={onPriceApply}
          className="mt-3 w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-600 active:scale-[0.99]"
        >
          Apply
        </button>
      </section>

      {/* Brands */}
      <section className={sectionClass}>
        <h3 className={headingClass}>Brands</h3>

        {brands.length === 0 ? (
          <p className="text-sm text-gray-500">No brands available.</p>
        ) : (
          <ul className="space-y-3 max-h-40 overflow-y-auto no-scrollbar">
            {brands.map((brand) => (
              <li key={brand}>
                <label className={optionClass}>
                  <input
                    type="checkbox"
                    className={checkboxClass}
                    checked={selectedBrands?.includes(brand)}
                    onChange={() => onBrandChange(brand)}
                  />
                  <span>{brand}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
};

export default Sidebar;
