import { Link } from "react-router-dom";
import type { Product } from "../../lib/api/services/productsService";
import Ratings from "./Ratings";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(value: number): string {
  return currency.format(value);
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product?.id}`}
      state={{ fromListing: true }}
      className="flex flex-col rounded-xl border border-gray-200 bg-white p-3 text-inherit no-underline transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-gray-50">
        <img
          className="block h-full w-full object-contain transition-transform duration-300 hover:scale-105"
          src={product?.thumbnail}
          alt={product?.title}
          loading="lazy"
        />
      </div>

      {/* Product Title */}
      <h3 className="mb-2 line-clamp-2 min-h-[2.6em] text-[0.95rem] font-semibold leading-[1.3] text-gray-900">
        {product?.title || "Product Name"}
      </h3>

      {/* Product Meta */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <span className="text-[1.05rem] font-bold text-gray-900">
          {formatPrice(product?.price)}
        </span>

        <Ratings value={product?.rating} />
      </div>
    </Link>
  );
}

export default ProductCard;
