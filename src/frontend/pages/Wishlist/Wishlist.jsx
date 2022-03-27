import React, { useEffect } from "react";
import { Card } from "../../components/Card";
import { Nav, emptyWishlist } from "../../index";
import { useWishlist } from "../../contexts";

export function Wishlist() {
  const { wishlistItems, getWishlistItems } = useWishlist();
  useEffect(() => getWishlistItems(), []);
  return (
    <>
      <Nav />
      <h1 className="text-center p-1">My wishlist</h1>
      {wishlistItems.length <= 0 ? (
        <div className="empty">
          <img src={emptyWishlist} alt="empty_wishlist" />
          <p className="text-center color-text-secondary text-xl py-2">
            Wishlist is empty
          </p>
        </div>
      ) : (
        <section>
          <main className="products-list">
            {wishlistItems?.map((item) => (
              <div key={item.id}>
                <Card item={item} />
              </div>
            ))}
          </main>
        </section>
      )}
    </>
  );
}
