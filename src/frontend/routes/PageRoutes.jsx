import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Products,
  Cart,
  Logout,
  Wishlist,
  Signup,
  NotFound,
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";

export function PageRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
