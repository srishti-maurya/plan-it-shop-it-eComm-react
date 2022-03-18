import React, { useState } from "react";
import { useData } from "../../../contexts/data-context";
import { useProducts } from "../../../contexts/products-context";
import { Card } from "../../../exports";

export function ProductsListing() {
  // const { processedData } = useProducts();
  const { processedData } = useProducts();
  console.log(processedData, "from lisiting");
  return (
    <div className="card-wrapper">
      {processedData?.map(
        ({
          title,
          image,
          author,
          price,
          prevPrice,
          rating,
          _id,
          bestseller,
          newRelease,
        }) => (
          <div key={_id}>
            <Card
              title={title}
              image={image}
              author={author}
              price={price}
              prevPrice={prevPrice}
              rating={rating}
              bestseller={bestseller}
              newRelease={newRelease}
            />
          </div>
        )
      )}
    </div>
  );
}
