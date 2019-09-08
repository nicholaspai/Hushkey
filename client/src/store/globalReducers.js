import { TYPES, PAGES } from "./globalActions";

// Initial state
export const initialState = {
  global: {
    page: PAGES.AUTH
  },
};

// Global app state
export const global = (state = initialState.global, action) => {
  switch (action.type) {
    case TYPES.SET_PAGE:
      return Object.assign({}, state, {
        page: action.number
      });
    default:
      return state;
  }
};

