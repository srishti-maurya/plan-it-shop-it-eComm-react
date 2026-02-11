export function SkeletonReview() {
  return (
    <div
      className="space-y-3 animate-pulse"
      role="status"
      aria-hidden="true"
    >
      <span className="sr-only">Loading...</span>

      {/* Avatar + name/date row */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-700" />
        <div className="space-y-1">
          <div className="h-4 w-28 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* Star rating placeholder */}
      <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700" />

      {/* Text paragraph lines */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-gray-200 dark:bg-slate-700" />
        <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-slate-700" />
        <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}
