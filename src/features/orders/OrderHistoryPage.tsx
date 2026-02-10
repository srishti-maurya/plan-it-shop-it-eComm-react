import { useNavigate } from "react-router-dom";
import { useOrdersQuery } from "./hooks";
import { OrderCard } from "./components/OrderCard";
import { LoadingSpinner } from "@/shared/components";
import { Button, EmptyState } from "@/shared/ui";

export function OrderHistoryPage() {
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useOrdersQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <EmptyState
          title="No orders yet"
          description="You haven't placed any orders yet. Start shopping to see your order history here."
          action={
            <Button onClick={() => navigate("/products")}>
              Browse Products
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold dark:text-slate-100">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
