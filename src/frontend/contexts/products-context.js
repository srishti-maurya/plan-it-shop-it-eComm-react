import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { filterByCategory } from "../utils/filterByCategory";
import { filterByPrice } from "../utils/filterByPrice";
import { filterByRating } from "../utils/filterByRating";
import { sortByPrice } from "../utils/sortByPrice";
import { useData } from "./data-context";

const ProductsContext = () => createContext();

export const useProducts = () => useContext(ProductsContext);

export function ProductsProvider({ children }) {
  const { data } = useData();
  // console.log(data, "products-context");

  const [processedData, setProcessedData] = useState([]);

  const [state, dispatch] = useReducer(reducerFun, {
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
    filterPrice: 500,
    filterBy: "",
  });

  function reducerFun(state, action) {
    switch (action.type) {
      case "HIGH_TO_LOW":
        return { ...state, sortBy: action.type };
      case "LOW_TO_HIGH":
        return { ...state, sortBy: action.type };
      case "FOUR_POINT_FIVE_STARS":
        return { ...state, filterBy: action.type };
      case "FOUR_STARS":
        return { ...state, filterBy: action.type };
      case "THREE_STARS":
        return { ...state, filterBy: action.type };
      case "CONTEMPORARY_FICTION":
        return {
          ...state,
          category: {
            ...state.category,
            CONTEMPORARY_FICTION: !state.category.CONTEMPORARY_FICTION,
          },
        };
      case "SELF_HELP":
        return {
          ...state,
          category: {
            ...state.category,
            SELF_HELP: !state.category.SELF_HELP,
          },
        };
      case "BIOGRAPHIES_AUTOBIOGRAPHIES":
        return {
          ...state,
          category: {
            ...state.category,
            BIOGRAPHIES_AUTOBIOGRAPHIES:
              !state.category.BIOGRAPHIES_AUTOBIOGRAPHIES,
          },
        };
      case "SPIRITUALITY":
        return {
          ...state,
          category: {
            ...state.category,
            SPIRITUALITY: !state.category.SPIRITUALITY,
          },
        };
      case "MYTHOLOGY":
        return {
          ...state,
          category: {
            ...state.category,
            MYTHOLOGY: !state.category.MYTHOLOGY,
          },
        };
      case "ALL_CATEGORY":
        return {
          ...state,
          category: {
            ...state.category,
            ALL_CATEGORY: !state.category.ALL_CATEGORY,
          },
        };
      case "BEST_SELLERS":
        return {
          ...state,
          collections: {
            ...state.collections,
            BEST_SELLERS: !state.collections.BEST_SELLERS,
          },
        };
      case "NEW_RELEASES":
        return {
          ...state,
          collections: {
            ...state.collections,
            NEW_RELEASES: !state.collections.NEW_RELEASES,
          },
        };
      case "EXPERT_PICKS":
        return {
          ...state,
          collections: {
            ...state.collections,
            EXPERT_PICKS: !state.collections.EXPERT_PICKS,
          },
        };
      case "FILTER_BY_PRICE":
        return { ...state, filterPrice: action.payload };
      case "CLEAR":
        return {
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
          filterPrice: 500,
          filterBy: "",
        };
      default:
        return state;
    }
  }

  useEffect(() => {
    if (data !== []) {
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
      const res = filterByRating(filteredDataByPriceData, state.filterRating);
      setProcessedData(res);
    }
  }, [data]);

  // return processedData;
  // console.log("processedData", processedData);
  // }

  return (
    <ProductsContext.Provider value={{ processedData, state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
}
