import { FaStar, FaHeart } from "react-icons/fa";
import { useCart, useWishlist } from "../contexts/index";
import { useNavigate } from "react-router-dom";

export function Card({ item }) {
  const {
    title,
    image,
    author,
    price,
    prevPrice,
    rating,
    bestseller,
    newRelease,
    discount,
    _id,
  } = item;
  const { addToCart, cartItems } = useCart();
  const { wishlistItems, addToWishlist, deleteWishlistItem } = useWishlist();
  const navigate = useNavigate();

  const matchedItem = cartItems.find((element) => {
    return element._id === item._id;
  });

  const inWishlist = wishlistItems.find((element) => {
    return element._id === item._id;
  });

  return (
    <>
      <div className="card-container-vertical">
        <div className="icon-container">
          <div
            className="card-icon"
            onClick={() => {
              inWishlist ? deleteWishlistItem(_id) : addToWishlist(item);
            }}
          >
            <FaHeart style={{ color: inWishlist ? "red" : "" }} />
          </div>
          {bestseller && (
            <div className="card-badge-best-seller text-xs">Best Seller</div>
          )}
          {newRelease && (
            <div className="card-badge-new-releases text-xs">New Release</div>
          )}
        </div>
        <img src={image} alt="card" className="img-responsive card-img" />
        <div className="card-body-vertical">
          <div className="card-vertical-section">
            <div className="text-lg card-heading">{title}</div>
            <div className="text-sm color-text-grey">{author}</div>
            <div className="card-price text-sm">
              <span> ₹ {price} </span>
              <span className="price-before text-xs color-text-grey ">
                ₹{prevPrice}
              </span>
              <span className="color-text-dark-green text-xs">
                (Save {discount}%)
              </span>
              <div className="text-base inline-block rating-wrapper">
                {rating}
                <div className="icon-star">
                  <FaStar />
                </div>
              </div>
            </div>
            <button
              className="btn btn-sm"
              onClick={() => {
                {
                  matchedItem ? navigate("/cart") : addToCart(item);
                }
              }}
            >
              {matchedItem ? "go to cart" : "add to cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
