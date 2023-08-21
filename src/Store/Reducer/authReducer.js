import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AUTH_DETAILS,
  CREATE_USER,
  FETCH_PAYMENT,
  GET_USER,
  LOGIN_USER,
  PASSWORD_RESET,
  SEND_VERIFY_LINK,
  UPDATE_USER,
  USERS,
} from "../../Firebase/APIURL";
import { clearExpense } from "./transectionReducer";

const authReducer = createSlice({
  name: "user/auth",
  initialState: {
    isAuth: false,
    isVerified: false,
  },
  reducers: {
    authUser: (state, action) => {
      state.isAuth = true;
      Object.assign(state, action.payload);
    },
    fetchUser: (state, action) => {
      Object.assign(state, action.payload);
      state.isAuth = true;
    },
    updateUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    logoutUser: () => {
      return {
        isAuth: false,
        isVerified: false,
      };
    },
  },
});

export const { authUser, fetchUser, logoutUser, updateUser } =
  authReducer.actions;
export default authReducer;

/* -------------------------------------------------------------------------- */
/*                                  FUNCTION                                  */
/* -------------------------------------------------------------------------- */

//! SEND EMAIL VERIFICATION
export const sendEmailVerification = (setLoader) => {};

//! UPDATE PROFILE
export const updateProfile = (
  name,
  phone,
  password,
  setLoader,
  setToggleEdit
) => {
  return async (dispatch, getState) => {};
};

//! SEND FORGOT PASSWORD LINK
export const sendForgotPassword = (email, setLoader, setOnForgot) => {
  return async (dispatch, getState) => {};
};

//! FETCH PAYMENT
export const fetchPayment = (paymentCode) => {
  return async (dispatch, getState) => {};
};
