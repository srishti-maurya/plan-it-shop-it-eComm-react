import "./productsStyles.css";
import "../../styles/style.css";
import React from "react";
import { Nav } from "../../index";
import { ProductsListing, FiltersListing } from "./components";

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
