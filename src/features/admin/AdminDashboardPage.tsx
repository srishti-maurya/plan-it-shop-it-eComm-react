import { useAdminAnalyticsQuery } from "./hooks";
import { KpiCards, OrdersByStatusChart, CategoryDistributionChart } from "./components";
import { SkeletonKpiCard } from "@/shared/components";

export function AdminDashboardPage() {
  const { data, isLoading } = useAdminAnalyticsQuery();

  if (isLoading) return (
    <div className="space-y-8">
      <div className="h-8 w-40 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
      <SkeletonKpiCard />
    </div>
  );
  if (!data) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Dashboard</h2>
      <KpiCards data={data} />
      <div className="grid gap-8 lg:grid-cols-2">
        <OrdersByStatusChart data={data.ordersByStatus} />
        <CategoryDistributionChart data={data.productsByCategory} />
      </div>
    </div>
  );
}
