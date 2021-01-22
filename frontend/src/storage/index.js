import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { productList } from "./productList/reducer";
import { productDetails } from "./productDetails/reducer";

const reducer = combineReducers({ productList, productDetails });

const middleware = [thunk];

const initState = {};

export const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);
