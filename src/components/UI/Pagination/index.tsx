type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  initialPageCount?: number;
  siblingCount?: number;
  showPrevNext?: boolean;
  className?: string;
};

type PaginationItem = number | "start-ellipsis" | "end-ellipsis";

function getPaginationItems(
  currentPage: number,
  totalPages: number,
  initialPageCount: number,
  siblingCount: number,
): PaginationItem[] {
  if (totalPages <= initialPageCount + 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Beginning: 1, 2, 3, 4, 5, ..., last
  if (currentPage < 4) {
    return [
      ...Array.from({ length: initialPageCount }, (_, i) => i + 1),
      "end-ellipsis",
      totalPages,
    ];
  }

  // Ending: 1, ..., last-4, last-3, last-2, last-1, last
  if (currentPage > totalPages - 4) {
    return [
      1,
      "start-ellipsis",
      ...Array.from(
        { length: initialPageCount },
        (_, i) => totalPages - initialPageCount + 1 + i,
      ),
    ];
  }

  // Middle: 1, ..., current-1, current, current+1, ..., last
  return [
    1,
    "start-ellipsis",
    ...Array.from(
      { length: siblingCount * 2 + 1 },
      (_, i) => currentPage - siblingCount + i,
    ),
    "end-ellipsis",
    totalPages,
  ];
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  initialPageCount = 5,
  siblingCount = 1,
  showPrevNext = true,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginationItems = getPaginationItems(
    safeCurrentPage,
    totalPages,
    initialPageCount,
    siblingCount,
  );

  const handlePageChange = (page: number) => {
    if (page === safeCurrentPage) return;
    if (page < 1 || page > totalPages) return;

    onPageChange(page);
  };

  const buttonClass =
    "flex h-6 w-6 md:h-9 md:min-w-9 items-center cursor-pointer justify-center rounded-lg border text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      aria-label="Pagination"
      className={`flex flex-wrap items-center justify-center gap-2 ${className}`}
    >
      {showPrevNext && (
        <button
          type="button"
          disabled={safeCurrentPage === 1}
          onClick={() => handlePageChange(safeCurrentPage - 1)}
          className={`${buttonClass} border-gray-200 bg-white text-gray-700 hover:bg-gray-100 px-3 cursor-pointer`}
          aria-label="Previous page"
        >
          &larr;
        </button>
      )}

      {paginationItems.map((item, index) => {
        if (typeof item !== "number") {
          return (
            <span
              key={`${item}-${index}`}
              className="flex w-6 h-6 md:h-9 md:w-9 items-center justify-center text-gray-500"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const isActive = item === safeCurrentPage;

        return (
          <button
            key={item}
            type="button"
            onClick={() => handlePageChange(item)}
            aria-label={`Page ${item}`}
            aria-current={isActive ? "page" : undefined}
            className={`${buttonClass} ${
              isActive
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        );
      })}

      {showPrevNext && (
        <button
          type="button"
          disabled={safeCurrentPage === totalPages}
          onClick={() => handlePageChange(safeCurrentPage + 1)}
          className={`${buttonClass} border-gray-200 bg-white text-gray-700 hover:bg-gray-100 px-3 cursor-pointer`}
          aria-label="Next page"
        >
          &rarr;
        </button>
      )}
    </nav>
  );
}

export default Pagination;
