import { useNavigate } from "react-router-dom";
import { useProducts } from "../../../contexts/index";
import { bestSellers, newReleases, expertPicks } from "../../../index";

export function SectionCollection() {
  const { dispatch } = useProducts();
  function Category({ image, title, changeType }) {
    const navigate = useNavigate();
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
        <Category
          image={bestSellers}
          title="Bestsellers"
          changeType="BEST_SELLERS"
        />
        <Category
          image={newReleases}
          title="New Releases"
          changeType="NEW_RELEASES"
        />
        <Category
          image={expertPicks}
          title="Expert picks"
          changeType="EXPERT_PICKS"
        />
      </div>
    </>
  );
}
