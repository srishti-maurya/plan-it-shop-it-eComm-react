import React from "react";
import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logo } from "../exports";

export function Nav() {
  return (
    <>
      <div className="navigation-container">
        <img src={logo} alt="logo" className="img-logo" />
        <button className="navigation-sidebar-toggle">
          <FaBars />
        </button>
        <div className="navigation-tools">
          <button className="btn btn-sm primary">Login</button>
          <div>
            <div className="badge-container">
              <FaHeart />
              <div className="badge-icon badge-small color-bg-secondary">0</div>
            </div>
            <div className="badge-container">
              <FaShoppingCart />
              <div className="badge-icon badge-small color-bg-secondary">0</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
