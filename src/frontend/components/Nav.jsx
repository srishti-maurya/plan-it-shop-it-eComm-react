import React from "react";
import { logo } from "../index";
import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart, useAuth, useWishlist } from "../contexts";

export function Nav() {
  const { isLoggedIn, logoutHandler, navigate } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  return (
    <>
      <div className="navigation-container">
        <div className="navigation-links">
          <Link to="/">
            <img src={logo} alt="logo" className="img-logo" />
          </Link>
          <Link to="/" className="nav-links">
            Home
          </Link>
          <Link to="/products" className="nav-links">
            Products
          </Link>
        </div>
        <button className="navigation-sidebar-toggle">
          <FaBars />
        </button>
        <div className="navigation-tools">
          {isLoggedIn ? (
            <>
              <button className="btn btn-sm primary" onClick={logoutHandler}>
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          <div>
            <div
              className="badge-container"
              onClick={() => navigate("/wishlist")}
            >
              <FaHeart className="cursor-pointer" />
              {isLoggedIn ? (
                <div className="badge-icon badge-small color-bg-secondary">
                  {wishlistItems.length}
                </div>
              ) : null}
            </div>
            <div className="badge-container" onClick={() => navigate("/cart")}>
              <FaShoppingCart className="cursor-pointer" />
              {isLoggedIn ? (
                <div className="badge-icon badge-small color-bg-secondary">
                  {cartItems.length}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
