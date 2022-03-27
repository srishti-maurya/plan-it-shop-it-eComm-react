import React from "react";
import { useProducts } from "../../../contexts/index";

export function Checkbox({ checked, label, changeType }) {
  const { dispatch } = useProducts();

  return (
    <div className="pb-05">
      <input
        type="checkbox"
        id={label}
        value={label}
        checked={checked}
        onChange={() => dispatch({ type: changeType })}
      />
      <label className="p-1" htmlFor="scales">
        {label}
      </label>
    </div>
  );
}
