import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "./constants";

import { USER_LIST_RESET } from "../../user/userList/constants";
import { USER_DETAILS_RESET } from "../userDetails/constants";
import { USER_REGISTER_RESET } from "../../user/userRegister/constants";
import { ORDER_USER_LIST_RESET } from "../../order/orderUserList/constants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post("/api/users/login", { email, password });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_REGISTER_RESET });
  dispatch({ type: ORDER_USER_LIST_RESET });

  localStorage.removeItem("userInfo");
};
