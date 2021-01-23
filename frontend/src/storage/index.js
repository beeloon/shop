import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { cart } from "./cart/reducer";
import { userLogin } from "./user/reducer";
import { userRegister } from "./userRegister/reducer";
import { userDetails } from "./userDetails/reducer";
import { productList } from "./productList/reducer";
import { productDetails } from "./productDetails/reducer";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const reducer = combineReducers({
  cart,
  userLogin,
  userDetails,
  userRegister,
  productList,
  productDetails,
});

const initState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

export const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);
