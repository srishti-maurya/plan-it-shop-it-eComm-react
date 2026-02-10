import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FilterState, SortDirection, RatingFilter } from "@/types";

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

type CategoryKey = keyof FilterState["category"];
type CollectionKey = keyof FilterState["collections"];

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<SortDirection>) {
      state.sortBy = action.payload;
    },
    toggleCategory(state, action: PayloadAction<CategoryKey>) {
      state.category[action.payload] = !state.category[action.payload];
    },
    toggleCollection(state, action: PayloadAction<CollectionKey>) {
      state.collections[action.payload] = !state.collections[action.payload];
    },
    setRatingFilter(state, action: PayloadAction<RatingFilter>) {
      state.filterBy = action.payload;
    },
    setPriceFilter(state, action: PayloadAction<number>) {
      state.filterPrice = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    clearFilters() {
      return initialState;
    },
  },
});

export const {
  setSortBy,
  toggleCategory,
  toggleCollection,
  setRatingFilter,
  setPriceFilter,
  setSearchTerm,
  clearFilters,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
