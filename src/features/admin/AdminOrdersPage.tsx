import { LoadingSpinner } from "@/shared/components";
import { OrderTable } from "./components";
import { useAdminOrdersQuery, useAdminUpdateOrderStatus } from "./hooks";
import type { OrderStatus } from "@/types";

export function AdminOrdersPage() {
  const { data: orders = [], isLoading } = useAdminOrdersQuery();
  const updateStatus = useAdminUpdateOrderStatus();

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    updateStatus.mutate({ orderId, status });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Orders</h2>
      <OrderTable orders={orders} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
}
