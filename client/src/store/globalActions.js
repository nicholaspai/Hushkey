// List of all actions that can be dispatched to redux store
export const TYPES = {
  SET_PAGE: "SET_PAGE"
};

// Page options for main site
export const PAGES = {
  AUTH: 0,
  DASHBOARD: 1
}

export const globalActions = {
  setPage: number => ({
    type: TYPES.SET_PAGE,
    number
  }), 
  // Set Page
};

