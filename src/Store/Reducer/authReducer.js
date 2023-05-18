import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CREATE_USER, GET_USER, LOGIN_USER, UPDATE_USER, USERS } from "../../Firebase/APIURL";
import { fetchExpense } from "./transectionReducer";
import { fetchTotal } from "./totalReducer";



const authReducer = createSlice({
    name: "user/auth",
    initialState: {

        isAuth: false,
        isVerified: false,

    },
    reducers: {
        authUser: (state, action) => {
            state.isAuth = true
            Object.assign(state, action.payload)
        },
        verifyUser: (state, action) => {
            Object.assign(state, action.payload)

        },
        fetchUser: (state, action) => {
            Object.assign(state, action.payload)
            state.isAuth = true

        },
        logoutUser: () => {
            return {
                isAuth: false,
                isVerified: false,
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


                // PREPAIRE FOR DISPATCH TRANSECTIONS AND TOTAL
                const userTransections = userData.transections === undefined ? {} : userData.transections
                const totalTransection = { totalExpense: 0, totalCredit: 0 }
                const newExpenseArr = Object.keys(userTransections).map((expenseId) => {
                    if (userTransections[expenseId].type === "credit") {
                        totalTransection.totalCredit += Number(userTransections[expenseId].price)
                    }
                    else {
                        totalTransection.totalExpense += Number(userTransections[expenseId].price)
                    }
                    return { ...userTransections[expenseId], id: expenseId }
                })

                // DISPATCH TRANSECTIONS
                dispatch(fetchExpense(newExpenseArr))
                // DISPATCH TOTAL
                dispatch(fetchTotal(totalTransection))
                // DISPATCH USER

                // Before Dispatch removing the transection field
                delete userData.transections
                const newUserDataObj = { ...authData, ...userData }

                dispatch(fetchUser(newUserDataObj))
                setLoader(false)
            }

        } catch (error) {
            let message = error.response.data.error.message
            alert(message)
            console.log(error);
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


            // PREPAIRE FOR DISPATCH TRANSECTIONS AND TOTAL
            const userTransections = userData.transections === undefined ? {} : userData.transections
            const totalTransection = { totalExpense: 0, totalCredit: 0 }
            const newExpenseArr = Object.keys(userTransections).map((expenseId) => {
                if (userTransections[expenseId].type === "credit") {
                    totalTransection.totalCredit += Number(userTransections[expenseId].price)
                }
                else {
                    totalTransection.totalExpense += Number(userTransections[expenseId].price)
                }
                return { ...userTransections[expenseId], id: expenseId }
            })

            // DISPATCH TRANSECTIONS
            dispatch(fetchExpense(newExpenseArr))
            // DISPATCH TOTAL
            dispatch(fetchTotal(totalTransection))
            // DISPATCH USER

            // Before Dispatch removing the transection field
            delete userData.transections
            const newUserDataObj = { ...userAuth, ...userData, idToken: localToken }

            dispatch(fetchUser(newUserDataObj))
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
