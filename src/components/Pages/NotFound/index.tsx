import { EmptyStateUI } from "../../Atomic/EmptyStateUI";

export function NotFoundPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <EmptyStateUI
        title="Page not found"
        message="The page you are looking for does not exist."
        actionLabel="Go back home"
        onAction={() => (window.location.href = "/")}
      />
    </main>
  );
}
