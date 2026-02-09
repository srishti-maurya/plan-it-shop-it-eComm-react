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
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-3 font-semibold">Order Summary ({cartItems.length} items)</h3>
      <div className="max-h-60 space-y-2 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between text-sm">
            <span className="flex-1 truncate text-gray-700">
              {item.title} x {item.qty}
            </span>
            <span className="ml-4 font-medium">
              Rs {Number(item.price) * item.qty}
            </span>
          </div>
        ))}
      </div>
      <hr className="my-3" />
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{pricing.actualPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{pricing.deliveryCharge}</span>
        </div>
        {pricing.couponDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Coupon ({pricing.couponCode})</span>
            <span>-{pricing.couponDiscount}</span>
          </div>
        )}
        <hr className="my-2" />
        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>Rs {pricing.grandTotal}</span>
        </div>
      </div>
    </div>
  );
}
