import {
  ORDER_USER_LIST_REQUEST,
  ORDER_USER_LIST_SUCCESS,
  ORDER_USER_LIST_FAIL,
} from "./constants";

export const orderUserList = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_USER_LIST_REQUEST:
      return { loading: true };
    case ORDER_USER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
