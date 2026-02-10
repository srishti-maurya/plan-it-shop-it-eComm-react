import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import type { AdminOrder, OrderStatus } from "@/types";

interface OrderTableProps {
  orders: AdminOrder[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const statuses: OrderStatus[] = ["confirmed", "processing", "shipped", "delivered", "cancelled"];

export function OrderTable({ orders, onUpdateStatus }: OrderTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Update Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-mono text-xs text-gray-600">
                {order._id.slice(0, 8)}...
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {order.userName}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {order.items.length} {order.items.length === 1 ? "item" : "items"}
              </td>
              <td className="px-4 py-3 text-gray-600">
                ₹{order.totalAmount.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="px-4 py-3 text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <select
                  value={order.status}
                  onChange={(e) =>
                    onUpdateStatus(order._id, e.target.value as OrderStatus)
                  }
                  className="rounded border border-gray-300 px-2 py-1 text-xs outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && (
        <p className="py-8 text-center text-gray-500">No orders found</p>
      )}
    </div>
  );
}
