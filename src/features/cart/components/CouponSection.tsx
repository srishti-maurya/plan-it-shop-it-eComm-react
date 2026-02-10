import { useState } from "react";
import { FaTimes, FaChevronDown, FaChevronUp, FaTag } from "react-icons/fa";
import { Button } from "@/shared/ui";
import { coupons, calcDiscount, getBestCoupon } from "../coupons";
import type { Coupon } from "@/types";

interface CouponSectionProps {
  cartTotal: number;
  appliedCoupon: Coupon | null;
  onApply: (coupon: Coupon) => void;
  onRemove: () => void;
}

export function CouponSection({
  cartTotal,
  appliedCoupon,
  onApply,
  onRemove,
}: CouponSectionProps) {
  const [inputCode, setInputCode] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);
  const [error, setError] = useState("");

  const bestCoupon = getBestCoupon(coupons, cartTotal);

  const handleApply = () => {
    setError("");
    const code = inputCode.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code === code);
    if (!coupon) {
      setError("Invalid coupon code");
      return;
    }
    if (cartTotal < coupon.minCartValue) {
      setError(`Minimum cart value of Rs ${coupon.minCartValue} required`);
      return;
    }
    onApply(coupon);
    setInputCode("");
  };

  const handleCouponClick = (coupon: Coupon) => {
    if (cartTotal < coupon.minCartValue) {
      setError(`Minimum cart value of Rs ${coupon.minCartValue} required`);
      return;
    }
    setError("");
    onApply(coupon);
    setInputCode("");
    setShowCoupons(false);
  };

  if (appliedCoupon) {
    return (
      <div className="my-3">
        <div className="flex items-center justify-between rounded-md bg-green-50 px-3 py-2">
          <div className="flex items-center gap-2">
            <FaTag className="text-green-600" />
            <span className="text-sm font-medium text-green-700">
              {appliedCoupon.code}
            </span>
            <span className="text-xs text-green-600">
              (-Rs {calcDiscount(appliedCoupon, cartTotal)})
            </span>
          </div>
          <button
            onClick={onRemove}
            className="text-green-600 hover:text-green-800"
            aria-label="Remove coupon"
          >
            <FaTimes className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputCode}
          onChange={(e) => {
            setInputCode(e.target.value);
            setError("");
          }}
          placeholder="Enter coupon code"
          className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-secondary"
        />
        <Button size="sm" onClick={handleApply} disabled={!inputCode.trim()}>
          Apply
        </Button>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      <button
        onClick={() => setShowCoupons(!showCoupons)}
        className="mt-2 flex items-center gap-1 text-xs text-secondary hover:underline"
      >
        View available coupons
        {showCoupons ? (
          <FaChevronUp className="h-2.5 w-2.5" />
        ) : (
          <FaChevronDown className="h-2.5 w-2.5" />
        )}
      </button>

      {showCoupons && (
        <div className="mt-2 space-y-2">
          {coupons.map((coupon) => {
            const isEligible = cartTotal >= coupon.minCartValue;
            const isBest = bestCoupon?.code === coupon.code;
            return (
              <button
                key={coupon.code}
                onClick={() => handleCouponClick(coupon)}
                disabled={!isEligible}
                className={`w-full rounded border p-2.5 text-left transition-colors ${
                  isEligible
                    ? "cursor-pointer border-gray-200 hover:border-secondary hover:bg-secondary-50"
                    : "cursor-not-allowed border-gray-100 bg-gray-50 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{coupon.code}</span>
                  {isBest && isEligible && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                      Best Value
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-gray-500">
                  {coupon.description}
                </p>
                {isEligible && (
                  <p className="mt-0.5 text-xs font-medium text-green-600">
                    You save Rs {calcDiscount(coupon, cartTotal)}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
