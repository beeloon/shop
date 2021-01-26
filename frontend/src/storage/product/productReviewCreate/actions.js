import axios from "axios";
import {
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
} from "./constants";

export const createReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({ type: PRODUCT_REVIEW_CREATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
