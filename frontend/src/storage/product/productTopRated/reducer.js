import {
  PRODUCT_TOP_RATED_REQUEST,
  PRODUCT_TOP_RATED_SUCCESS,
  PRODUCT_TOP_RATED_FAIL,
} from "./constants";

export const productTopRated = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_RATED_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_TOP_RATED_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_RATED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
