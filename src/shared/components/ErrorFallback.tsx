import type { FallbackProps } from "react-error-boundary";
import { Button } from "@/shared/ui";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-primary">Something went wrong</h2>
      <p className="max-w-md text-sm text-gray-600">{message}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}
