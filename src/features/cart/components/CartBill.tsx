import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartQuery } from "@/features/cart/hooks";
import { Button } from "@/shared/ui";
import { CouponSection } from "./CouponSection";
import { calcDiscount } from "../coupons";
import type { Coupon } from "@/types";

export function CartBill() {
  const { data: cartItems = [] } = useCartQuery();
  const navigate = useNavigate();
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const priceBeforeDiscount = Math.round(
    cartItems.reduce((acc, curr) => acc + Number(curr.prevPrice) * curr.qty, 0)
  );
  const actualPrice = Math.round(
    cartItems.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
  );
  const discountedPrice = priceBeforeDiscount - actualPrice;
  const deliveryCharge = 99;
  const couponDiscount = appliedCoupon
    ? calcDiscount(appliedCoupon, actualPrice)
    : 0;
  const grandTotal = Math.round(actualPrice + deliveryCharge - couponDiscount);

  const handlePlaceOrder = () => {
    navigate("/checkout", {
      state: {
        cartItems,
        pricing: {
          actualPrice,
          deliveryCharge,
          couponDiscount,
          grandTotal,
          couponCode: appliedCoupon?.code ?? null,
        },
      },
    });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-card">
      <p className="text-xl font-semibold">Price Details</p>
      <hr className="my-3" />
      <div className="flex justify-between py-1">
        <p>Price</p>
        <p>{actualPrice}</p>
      </div>
      <div className="flex justify-between py-1">
        <p>Delivery Charge</p>
        <p>{deliveryCharge}</p>
      </div>
      {couponDiscount > 0 && (
        <div className="flex justify-between py-1 text-green-600">
          <p>Coupon Discount</p>
          <p>-{couponDiscount}</p>
        </div>
      )}
      <hr className="my-3" />
      <div className="flex justify-between py-1 text-lg font-semibold">
        <p>Total Amount</p>
        <p>{grandTotal}</p>
      </div>
      <hr className="my-3" />
      <p className="mb-2 text-sm text-green-700">
        You saved {discountedPrice} on this order
      </p>

      <CouponSection
        cartTotal={actualPrice}
        appliedCoupon={appliedCoupon}
        onApply={setAppliedCoupon}
        onRemove={() => setAppliedCoupon(null)}
      />

      <Button size="full" className="mt-4" onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </div>
  );
}
