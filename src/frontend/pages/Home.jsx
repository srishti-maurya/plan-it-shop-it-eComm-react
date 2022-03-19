// components
import { Link } from "react-router-dom";
import { useData } from "../contexts/data-context";
import { Card, Nav } from "../exports";

//images
import {
  coverImage,
  bestSellers,
  newReleases,
  expertPicks,
  contemporaryFiction,
  selfHelp,
  biographies,
  spirituality,
  mythology,
} from "../exports";

function SectionHero() {
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

function SectionCollection() {
  function Category({ image, title }) {
    return (
      <div className="category-wrapper">
        <div className="category-body">
          <img src={image} alt="image" className="img-responsive" />
          <h3 className="text-center">{title}</h3>
        </div>
      </div>
    );
  }
  return (
    <>
      <h2 className="color-text-primary text-3xl text-center pt-1">
        Books collections curated for you
      </h2>
      <div className="category">
        <Category image={bestSellers} title="Bestsellers" />
        <Category image={newReleases} title="New Releases" />
        <Category image={expertPicks} title="Expert picks" />
      </div>
    </>
  );
}

function SectionGenre() {
  function Genre({ image, title }) {
    return (
      <div className="category-wrapper">
        <div className="category-body">
          <img src={image} alt="image" className="img-responsive" />
          <h3 className="text-center mt-05">{title}</h3>
        </div>
      </div>
    );
  }
  return (
    <>
      <h2 className="color-text-primary text-3xl text-center">
        Books in your favourite genre
      </h2>
      <div className="genre-container">
        <Genre image={contemporaryFiction} title="Contemporary Fiction" />
        <Genre image={selfHelp} title="Self Help" />
        <Genre image={biographies} title="Biographies & Autobiographies" />
        <Genre image={spirituality} title="Spirituality" />
        <Genre image={mythology} title="Mythology" />
      </div>
    </>
  );
}

function SectionChoice() {
  const { data } = useData();
  return (
    <>
      <h2 className="color-text-primary text-3xl text-center">
        Plan it's Choice
      </h2>
      <div className="card-wrapper">
        {data
          .slice(0, 5)
          ?.map(
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
    </>
  );
}

export function Home() {
  return (
    <div className="home">
      <Nav />
      <SectionHero />
      <SectionCollection />
      <SectionGenre />
      <SectionChoice />
    </div>
  );
}
