import axios from "axios";
import {
  ORDER_USER_LIST_REQUEST,
  ORDER_USER_LIST_SUCCESS,
  ORDER_USER_LIST_FAIL,
} from "./constants";

export const listUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_USER_LIST_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
