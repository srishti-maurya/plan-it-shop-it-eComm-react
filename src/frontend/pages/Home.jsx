// components
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
    <div class="hero-section">
      <div class="hero-section-body">
        <p class="text-2xl font-bold">Welcome to</p>
        <p class="text-5xl font-bold pb-1">
          Plan it, <span class="color-text-secondary">Shop it</span>
        </p>
        <p class="color-text-dark text-2xl pb-1">
          Are you planning to read a book? We've got your back! The top book
          collections have been hand-picked for you at the best price.
        </p>
        <button class="btn btn-link btn-shop">Shop Now</button>
      </div>
      <img src={coverImage} alt="image" class="img-responsive" />
    </div>
  );
}

function SectionCollection() {
  function Category({ image, title }) {
    return (
      <div class="category-wrapper">
        <div class="category-body">
          <img src={image} alt="image" class="img-responsive" />
          <h3 class="text-center">{title}</h3>
        </div>
      </div>
    );
  }
  return (
    <>
      <h2 class="color-text-primary text-3xl text-center pt-1">
        Books collections curated for you
      </h2>
      <div class="category">
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
      <div class="category-wrapper">
        <div class="category-body">
          <img src={image} alt="image" class="img-responsive" />
          <h3 class="text-center mt-05">{title}</h3>
        </div>
      </div>
    );
  }
  return (
    <>
      <h2 class="color-text-primary text-3xl text-center">
        Books in your favourite genre
      </h2>
      <div class="genre-container">
        <Genre image={contemporaryFiction} title="Contemporary Fiction" />
        <Genre image={selfHelp} title="Self Help" />
        <Genre image={biographies} title="Biographies & Autobiographies" />
        <Genre image={spirituality} title="Spirituality" />
        <Genre image={mythology} title="Mythology" />
      </div>
    </>
  );
}

function SectionChoice({ data }) {
  return (
    <>
      <h2 class="color-text-primary text-3xl text-center">Plan it's Choice</h2>
      <div className="card-wrapper">
        {data
          .slice(0, 5)
          .map(({ title, image, author, price, prevPrice, rating }) => (
            <>
              <Card
                title={title}
                image={image}
                author={author}
                price={price}
                prevPrice={prevPrice}
                rating={rating}
              />
            </>
          ))}
      </div>
    </>
  );
}

export function Home({ data }) {
  return (
    <div className="home">
      <Nav />
      <SectionHero />
      <SectionCollection />
      <SectionGenre />
      <SectionChoice data={data} />
    </div>
  );
}
