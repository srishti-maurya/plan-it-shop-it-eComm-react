import React from "react";
import { useCart } from "../../../contexts";

export function CartBill() {
  const { cartItems } = useCart();

  const priceBeforeDiscount = Math.round(
    cartItems.reduce((acc, curr) => acc + Number(curr.prevPrice * curr.qty), 0)
  );

  const actualPrice = Math.round(
    cartItems.reduce((acc, curr) => acc + Number(curr.price * curr.qty), 0)
  );

  const discountedPrice = priceBeforeDiscount - actualPrice;

  const deliveryCharge = 99;

  const grandTotal = Math.round(actualPrice + deliveryCharge);

  return (
    <>
      <div className="cart-price-details-container">
        <p className="text-2xl font-semibold">Price Details</p>
        <div className="horizontal-div"></div>
        <div className="cart-price-desc">
          <p>Price</p>
          <p> ₹ {actualPrice}</p>
        </div>
        <div className="cart-price-desc">
          <p>Delivery Charge</p>
          <p> ₹ {deliveryCharge}</p>
        </div>
        <div className="horizontal-div"></div>
        <div className="cart-price-desc">
          <p className="text-2xl font-semibold">Total Amount</p>
          <p className="text-2xl font-semibold"> ₹ {grandTotal}</p>
        </div>
        <div className="horizontal-div"></div>
        <p className="pb-1">You saved ₹ {discountedPrice} on this order</p>
        <button className="btn btn-full-width">Place order </button>
      </div>
    </>
  );
}
