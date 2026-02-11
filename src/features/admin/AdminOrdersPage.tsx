import { SkeletonTable } from "@/shared/components";
import { OrderTable } from "./components";
import { useAdminOrdersQuery, useAdminUpdateOrderStatus } from "./hooks";
import type { OrderStatus } from "@/types";

export function AdminOrdersPage() {
  const { data: orders = [], isLoading } = useAdminOrdersQuery();
  const updateStatus = useAdminUpdateOrderStatus();

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    updateStatus.mutate({ orderId, status });
  };

  if (isLoading) return (
    <div className="space-y-6">
      <div className="h-8 w-28 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
      <SkeletonTable />
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Orders</h2>
      <OrderTable orders={orders} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
}
