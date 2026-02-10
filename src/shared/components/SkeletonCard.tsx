export function SkeletonCard() {
  return (
    <div className="w-60 animate-pulse rounded-lg bg-white p-2 shadow-sm dark:bg-slate-800" aria-hidden="true">
      <div className="mx-auto h-52 rounded bg-gray-200 dark:bg-slate-700" />
      <div className="mt-3 space-y-2 p-3">
        <div className="mx-auto h-4 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />
        <div className="mx-auto h-3 w-1/2 rounded bg-gray-200 dark:bg-slate-700" />
        <div className="mx-auto h-3 w-2/3 rounded bg-gray-200 dark:bg-slate-700" />
        <div className="mx-auto h-8 w-full rounded bg-gray-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}
