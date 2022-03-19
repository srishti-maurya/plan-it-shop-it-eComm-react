import {
  HIGH_TO_LOW,
  LOW_TO_HIGH,
  FOUR_POINT_FIVE_STARS,
  FOUR_STARS,
  THREE_STARS,
  FILTER_BY_PRICE,
  CONTEMPORARY_FICTION,
  BIOGRAPHIES_AUTOBIOGRAPHIES,
  SELF_HELP,
  SPIRITUALITY,
  MYTHOLOGY,
  ALL_CATEGORY,
  BEST_SELLERS,
  NEW_RELEASES,
  EXPERT_PICKS,
  CLEAR,
} from "./actions";

export function productsReducer(state, action) {
  switch (action.type) {
    case HIGH_TO_LOW:
      return { ...state, sortBy: action.type };
    case LOW_TO_HIGH:
      return { ...state, sortBy: action.type };
    case FOUR_POINT_FIVE_STARS:
      return { ...state, filterBy: action.type };
    case FOUR_STARS:
      return { ...state, filterBy: action.type };
    case THREE_STARS:
      return { ...state, filterBy: action.type };
    case FILTER_BY_PRICE:
      return { ...state, filterPrice: action.payload };
    case CONTEMPORARY_FICTION:
      return {
        ...state,
        category: {
          ...state.category,
          CONTEMPORARY_FICTION: !state.category.CONTEMPORARY_FICTION,
        },
      };
    case SELF_HELP:
      return {
        ...state,
        category: {
          ...state.category,
          SELF_HELP: !state.category.SELF_HELP,
        },
      };
    case BIOGRAPHIES_AUTOBIOGRAPHIES:
      return {
        ...state,
        category: {
          ...state.category,
          BIOGRAPHIES_AUTOBIOGRAPHIES:
            !state.category.BIOGRAPHIES_AUTOBIOGRAPHIES,
        },
      };
    case SPIRITUALITY:
      return {
        ...state,
        category: {
          ...state.category,
          SPIRITUALITY: !state.category.SPIRITUALITY,
        },
      };
    case MYTHOLOGY:
      return {
        ...state,
        category: {
          ...state.category,
          MYTHOLOGY: !state.category.MYTHOLOGY,
        },
      };
    case ALL_CATEGORY:
      return {
        ...state,
        category: {
          ...state.category,
          ALL_CATEGORY: !state.category.ALL_CATEGORY,
        },
      };
    case BEST_SELLERS:
      return {
        ...state,
        collections: {
          ...state.collections,
          BEST_SELLERS: !state.collections.BEST_SELLERS,
        },
      };
    case NEW_RELEASES:
      return {
        ...state,
        collections: {
          ...state.collections,
          NEW_RELEASES: !state.collections.NEW_RELEASES,
        },
      };
    case EXPERT_PICKS:
      return {
        ...state,
        collections: {
          ...state.collections,
          EXPERT_PICKS: !state.collections.EXPERT_PICKS,
        },
      };
    case CLEAR:
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
        filterBy: "",
        filterPrice: 500,
      };
  }
}
