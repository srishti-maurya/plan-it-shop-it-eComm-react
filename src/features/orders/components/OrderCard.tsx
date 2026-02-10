import type { Order } from "@/types";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b pb-3 dark:border-slate-700">
        <div>
          <p className="text-sm text-gray-500 dark:text-slate-400">Order ID</p>
          <p className="font-mono font-semibold dark:text-slate-200">{order._id.slice(0, 8).toUpperCase()}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-slate-400">{formattedDate}</p>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {order.items.map((item) => (
          <div key={item._id} className="flex gap-3">
            <img
              src={item.image}
              alt={item.title}
              className="h-16 w-12 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium dark:text-slate-200">{item.title}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{item.author}</p>
              <p className="text-sm dark:text-slate-300">
                Rs {item.price} x {item.qty}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t pt-3 dark:border-slate-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-slate-400">Items</span>
          <span className="dark:text-slate-300">{order.items.reduce((sum, item) => sum + item.qty, 0)}</span>
        </div>
        {order.couponDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
            <span>Coupon ({order.couponCode})</span>
            <span>-Rs {order.couponDiscount}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-slate-400">Delivery</span>
          <span className="dark:text-slate-300">{order.deliveryCharge > 0 ? `Rs ${order.deliveryCharge}` : "Free"}</span>
        </div>
        <div className="mt-2 flex justify-between font-semibold dark:text-slate-100">
          <span>Total</span>
          <span>Rs {order.totalAmount}</span>
        </div>
      </div>

      {order.deliveryAddress && (
        <div className="mt-3 border-t pt-3 text-sm dark:border-slate-700">
          <p className="text-gray-500 dark:text-slate-400">Delivering to:</p>
          <p className="font-medium dark:text-slate-200">{order.deliveryAddress.name}</p>
          <p className="text-gray-600 dark:text-slate-400">
            {order.deliveryAddress.street}, {order.deliveryAddress.city},{" "}
            {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
          </p>
        </div>
      )}
    </div>
  );
}
