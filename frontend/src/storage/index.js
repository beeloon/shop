import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { productList } from "./productList/reducer";
import { productDetails } from "./productDetails/reducer";
import { cart } from "./cart/reducer";

const reducer = combineReducers({ productList, productDetails, cart });

const middleware = [thunk];

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initState = {
  cart: { cartItems: cartItemsFromStorage },
};

export const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);
