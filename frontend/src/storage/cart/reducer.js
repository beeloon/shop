import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./constants";

const addItemToCart = (state, payload) => {
  const item = payload;
  const existItem = state.cartItems.find((x) => x.product === item.product);

  if (existItem)
    return {
      ...state,
      cartItems: state.cartItems.map((x) =>
        x.product === existItem.product ? item : x
      ),
    };
  else return { ...state, cartItems: [...state.cartItems, item] };
};

export const cart = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return addItemToCart(state, action.payload);
    case CART_REMOVE_ITEM:
      return { loading: false, product: action.payload };
    default:
      return state;
  }
};
