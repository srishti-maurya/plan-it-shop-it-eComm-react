export function SkeletonOrderCard() {
  return (
    <div
      className="rounded-lg border bg-white p-4 shadow-sm animate-pulse dark:border-slate-700 dark:bg-slate-800"
      role="status"
      aria-hidden="true"
    >
      <span className="sr-only">Loading...</span>

      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-2 border-b pb-3 dark:border-slate-700">
        <div>
          <div className="h-4 w-16 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="mt-1 h-5 w-24 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="h-4 w-28 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-5 w-20 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* Item rows */}
      <div className="mt-4 space-y-3">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="flex gap-3">
            <div className="h-16 w-12 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="flex-1 space-y-1">
              <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />
              <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-slate-700" />
              <div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-slate-700" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer totals */}
      <div className="mt-4 space-y-2 border-t pt-3 dark:border-slate-700">
        <div className="flex justify-between">
          <div className="h-4 w-12 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-8 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-16 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-10 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
        <div className="flex justify-between">
          <div className="h-5 w-12 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-5 w-16 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
