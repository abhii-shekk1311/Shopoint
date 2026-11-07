export function LoaderUI({ label = "Loading..." }: { label?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-3 px-4 py-16 text-sm text-gray-500"
      role="status"
      aria-live="polite"
    >
      <span
        className="size-5.5 animate-spin rounded-full border-[3px] border-gray-200 border-t-blue-600"
        aria-hidden="true"
      />

      <span>{label}</span>
    </div>
  );
}
