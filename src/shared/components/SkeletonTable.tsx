export function SkeletonTable() {
  return (
    <div
      className="overflow-x-auto rounded-lg border bg-white shadow-sm animate-pulse dark:border-slate-700 dark:bg-slate-800"
      role="status"
      aria-hidden="true"
    >
      <span className="sr-only">Loading...</span>

      <table className="w-full">
        {/* Header row */}
        <thead>
          <tr className="border-b dark:border-slate-700">
            {Array.from({ length: 5 }, (_, i) => (
              <th key={i} className="px-4 py-3">
                <div className="h-4 w-20 rounded bg-gray-200 dark:bg-slate-700" />
              </th>
            ))}
          </tr>
        </thead>

        {/* Body rows */}
        <tbody>
          {Array.from({ length: 5 }, (_, row) => (
            <tr key={row} className="border-b last:border-b-0 dark:border-slate-700">
              {Array.from({ length: 5 }, (_, col) => (
                <td key={col} className="px-4 py-3">
                  <div
                    className={`h-4 rounded bg-gray-200 dark:bg-slate-700 ${
                      col === 0 ? "w-28" : col === 1 ? "w-32" : "w-16"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
