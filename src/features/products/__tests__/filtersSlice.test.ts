import { describe, it, expect } from "vitest";
import {
  filtersReducer,
  setSortBy,
  toggleCategory,
  toggleCollection,
  setRatingFilter,
  setPriceFilter,
  clearFilters,
} from "../filtersSlice";
import type { FilterState } from "@/types";

const initialState: FilterState = {
  sortBy: "",
  category: {
    CONTEMPORARY_FICTION: false,
    SELF_HELP: false,
    BIOGRAPHIES_AUTOBIOGRAPHIES: false,
    SPIRITUALITY: false,
    MYTHOLOGY: false,
    ALL_CATEGORY: false,
  },
  collections: {
    BEST_SELLERS: false,
    NEW_RELEASES: false,
    EXPERT_PICKS: false,
  },
  filterBy: "",
  filterPrice: 500,
  searchTerm: "",
};

describe("filtersSlice", () => {
  it("sets sort direction", () => {
    const state = filtersReducer(initialState, setSortBy("HIGH_TO_LOW"));
    expect(state.sortBy).toBe("HIGH_TO_LOW");
  });

  it("toggles a category flag", () => {
    let state = filtersReducer(initialState, toggleCategory("SELF_HELP"));
    expect(state.category.SELF_HELP).toBe(true);
    state = filtersReducer(state, toggleCategory("SELF_HELP"));
    expect(state.category.SELF_HELP).toBe(false);
  });

  it("toggles a collection flag", () => {
    const state = filtersReducer(initialState, toggleCollection("BEST_SELLERS"));
    expect(state.collections.BEST_SELLERS).toBe(true);
  });

  it("sets rating filter", () => {
    const state = filtersReducer(initialState, setRatingFilter("FOUR_STARS"));
    expect(state.filterBy).toBe("FOUR_STARS");
  });

  it("sets price filter", () => {
    const state = filtersReducer(initialState, setPriceFilter(250));
    expect(state.filterPrice).toBe(250);
  });

  it("clears all filters", () => {
    let state = filtersReducer(initialState, setSortBy("HIGH_TO_LOW"));
    state = filtersReducer(state, toggleCategory("MYTHOLOGY"));
    state = filtersReducer(state, setPriceFilter(200));
    state = filtersReducer(state, clearFilters());
    expect(state).toEqual(initialState);
  });
});
