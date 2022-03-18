import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
// import { useProducts } from "../contexts/products-context";

export function Card({
  title,
  image,
  author,
  price,
  prevPrice,
  rating,
  bestseller,
  newRelease,
}) {
  return (
    <>
      <div className="card-container-vertical">
        <div className="icon-container">
          <div className="card-icon">
            <FaHeart />
          </div>
          {bestseller && (
            <div className="card-badge-best-seller text-xs">Best Seller</div>
          )}
          {newRelease && (
            <div className="card-badge-new-releases text-xs">New Release</div>
          )}
        </div>
        <img src={image} alt="card-img" className="img-responsive card-img" />
        <div className="card-body-vertical">
          <div className="card-vertical-section">
            <div
              className="text-lg card-he
            ading"
            >
              {title}
            </div>
            <div className="text-sm color-text-grey">{author}</div>
            <div className="card-price text-sm">
              <span> ₹ {price} </span>
              <span className="price-before text-xs color-text-grey ">
                ₹{prevPrice}
              </span>
              <div className="text-base inline-block rating-wrapper">
                {rating}
                <div className="icon-star">
                  <FaStar />
                </div>
              </div>
            </div>
            <button className="btn btn-sm">
              <FaShoppingCart /> add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
