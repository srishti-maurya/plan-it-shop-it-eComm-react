export default function Card({
  title,
  image,
  author,
  price,
  prevPrice,
  rating,
}) {
  return (
    <>
      <div className="card-container-vertical">
        <img src={image} alt="card-img" className="img-responsive card-img" />
        <div className="card-body-vertical">
          <div className="card-vertical-section">
            <div className="text-lg font-bold card-heading">{title}</div>
            <div className="text-sm color-text-grey">{author}</div>
            <div className="card-price">
              <span> ₹ {price} </span>
              <span className="price-before text-xs"> ₹{prevPrice} </span>
              <span className="text-base inline-block">{rating}/5</span>
            </div>
            <button className="btn btn-sm">add to cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
