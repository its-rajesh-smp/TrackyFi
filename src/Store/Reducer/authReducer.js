import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CREATE_USER, GET_USER, LOGIN_USER, UPDATE_USER, USERS } from "../../Firebase/APIURL";


const authReducer = createSlice({
    name: "user/auth",
    initialState: {
        isAuth: false,
        VIP: false,
        isVerified: false,
        idToken: "",
        userData: {}
    },
    reducers: {
        authUser: (state, action) => {
            state.isAuth = true
            state.idToken = action.payload.idToken
            state.userData = action.payload
        },
        verifyUser: (state, action) => {
            return { ...state, ...action.payload }
        },
        fetchUser: (state, action) => {
            state.isAuth = true
            state.isVerified = action.payload.userData.isVerified
            state.userData = action.payload.userAuth
            state.idToken = action.payload.idToken
        }
    }

})

export const { authUser, verifyUser, fetchUser } = authReducer.actions
export default authReducer

/* -------------------------------------------------------------------------- */
/*                                  FUNCTION                                  */
/* -------------------------------------------------------------------------- */
//! Create User
export const createUserfunc = (enteredData, switchLogin, onSwitchLoginHandeler, setLoader) => {
    return async (dispatch, getState) => {
        try {
            const { data: authData } = await axios.post(switchLogin ? LOGIN_USER : CREATE_USER, { ...enteredData, returnSecureToken: true })
            localStorage.setItem("trackfyUser", authData.idToken)
            setLoader(false)
            dispatch(authUser(authData))

            // Storing the user in our list as well
            const userEmail = authData.email.replace(".", "").replace("@", "")
            const { data: userData } = await axios.put(`${USERS}/${userEmail}.json`, {
                isVerified: false,
                email: authData.email
            })
            console.log(userData);
        } catch (error) {
            let message = error.response.data.error.message
            alert(message)
            setLoader(false)
            if (message === "EMAIL_EXISTS" || message === "EMAIL_NOT_FOUND") {
                onSwitchLoginHandeler()
            }
        }
    }
}


//! Fetch User
export const fetchUsefunc = (setLoading) => {
    return async (dispatch, getState) => {
        try {
            const localToken = localStorage.getItem("trackfyUser")
            if (localToken === null) { return }
            const { data: authData } = await axios.post(GET_USER, { idToken: localToken })
            const userAuth = authData.users[0]
            const userEmail = userAuth.email.replace(".", "").replace("@", "")
            const { data: userData } = await axios.get(`${USERS}/${userEmail}.json`)
            dispatch(fetchUser({ userAuth: userAuth, userData: userData, idToken: localToken }))
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
}


//! VERIFY USER
export const verifyUserfunc = (name, mobile, setLoading) => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.userData.email.replace(".", "").replace("@", "")
            const { data } = await axios.patch(`${USERS}/${userEmail}.json`, { isVerified: true, userName: name, userMobile: mobile })
            dispatch(verifyUser(data))
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
}

