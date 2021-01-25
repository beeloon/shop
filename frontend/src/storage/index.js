import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { cart } from "./cart/reducer";
import { productList, productDetails } from "./product";
import { orderCreate, orderDetails, orderPay, orderUserList } from "./order";
import {
  userList,
  userLogin,
  userDelete,
  userUpdate,
  userDetails,
  userRegister,
} from "./user";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const reducer = combineReducers({
  cart,
  userList,
  userLogin,
  userDelete,
  userUpdate,
  userDetails,
  userRegister,
  productList,
  productDetails,
  orderPay,
  orderUserList,
  orderCreate,
  orderDetails,
});

const initState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

export const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);
