import { createContext, useContext, useReducer } from "react";
import { productsReducer } from "../reducers/productsReducer";
import {
  sortByPrice,
  filterByCategory,
  filterByRating,
  filterByPrice,
} from "../utils";
import { useData } from "./index";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

const initialState = {
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
};

export function ProductsProvider({ children }) {
  const { data } = useData();

  const [state, dispatch] = useReducer(productsReducer, initialState);

  const sortedDataByPrice = sortByPrice(data, state.sortBy);

  const filteredDataByCategory = filterByCategory(
    sortedDataByPrice,
    state.category.CONTEMPORARY_FICTION,
    state.category.SELF_HELP,
    state.category.BIOGRAPHIES_AUTOBIOGRAPHIES,
    state.category.SPIRITUALITY,
    state.category.MYTHOLOGY,
    state.category.ALL_CATEGORY,
    state.collections.BEST_SELLERS,
    state.collections.NEW_RELEASES,
    state.collections.EXPERT_PICKS
  );

  const filteredDataByPriceData = filterByPrice(
    filteredDataByCategory,
    state.filterPrice
  );

  const processedData = filterByRating(filteredDataByPriceData, state.filterBy);

  return (
    <ProductsContext.Provider value={{ state, dispatch, processedData }}>
      {children}
    </ProductsContext.Provider>
  );
}
