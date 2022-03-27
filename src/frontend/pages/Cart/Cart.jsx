import React from "react";
import "./cartStyles.css";
import { useCart } from "../../contexts/index";
import { Nav } from "../../index";
import { HorizontalCard } from "./components/HorizontalCard";

export function Cart() {
  const { cartItems } = useCart();
  return (
    <div>
      <Nav />
      <h1 className="text-center p-1">My cart</h1>
      <section className="cart-container">
        <div className="cart-card-warpper">
          {cartItems.map((item) => (
            <>
              <HorizontalCard item={item} />
            </>
          ))}
        </div>
        <div className="cart-price-details-container">
          <p className="text-2xl font-semibold">Price Details</p>
          <div className="horizontal-div"></div>
          <div className="cart-price-desc">
            <p>Price (2 items)</p>
            <p> ₹ 1000</p>
          </div>
          <div className="cart-price-desc">
            <p>Discount</p>
            <p> - ₹ 500</p>
          </div>
          <div className="cart-price-desc">
            <p>Delivery Charges</p>
            <p> ₹ 199</p>
          </div>
          <div className="horizontal-div"></div>
          <div className="cart-price-desc">
            <p className="text-2xl font-semibold">Total Amount</p>
            <p className="text-2xl font-semibold"> ₹ 699</p>
          </div>
          <div className="horizontal-div"></div>
          <p className="pb-1">You will save ₹ 301 on this order</p>
          <button className="btn btn-full-width">Place order </button>
        </div>
      </section>
    </div>
  );
}
