// components/ProductDetails.tsx
import { useEffect, useState } from "react";
import type { ProductDetailsType } from "../../../lib/api/services/productsService";
import Ratings from "../../Atomic/Ratings";

type ProductDetailsProps = {
  product: ProductDetailsType;
  onBack: () => void;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <p className="text-base text-gray-700">
    <span className="font-semibold text-gray-900">{label}:</span> {value}
  </p>
);

const ProductDetailsCard = ({ product, onBack }: ProductDetailsProps) => {
  const images = product?.images?.length
    ? product?.images
    : [product?.thumbnail];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  // Reset the gallery when navigating to a different product
  useEffect(() => {
    setSelectedImage(images[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  const hasDiscount = product?.discountPercentage > 0;
  const finalPrice = product?.price * (1 - product?.discountPercentage / 100);
  const inStock = product?.stock > 0;

  return (
    <div className="mx-auto max-w-6xl rounded-xl bg-gray-50 p-6">
      <div className="grid gap-8 md:grid-cols-[2fr_3fr]">
        {/* ---------- Left: back + gallery ---------- */}
        <div className="md:sticky md:top-20 md:self-start">
          <button
            type="button"
            onClick={onBack}
            className="mb-4 rounded-lg border cursor-pointer border-gray-200 bg-white px-4 py-2 text-gray-800 shadow-sm hover:bg-gray-100"
          >
            ← Back
          </button>

          <div className="flex items-center justify-center rounded-lg bg-white p-4">
            <img
              src={selectedImage}
              alt={product?.title}
              className="h-80 w-full object-contain"
            />
          </div>

          {/* Only shown when there is more than one image */}
          {images?.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {images?.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={selectedImage === img}
                  className={`h-16 w-16 overflow-hidden rounded-md border-2 cursor-pointer bg-white p-1 ${
                    selectedImage === img
                      ? "border-blue-500"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---------- Right: details ---------- */}
        <div className="md:border-l md:border-gray-200 md:pl-8">
          <h1 className="text-3xl font-bold text-gray-900">{product?.title}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">
              ${finalPrice?.toFixed(2)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ${product?.price?.toFixed(2)}
                </span>
                <span className="rounded bg-green-100 px-2 py-0.5 text-sm font-medium text-green-700">
                  {product?.discountPercentage?.toFixed(0)}% off
                </span>
              </>
            )}
            <Ratings value={product?.rating} />
          </div>

          <div className="mt-4 space-y-2">
            {product?.brand && <Row label="Brand" value={product.brand} />}
            <Row
              label="Category"
              value={<span className="capitalize">{product?.category}</span>}
            />
            <Row
              label="Availability"
              value={
                <span className={inStock ? "text-green-600" : "text-red-600"}>
                  {product?.availabilityStatus}
                  {inStock && ` (${product?.stock} left)`}
                </span>
              }
            />
            <Row
              label="Minimum order"
              value={`${product?.minimumOrderQuantity} units`}
            />
          </div>

          {product?.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <hr className="my-6 border-gray-200" />

          <section>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Description
            </h2>
            <p className="leading-relaxed text-gray-700">
              {product?.description}
            </p>
          </section>

          <hr className="my-6 border-gray-200" />

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Product information
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <Row label="SKU" value={product.sku} />
              <Row label="Weight" value={`${product.weight} g`} />
              <Row
                label="Dimensions"
                value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`}
              />
              <Row label="Warranty" value={product.warrantyInformation} />
              <Row label="Shipping" value={product.shippingInformation} />
              <Row label="Returns" value={product.returnPolicy} />
              <Row label="Barcode" value={product.meta.barcode} />
              <Row
                label="Last updated"
                value={formatDate(product.meta.updatedAt)}
              />
            </div>
            {product.meta.qrCode && (
              <img
                src={product.meta.qrCode}
                alt="Product QR code"
                className="mt-4 h-24 w-24"
              />
            )}
          </section>

          <hr className="my-6 border-gray-200" />

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Reviews{" "}
              {product.reviews.length > 0 && `(${product.reviews.length})`}
            </h2>

            {product.reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <ul className="space-y-5">
                {product.reviews.map((review, index) => (
                  <li key={`${review.reviewerEmail}-${index}`}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-lg font-semibold text-gray-900">
                        {review.reviewerName}
                      </span>
                      <Ratings value={review?.rating} />
                      <span className="text-sm text-gray-400">
                        {formatDate(review.date)}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700">{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
