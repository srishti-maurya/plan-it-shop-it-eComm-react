import {
  contemporaryFiction,
  selfHelp,
  biographies,
  spirituality,
  mythology,
} from "../../../index";

export function SectionGenre() {
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
