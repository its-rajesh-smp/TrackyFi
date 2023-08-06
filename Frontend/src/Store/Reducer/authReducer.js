import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  SIGN_IN,
  SIGN_UP,
  GET_USER,
  UPDATE_USER,
  BUY_VIP,
  PAYMENT_CAPTURE,
  PAYMENT_FAILED,
} from "../../API/endpoint";

import { clearExpense } from "./transectionReducer";

import { setVisiblefunc } from "./notificationReducer";

const authReducer = createSlice({
  name: "user/auth",
  initialState: {
    auth: false,
    VIP: false,
  },
  reducers: {
    authUser: (state, action) => {
      state.auth = true;
      Object.assign(state, action.payload);
    },
    updateUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    logoutUser: () => {
      return {
        isAuth: false,
      };
    },
  },
});

export const { authUser, logoutUser, updateUser } = authReducer.actions;
export default authReducer;

/* -------------------------------------------------------------------------- */
/*                                  FUNCTION                                  */
/* -------------------------------------------------------------------------- */
//! Create User
export const createUserfunc = (
  enteredData,
  switchLogin,
  onSwitchLoginHandeler,
  setLoading
) => {
  return async (dispatch, getState) => {
    try {
      // If switchLogin === false means user want to create new account
      if (!switchLogin) {
        // Storing In Database
        const { data: authData } = await axios.post(SIGN_UP, enteredData);

        // In Case Of Error
        if (authData.error) {
          throw new Error(authData.error);
        }

        // Storing idToken in localstorage
        localStorage.setItem("trackfyUser", authData.body.idToken);

        dispatch(authUser(authData.body));
      }
      // Else if switchLogin === true means user want to login
      else {
        // Checking & Getting data From Database
        const { data } = await axios.post(SIGN_IN, enteredData);

        // In Case Of Error
        if (data.error) {
          throw new Error(data.error);
        }

        // Storing idToken in localstorage
        localStorage.setItem("trackfyUser", data.body.idToken);

        // DISPATCHING
        dispatch(authUser(data.body));
      }
    } catch (error) {
      let message = error.message;
      dispatch(setVisiblefunc("error", message));
    }
    setLoading(false);
  };
};

//! Fetch User
export const fetchUsefunc = (setLoading) => {
  return async (dispatch, getState) => {
    try {
      // Getting idToken from localstorage
      const localToken = localStorage.getItem("trackfyUser");

      // If token not present
      if (!localToken) {
        setLoading(false);
        return;
      }

      // Checking & Getting data From Database
      const { data } = await axios.post(GET_USER, { idToken: localToken });

      // In Case Of Error
      if (data.error) {
        throw new Error(data.error);
      }

      // DISPATCHING
      dispatch(authUser(data.body));
    } catch (error) {
      let message = error.message;
      dispatch(setVisiblefunc("error", message));
    }
    setLoading(false);
  };
};

//! VERIFY USER
export const verifyUserfunc = (name, mobile, setLoading) => {
  return async (dispatch, getState) => {
    try {
      const userEmail = getState().authReducer.email;

      //   Updating The name,mobile and verified
      const { data } = await axios.patch(UPDATE_USER, {
        email: userEmail,
        updateFields: { name, mobile, verified: true },
      });

      //   If any Error
      if (data.error) {
        throw new Error(data.error);
      }

      //   DISPATCHING
      dispatch(updateUser(data.body));
    } catch (error) {
      let message = error.message;
      dispatch(setVisiblefunc("error", message));
    }
    setLoading(false);
  };
};

//! LOGOUT USER
export const logoutUserfunc = () => {
  return (dispatch) => {
    localStorage.clear("trackfyUser");
    dispatch(logoutUser());
    dispatch(clearExpense());
  };
};

//! SEND EMAIL VERIFICATION
export const sendEmailVerification = (setLoading) => {
  return async (dispatch, getState) => {};
};

//! UPDATE PROFILE
export const updateProfile = (
  name,
  phone,
  password,
  setLoading,
  setToggleEdit
) => {
  return async (dispatch, getState) => {};
};

//! SEND FORGOT PASSWORD LINK
export const sendForgotPassword = (email, setLoading, setOnForgot) => {
  return async (dispatch, getState) => {};
};

//! PAYMENT
export const buyVip = () => {
  return async (dispatch, getState) => {
    try {
      // Getting idToken from localstorage
      const localToken = localStorage.getItem("trackfyUser");

      // If token not present
      if (!localToken) {
        setLoading(false);
        return;
      }

      //   GENERATING RAZORPAY ORDER FROM BACKEND
      const { data } = await axios.post(BUY_VIP, { idToken: localToken });

      const option = {
        key: data.body.key_id,
        order_id: data.body.orderId,
        handler: async (response) => {
          try {
            const payload = {
              orderId: data.body.orderId,
              paymentId: response.razorpay_payment_id,
              idToken: localToken,
            };

            // STORING PAYMENT ID IN DATABASE WITH STATUS TRUE
            axios.post(PAYMENT_CAPTURE, payload);

            dispatch(updateUser({ VIP: true }));
          } catch (error) {
            // STORING STATUS AS FAILED IN CASE IF PAYMENT IS FAILED
            await axios.patch(PAYMENT_FAILED, { orderId: data.body.orderId });

            let message = error.message;
            dispatch(setVisiblefunc("error", message));
          }
        },
      };

      // SHOWING RAZORPAY MODAL
      const rzp = new Razorpay(option);
      rzp.open();
    } catch (error) {
      let message = error.message;
      dispatch(setVisiblefunc("error", message));
    }
  };
};
