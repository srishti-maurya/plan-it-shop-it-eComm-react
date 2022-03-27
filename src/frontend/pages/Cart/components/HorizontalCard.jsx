import React from "react";
import { FaStar, FaHeart } from "react-icons/fa";

export function HorizontalCard({ item }) {
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
  } = item;
  return (
    <div>
      <div className="card-container-horizontal">
        <div className="horizontal-card-icon-container">
          <div className="horizontal-card-icon">
            <FaHeart />
          </div>
          {bestseller && (
            <div className="card-badge-best-seller text-xs">Best Seller</div>
          )}
          {newRelease && (
            <div className="card-badge-new-releases text-xs">New Release</div>
          )}
        </div>
        <img
          src={image}
          alt="card"
          className="img-responsive card-horizontal-img"
        />
        <div className="card-horizontal-section">
          <div className="text-lg card-heading">{title}</div>
          <div className="text-sm color-text-grey">{author}</div>
          <div className="card-price padding-bottom-xs">
            <span> ₹ {price} </span>
            <span className="price-before text-xs  color-text-grey ">
              ₹{prevPrice}
            </span>
            <span className="color-text-dark-green text-xs">
              (Save {discount}%)
            </span>
            <span className="text-base inline-block horizontal-card-rating-wrapper">
              <span className="icon-star">
                <FaStar />
              </span>
              {rating}
            </span>
          </div>

          <div className="padding-bottom-xs">
            <p className="inline-block">Quantity</p>
            <span className="cart-total-item">
              <p className="text-lg inline-block color-text-secondary p-05">
                +
              </p>
              <p className="inline-block">1</p>
              <p className="text-2xl inline-block color-text-secondary p-05">
                -
              </p>
            </span>
          </div>
          <div>
            <button className="btn btn-sm">Remove from cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
