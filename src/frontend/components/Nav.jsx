import React from "react";
import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";
import { logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cart-context";
import { useAuth } from "../contexts/auth-context";

export function Nav() {
  const { isLoggedIn, logoutHandler } = useAuth();
  const navigate = useNavigate();
  const { cartItems } = useCart();

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
            <button className="btn btn-sm primary" onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            <button
              className="btn btn-sm primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          <div>
            <div className="badge-container">
              <FaHeart />
              <div className="badge-icon badge-small color-bg-secondary">0</div>
            </div>
            <div className="badge-container" onClick={() => navigate("/cart")}>
              <FaShoppingCart />
              <div className="badge-icon badge-small color-bg-secondary">
                {cartItems.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
