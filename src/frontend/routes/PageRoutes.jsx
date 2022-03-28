import React from "react";
import MockAPI from "../components/MockAPI";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Products, Cart, Logout, Wishlist } from "../pages";
import { PrivateRoute } from "./PrivateRoute";

export function PageRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mock" element={<MockAPI />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </>
  );
}
