import { useProducts } from "../../../contexts";
import {
  contemporaryFiction,
  selfHelp,
  biographies,
  spirituality,
  mythology,
} from "../../../index";
import { useNavigate } from "react-router-dom";

export function SectionGenre() {
  const { dispatch } = useProducts();
  const navigate = useNavigate();
  function Genre({ image, title, changeType }) {
    return (
      <div
        className="category-wrapper"
        onClick={() => {
          dispatch({ type: changeType });
          navigate("/products");
        }}
      >
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
        <Genre
          image={contemporaryFiction}
          title="Contemporary Fiction"
          changeType="CONTEMPORARY_FICTION"
        />
        <Genre image={selfHelp} title="Self Help" changeType="SELF_HELP" />
        <Genre
          image={biographies}
          title="Biographies & Autobiographies"
          changeType="BIOGRAPHIES_AUTOBIOGRAPHIES"
        />
        <Genre
          image={spirituality}
          title="Spirituality"
          changeType="SPIRITUALITY"
        />
        <Genre image={mythology} title="Mythology" changeType="MYTHOLOGY" />
      </div>
    </>
  );
}
