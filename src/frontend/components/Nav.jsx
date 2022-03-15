import React from "react";
import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";
import { logo } from "../exports";

export function Nav() {
  return (
    <>
      <div class="navigation-container">
        <img src={logo} alt="logo" className="img-logo" />
        <button class="navigation-sidebar-toggle">
          <FaBars />
        </button>
        <div class="navigation-tools">
          <button class="btn btn-sm primary">Login</button>
          <div>
            <div class="badge-container">
              <FaHeart />
              <div class="badge-icon badge-small color-bg-secondary">0</div>
            </div>
            <div class="badge-container">
              <FaShoppingCart />
              <div class="badge-icon badge-small color-bg-secondary">0</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
