export function SkeletonKpiCard() {
  return (
    <div role="status" aria-hidden="true">
      <span className="sr-only">Loading...</span>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700" />
                <div className="h-7 w-20 rounded bg-gray-200 dark:bg-slate-700" />
              </div>
              <div className="h-11 w-11 rounded-full bg-gray-200 dark:bg-slate-700" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart placeholders */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2 animate-pulse">
        {Array.from({ length: 2 }, (_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="mb-4 h-5 w-40 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-64 rounded bg-gray-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
