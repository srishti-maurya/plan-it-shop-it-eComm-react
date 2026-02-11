export function SkeletonCartItem() {
  return (
    <div
      className="flex gap-4 rounded-lg bg-white p-4 shadow-sm animate-pulse dark:bg-slate-800"
      role="status"
      aria-hidden="true"
    >
      <span className="sr-only">Loading...</span>

      {/* Image placeholder */}
      <div className="h-40 w-28 rounded bg-gray-200 dark:bg-slate-700" />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2">
        {/* Title */}
        <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />
        {/* Author */}
        <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-slate-700" />
        {/* Price row */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-14 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-3 w-12 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
        {/* Rating badge */}
        <div className="h-5 w-12 rounded bg-gray-200 dark:bg-slate-700" />
        {/* Quantity controls */}
        <div className="mt-1 h-7 w-28 rounded bg-gray-200 dark:bg-slate-700" />
        {/* Remove button */}
        <div className="mt-1 h-8 w-36 rounded bg-gray-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}
