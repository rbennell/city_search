import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducer";

import thunk from "redux-thunk";
import initialState from "./initialState";

const middlewares = [thunk];

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
);
