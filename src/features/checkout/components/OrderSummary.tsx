import type { CartItem } from "@/types";

interface PricingData {
  actualPrice: number;
  deliveryCharge: number;
  couponDiscount: number;
  grandTotal: number;
  couponCode: string | null;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  pricing: PricingData;
}

export function OrderSummary({ cartItems, pricing }: OrderSummaryProps) {
  return (
    <div className="rounded-lg border bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-3 font-semibold dark:text-slate-100">Order Summary ({cartItems.length} items)</h3>
      <div className="max-h-60 space-y-2 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between text-sm">
            <span className="flex-1 truncate text-gray-700 dark:text-slate-300">
              {item.title} x {item.qty}
            </span>
            <span className="ml-4 font-medium dark:text-slate-200">
              Rs {Number(item.price) * item.qty}
            </span>
          </div>
        ))}
      </div>
      <hr className="my-3" />
      <div className="space-y-1 text-sm">
        <div className="flex justify-between dark:text-slate-300">
          <span>Subtotal</span>
          <span>{pricing.actualPrice}</span>
        </div>
        <div className="flex justify-between dark:text-slate-300">
          <span>Delivery</span>
          <span>{pricing.deliveryCharge}</span>
        </div>
        {pricing.couponDiscount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>Coupon ({pricing.couponCode})</span>
            <span>-{pricing.couponDiscount}</span>
          </div>
        )}
        <hr className="my-2" />
        <div className="flex justify-between text-base font-semibold dark:text-slate-100">
          <span>Total</span>
          <span>Rs {pricing.grandTotal}</span>
        </div>
      </div>
    </div>
  );
}
