export function EmptyStateUI({
  title,
  message,
  actionLabel,
  onAction,
  isError = false,
}: {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  isError?: boolean;
}) {
  return (
    <div
      className="rounded-xl border border-gray-200 bg-white px-4 py-12 text-center flex flex-col items-center justify-center w-full h-full"
      role={isError ? "alert" : "status"}
    >
      <h2 className="mb-2 text-[1.15rem] font-semibold text-gray-900">
        {title}
      </h2>

      {message && <p className="mb-4 text-sm text-gray-500">{message}</p>}

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-3 w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-600 active:scale-[0.99]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
