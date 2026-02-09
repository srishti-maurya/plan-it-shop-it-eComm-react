import type { Coupon } from "@/types";

export const coupons: Coupon[] = [
  {
    code: "SAVE10",
    type: "percentage",
    value: 10,
    minCartValue: 500,
    description: "10% off on orders above Rs 500",
  },
  {
    code: "FLAT50",
    type: "flat",
    value: 50,
    minCartValue: 300,
    description: "Rs 50 off on orders above Rs 300",
  },
  {
    code: "BOOKS20",
    type: "percentage",
    value: 20,
    minCartValue: 1000,
    description: "20% off on orders above Rs 1000",
  },
  {
    code: "FREEDELIVERY",
    type: "flat",
    value: 99,
    minCartValue: 0,
    description: "Free delivery on any order",
  },
];

export function calcDiscount(coupon: Coupon, cartTotal: number): number {
  if (cartTotal < coupon.minCartValue) return 0;
  if (coupon.type === "percentage") {
    return Math.round((cartTotal * coupon.value) / 100);
  }
  return coupon.value;
}

export function getBestCoupon(
  availableCoupons: Coupon[],
  cartTotal: number
): Coupon | null {
  let best: Coupon | null = null;
  let bestDiscount = 0;
  for (const coupon of availableCoupons) {
    const discount = calcDiscount(coupon, cartTotal);
    if (discount > bestDiscount) {
      bestDiscount = discount;
      best = coupon;
    }
  }
  return best;
}
