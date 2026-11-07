const MAX_RATING = 5;

type RatingProps = {
  value?: number;
};

function Ratings({ value = 0 }: RatingProps) {
  const safeRating = Number.isFinite(value)
    ? Math.min(MAX_RATING, Math.max(0, value))
    : 0;

  const percent = (safeRating / MAX_RATING) * 100;

  return (
    <span
      className="inline-flex items-center gap-1 whitespace-nowrap"
      role="img"
      aria-label={`Rated ${safeRating.toFixed(1)} out of ${MAX_RATING}`}
    >
      {/* Stars */}
      <span
        className="relative inline-block leading-none tracking-[1px] text-gray-300"
        aria-hidden="true"
      >
        ★★★★★
        {/* Filled Stars */}
        <span
          className="absolute inset-y-0 left-0 overflow-hidden text-amber-400"
          style={{ width: `${percent}%` }}
        >
          ★★★★★
        </span>
      </span>

      {/* Rating Value */}
      <span className="text-xs text-gray-500" aria-hidden="true">
        ({safeRating.toFixed(1)})
      </span>
    </span>
  );
}

export default Ratings;
