export function SkeletonProductDetail() {
  return (
    <div
      className="mx-auto max-w-6xl px-4 py-8 animate-pulse"
      role="status"
      aria-hidden="true"
    >
      <span className="sr-only">Loading...</span>

      {/* Back link placeholder */}
      <div className="mb-6 h-5 w-36 rounded bg-gray-200 dark:bg-slate-700" />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Image placeholder */}
        <div className="aspect-[3/4] rounded-lg bg-gray-200 dark:bg-slate-700" />

        {/* Product info */}
        <div className="flex flex-col">
          {/* Title */}
          <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />
          {/* Author */}
          <div className="mt-2 h-5 w-1/3 rounded bg-gray-200 dark:bg-slate-700" />
          {/* Rating */}
          <div className="mt-4 h-5 w-40 rounded bg-gray-200 dark:bg-slate-700" />
          {/* Price row */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-8 w-20 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-5 w-16 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-6 w-20 rounded bg-gray-200 dark:bg-slate-700" />
          </div>
          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <div className="h-12 flex-1 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-12 w-12 rounded bg-gray-200 dark:bg-slate-700" />
          </div>
          {/* Category */}
          <div className="mt-8 border-t pt-6 dark:border-slate-700">
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="mt-2 h-5 w-32 rounded bg-gray-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
