import React from "react";
import { useProducts } from "../../../contexts/index";

export function RadioButton({ checkedType, label }) {
  const { state, dispatch } = useProducts();
  return (
    <div className="pb-05">
      <input
        type="radio"
        id={label}
        value={label}
        name="rating"
        checked={state.filterBy === checkedType}
        onChange={() => dispatch({ type: checkedType })}
      />
      <label className="p-1" htmlFor={label}>
        {label}
      </label>
    </div>
  );
}
