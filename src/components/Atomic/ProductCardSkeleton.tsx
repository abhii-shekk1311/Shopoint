function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-3">
      {/* Image Skeleton */}
      <div className="mb-3 aspect-square animate-pulse rounded-lg bg-gray-200" />

      {/* Title Skeleton */}
      <div className="mb-2 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Product Meta Skeleton */}
      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />

        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
