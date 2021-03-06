import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "./constants";

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

const removeItemFromCart = (state, payload) => ({
  ...state,
  cartItems: state.cartItems.filter((x) => x.product !== payload),
});

export const cart = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return addItemToCart(state, action.payload);
    case CART_REMOVE_ITEM:
      return removeItemFromCart(state, action.payload);
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};
