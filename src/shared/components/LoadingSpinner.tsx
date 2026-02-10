export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-secondary dark:border-slate-700 dark:border-t-secondary-400" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
