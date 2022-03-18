import React, { useState } from "react";
import { useData } from "../../../contexts/data-context";
import { Card } from "../../../exports";

export default function ProductsListing() {
  const { data } = useData();
  return (
    <div className="card-wrapper">
      {data?.map(
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
