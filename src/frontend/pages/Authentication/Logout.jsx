import React from "react";
import { FaCheckCircle, FaCheck } from "react-icons/fa";
import { Nav } from "../../components/Nav";
import { Link } from "react-router-dom";

export function Logout() {
  return (
    <>
      <Nav />
      <section className="auth-container p-5">
        <div className="pb-2 logout-icon-wrapper">
          <FaCheck size={80} />
        </div>

        <div className="alert color-bg-success mb-2">
          <span>
            <FaCheckCircle />
          </span>
          You have successfully logged out
        </div>
        <div className="back-to-home-link">
          <Link to="/" className="nav-links">
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
