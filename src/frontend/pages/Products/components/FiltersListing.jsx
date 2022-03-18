import React from "react";
// import { useProducts } from "../../../contexts/products-context.js";

function Checkbox({ checked, label, changeType }) {
  // const { dispatch } = useProducts();
  return (
    <div className="pb-05">
      <input
        type="checkbox"
        id={label}
        value={label}
        // checked={checked}
        // onChange={() => dispatch({ type: changeType })}
      />
      <label className="p-1" htmlFor="scales">
        {label}
      </label>
    </div>
  );
}

function RadioButton({ checkedType, label }) {
  // const { state, dispatch } = useProducts();

  return (
    <div className="pb-05">
      <input
        type="radio"
        id={label}
        value={label}
        name="rating"
        // checked={state.sortBy === checkedType}
        // onChange={() => dispatch({ type: checkedType })}
      />
      <label className="p-1" htmlFor={label}>
        {label}
      </label>
    </div>
  );
}

export default function FiltersListing() {
  // const { state, dispatch } = useProducts();
  return (
    <aside className="p-1">
      <div className="filter-section-header">
        <h2 className="color-text-primary text-xl inline-block">Filters</h2>
        <button
          className="btn color-secondary-outline btn-sm"
          // onClick={() => dispatch({ type: "CLEAR" })}
        >
          clear
        </button>
      </div>

      <div className="horizontal-div"></div>

      <h2 className="color-text-primary text-xl pb-1">Price</h2>
      <div className="slider">
        <input
          type="range"
          list="steplist"
          min="100"
          max="500"
          step="50"
          // value={state.filterPrice}
          // onChange={(e) =>
          //   dispatch({ type: "FILTER_BY_PRICE", payload: e.target.value })
          // }
        />
        <datalist id="steplist">
          <option value="100" label="0"></option>
          <option value="150"></option>
          <option value="200"></option>
          <option value="250"></option>
          <option value="300"></option>
          <option value="350"></option>
          <option value="400"></option>
          <option value="450"></option>
          <option value="500"></option>
        </datalist>
      </div>
      <div className="slider-range pb-1">
        <div>150</div>
        <div>300</div>
        <div>450</div>
      </div>

      <div className="horizontal-div"></div>

      <h2 className="color-text-primary text-xl pb-1">Category</h2>
      <Checkbox
        // checked={state.category.ALL_CATEGORY}
        label="All"
        // changeType="ALL_CATEGORY"
      />
      <Checkbox
        // checked={state.category.CONTEMPORARY_FICTION}
        label="Contemporary Fiction"
        // changeType="CONTEMPORARY_FICTION"
      />
      <Checkbox
        // checked={state.category.SELF_HELP}
        label="Self Help"
        // changeType="SELF_HELP"
      />
      <Checkbox
        // checked={state.category.SPIRITUALITY}
        label="Spirituality"
        // changeType="SPIRITUALITY"
      />
      <Checkbox
        // checked={state.category.BIOGRAPHIES_AUTOBIOGRAPHIES}
        label="Biographies"
        // changeType="BIOGRAPHIES_AUTOBIOGRAPHIES"
      />
      <Checkbox
        // checked={state.category.MYTHOLOGY}
        label="Mythology"
        // changeType="MYTHOLOGY"
      />

      <div className="horizontal-div"></div>

      <h2 className="color-text-primary text-xl pb-1">Rating</h2>
      <RadioButton
        // checked={false}
        label={`4.5 Stars & above`}
        // checkedType="FOUR_POINT_FIVE_STARS"
      />
      <RadioButton
        // checked={false}
        label={`4 Stars & above`}
        // checkedType="FOUR_STARS"
      />
      <RadioButton
        // checked={false}
        label={`3 Stars & above`}
        // checkedType="THREE_STARS"
      />

      <div className="horizontal-div"></div>

      <h2 className="color-text-primary text-xl pb-1">Sort by</h2>
      <div className="pb-05">
        <input
          type="radio"
          id="low"
          value="low"
          name="price"
          // checked={state.sortBy === "LOW_TO_HIGH"}
          // onChange={() => dispatch({ type: "LOW_TO_HIGH" })}
        />
        <label className="p-1" htmlFor="low">
          Price - Low to High
        </label>
      </div>
      <div className="pb-05">
        <input
          type="radio"
          id="high"
          value="high"
          name="price"
          // checked={state.sortBy === "HIGH_TO_LOW"}
          // onChange={() => dispatch({ type: "HIGH_TO_LOW" })}
        />
        <label className="p-1" htmlFor="high">
          Price - High to Low
        </label>
      </div>

      <div className="horizontal-div"></div>

      <h2 className="color-text-primary text-xl pb-1">Collections</h2>
      <Checkbox
        // checked={state.bestseller}
        label="Best Sellers"
        // changeType="BEST_SELLERS"
      />
      <Checkbox
        // checked={state.newRelease}
        label="New Releases"
        // changeType="NEW_RELEASES"
      />
      <Checkbox
        // checked={state.expertPick}
        label="Expert Picks"
        // changeType="EXPERT_PICKS"
      />
    </aside>
  );
}
