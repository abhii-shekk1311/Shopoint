import { EmptyStateUI } from "../../Atomic/EmptyStateUI";
import ProductCardSkeleton from "../../Atomic/ProductCardSkeleton";
import ProductCard from "../../Atomic/ProductsCard";
import Pagination from "../../UI/Pagination";
import Sidebar from "../../UI/Sidebar";
import useProductListing from "./view/useProductListing";

const ProductListing = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const {
    allCategories,
    loadingCategories,
    categoriesError,
    brands,
    selectedCategory,
    selectedBrands,
    minPrice,
    maxPrice,
    onCategoryChange,
    onBrandChange,
    onMinPriceChange,
    onMaxPriceChange,
    onPriceApply,
    onClear,
    products,
    productsError,
    loadingProducts,
    currentPage,
    totalPages,
    handlePageChange,
  } = useProductListing();

  return (
    <main className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <div
          className={`transition-[width,margin] duration-300 ease-in-out md:shrink-0 md:overflow-x-clip ${
            isSidebarOpen
              ? "w-full md:mr-6 md:w-70"
              : "max-md:hidden md:mr-0 md:w-0"
          }`}
        >
          <Sidebar
            categories={allCategories}
            brands={brands}
            loading={loadingCategories}
            error={categoriesError}
            selectedCategory={selectedCategory}
            selectedBrands={selectedBrands}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCategoryChange={onCategoryChange}
            onBrandChange={onBrandChange}
            onMinPriceChange={onMinPriceChange}
            onMaxPriceChange={onMaxPriceChange}
            onPriceApply={onPriceApply}
            onClear={onClear}
            isSidebarOpen={isSidebarOpen}
          />
        </div>

        {/* Products section */}
        <section className="flex min-w-0 flex-1 flex-col gap-6 py-8">
          <h1 className="text-2xl font-bold mb-4 capitalize">
            {selectedCategory
              ? `${selectedCategory.split("-").join(" ")} `
              : "All "}
            Products
          </h1>
          {loadingProducts ? (
            <div
              className={`grid grid-cols-2 gap-3 xl:grid-cols-4 ${
                isSidebarOpen
                  ? "md:grid-cols-2 lg:grid-cols-3"
                  : "md:grid-cols-3 lg:grid-cols-4"
              }`}
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : productsError ? (
            <EmptyStateUI
              title="Unable to fetch products"
              message="There is some error occured while fetching products. Please try again later."
            />
          ) : products?.length === 0 ? (
            <EmptyStateUI
              title="Product Not Found"
              message="The product you're looking for is not available."
            />
          ) : (
            <div
              className={`grid grid-cols-2 gap-3 xl:grid-cols-4 ${
                isSidebarOpen
                  ? "md:grid-cols-2 lg:grid-cols-3"
                  : "md:grid-cols-3 lg:grid-cols-4"
              }`}
            >
              {products?.map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </div>
          )}

          {products?.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          ) : null}
        </section>
      </div>
    </main>
  );
};

export default ProductListing;
