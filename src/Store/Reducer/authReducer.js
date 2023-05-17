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
        },
        logoutUser: () => {
            return {
                isAuth: false,
                VIP: false,
                isVerified: false,
                idToken: "",
                userData: {}
            }
        }
    }

})

export const { authUser, verifyUser, fetchUser, logoutUser } = authReducer.actions
export default authReducer

/* -------------------------------------------------------------------------- */
/*                                  FUNCTION                                  */
/* -------------------------------------------------------------------------- */
//! Create User
export const createUserfunc = (enteredData, switchLogin, onSwitchLoginHandeler, setLoader) => {
    return async (dispatch, getState) => {
        try {
            if (!switchLogin) {
                const { data: authData } = await axios.post(CREATE_USER, { ...enteredData, returnSecureToken: true })
                localStorage.setItem("trackfyUser", authData.idToken)
                const userEmail = authData.email.replace(".", "").replace("@", "")
                const { data: userData } = await axios.patch(`${USERS}/${userEmail}.json`, {
                    isVerified: false,
                    email: authData.email
                })
                dispatch(authUser(authData))
                setLoader(false)
            }
            else {
                const { data: authData } = await axios.post(LOGIN_USER, { ...enteredData, returnSecureToken: true })
                localStorage.setItem("trackfyUser", authData.idToken)
                const userEmail = authData.email.replace(".", "").replace("@", "")
                const { data: userData } = await axios.get(`${USERS}/${userEmail}.json`)
                dispatch(authUser(authData))
                dispatch(verifyUser(userData))
                setLoader(false)
            }

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
            if (localToken === null) {
                setLoading(false)
                return
            }
            const { data: authData } = await axios.post(GET_USER, { idToken: localToken })
            const userAuth = authData.users[0]
            const userEmail = userAuth.email.replace(".", "").replace("@", "")
            const { data: userData } = await axios.get(`${USERS}/${userEmail}.json`)
            dispatch(fetchUser({ userAuth: userAuth, userData: userData, idToken: localToken }))
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
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



//! LOGOUT USER
export const logoutUserfunc = () => {
    return (dispatch) => {
        localStorage.clear("trackfyUser")
        dispatch(logoutUser())
    }
}
