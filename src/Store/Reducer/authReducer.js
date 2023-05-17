import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CREATE_USER, LOGIN_USER } from "../../Firebase/APIURL";

const authReducer = createSlice({
    name: "user/auth",
    initialState: {
        isAuth: false,
        VIP: false,
        idToken: "",
        userData: {}
    },
    reducers: {
        authUser: (state, action) => {
            return state
        }
    }

})

export const { authUser } = authReducer.actions
export default authReducer

/* -------------------------------------------------------------------------- */
/*                                  FUNCTION                                  */
/* -------------------------------------------------------------------------- */
//! Create User
export const createUser = (enteredData, switchLogin, onSwitchLoginHandeler, setLoader) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.post(switchLogin ? LOGIN_USER : CREATE_USER, { ...enteredData, returnSecureToken: true })
            console.log(data);
            setLoader(false)
        } catch (error) {
            let message = error.response.data.error.message
            setLoader(false)
            if (message === "EMAIL_EXISTS" || message === "EMAIL_NOT_FOUND") {
                onSwitchLoginHandeler()
            }
        }
    }
}