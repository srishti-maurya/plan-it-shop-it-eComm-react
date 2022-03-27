import React from "react";
import { useProducts } from "../../../contexts/index";
import { Card } from "../../../index.js";

export function ProductsListing() {
  const { processedData } = useProducts();
  return (
    <>
      <div className="card-wrapper">
        {processedData?.map((item) => (
          <div key={item._id}>
            <Card item={item} />
          </div>
        ))}
      </div>
    </>
  );
}
