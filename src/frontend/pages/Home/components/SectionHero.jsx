import { Link } from "react-router-dom";
import { coverImage } from "../../../index";

export function SectionHero() {
  return (
    <div className="hero-section">
      <div className="hero-section-body">
        <p className="text-2xl font-bold">Welcome to</p>
        <p className="text-5xl font-bold pb-1">
          Plan it, <span className="color-text-secondary">Shop it</span>
        </p>
        <p className="color-text-dark text-2xl pb-1">
          Are you planning to read a book? We've got your back! The top book
          collections have been hand-picked for you at the best price.
        </p>
        <button className="btn btn-link btn-shop">
          <Link to="/products"> Shop Now </Link>
        </button>
      </div>
      <img src={coverImage} alt="image" className="img-responsive" />
    </div>
  );
}
