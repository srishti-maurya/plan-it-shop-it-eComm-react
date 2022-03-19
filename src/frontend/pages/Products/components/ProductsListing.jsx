import React from "react";
import { useProducts } from "../../../contexts/products-context";
import { Card } from "../../../exports";

export default function ProductsListing() {
  const { processedData } = useProducts();
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
          discount,
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
              discount={discount}
            />
          </div>
        )
      )}
    </div>
  );
}
