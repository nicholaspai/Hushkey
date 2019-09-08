import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger"; // Debuggin: prints redux actions to console

// Redux Reducers to add to global state
import { global } from "./globalReducers";


// Add all reducers here to aggregate into one store
const rootReducer = combineReducers({
  global
});

// Import store from createStore() => store
export default createStore(rootReducer, {}, applyMiddleware(logger, thunk));
