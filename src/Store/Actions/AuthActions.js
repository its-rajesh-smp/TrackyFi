import axios from "axios";
import {
  PASSWORD_FORGOT,
  USER_GET,
  USER_SIGNIN,
  USER_SIGNUP,
  USER_VERIFY,
} from "../../API/endpoints";
import { authUser, logoutUser, updateUser } from "../Reducer/authReducer";
/* -------------------------------------------------------------------------- */
/*                               CREATE NEW USER                              */
/* -------------------------------------------------------------------------- */
export const signUpAct = (enteredData, setLoader) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(USER_SIGNUP, enteredData);
      dispatch(authUser(data));

      // Storing IdToken
      localStorage.setItem("trackyFi_idtoken", data.idToken);
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };
};

/* -------------------------------------------------------------------------- */
/*                                    LOGIN                                   */
/* -------------------------------------------------------------------------- */
export const signInAct = (enteredData, setLoader) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(USER_SIGNIN, enteredData);

      // Storing IdToken
      localStorage.setItem("trackyFi_idtoken", data.idToken);

      dispatch(authUser(data));
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };
};

/* -------------------------------------------------------------------------- */
/*                                  GET USER                                  */
/* -------------------------------------------------------------------------- */
export const getUserAct = (setLoader) => {
  return async (dispatch) => {
    try {
      const idToken = localStorage.getItem("trackyFi_idtoken");

      // If IdToekn Not Present
      if (!idToken) {
        setLoader(false);
        return;
      }

      const { data } = await axios.get(USER_GET, {
        headers: {
          idToken,
        },
      });
      console.log(data);
      dispatch(authUser(data));
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };
};

/* -------------------------------------------------------------------------- */
/*                                 VERIFY USER                                */
/* -------------------------------------------------------------------------- */
export const verifyUserAct = (enteredData, setLoader) => {
  return async (dispatch) => {
    try {
      const idToken = localStorage.getItem("trackyFi_idtoken");

      // If IdToekn Not Present
      if (!idToken) {
        setLoader(false);
        return;
      }

      const { data } = await axios.post(USER_VERIFY, enteredData, {
        headers: {
          idToken,
        },
      });

      dispatch(updateUser(data));
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };
};

/* -------------------------------------------------------------------------- */
/*                                 LOGOUT USER                                */
/* -------------------------------------------------------------------------- */
export const logoutAct = () => {
  return (dispatch) => {
    localStorage.removeItem("trackyFi_idtoken");
    dispatch(logoutUser());
  };
};

/* -------------------------------------------------------------------------- */
/*                                 FORGOT USER                                */
/* -------------------------------------------------------------------------- */
export const forgotPassAct = async (email, setLoader) => {
  try {
    const { data } = await axios.post(PASSWORD_FORGOT, { email });
  } catch (error) {
    console.log(error);
  }
  setLoader(false);
};
