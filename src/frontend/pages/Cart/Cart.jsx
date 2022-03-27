import React, { useEffect } from "react";
import "./cartStyles.css";
import { useCart } from "../../contexts";
import { Nav, emptyCart } from "../../index";
import { HorizontalCard } from "./components/HorizontalCard";
import { CartBill } from "./components/CartBill";

export function Cart() {
  const { cartItems, getCartItems } = useCart();
  useEffect(() => getCartItems(), []);
  return (
    <>
      <div>
        <Nav />
        <h1 className="text-center p-1">My cart</h1>
        {cartItems.length <= 0 ? (
          <div className="empty">
            <img src={emptyCart} alt="empty_cart" />
            <p className="text-center color-text-secondary text-xl py-2">
              Cart is empty
            </p>
          </div>
        ) : (
          <section className="cart-container">
            <div className="cart-card-warpper">
              {cartItems.map((item) => (
                <div key={item.id}>
                  <HorizontalCard item={item} />
                </div>
              ))}
            </div>
            {cartItems.length > 0 && <CartBill />}
          </section>
        )}
      </div>
    </>
  );
}
