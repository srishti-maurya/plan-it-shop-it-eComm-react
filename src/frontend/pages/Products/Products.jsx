import "./productsStyles.css";
import "../../styles/style.css";
import React from "react";
import { Nav } from "../../exports";
import { ProductsListing } from "./components/ProductsListing";
import { FiltersListing } from "./components/FiltersListing";

export function Products() {
  return (
    <>
      <Nav />
      <section className="prod-section-container">
        <FiltersListing />
        <ProductsListing />
      </section>
    </>
  );
}
