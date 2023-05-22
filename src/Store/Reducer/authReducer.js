import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_DETAILS, CREATE_USER, FETCH_PAYMENT, GET_USER, LOGIN_USER, PASSWORD_RESET, SEND_VERIFY_LINK, UPDATE_USER, USERS } from "../../Firebase/APIURL";
import { fetchExpense } from "./transectionReducer";
import { fetchCategory } from "./categoryReducer";




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
        updateUser: (state, action) => {
            Object.assign(state, action.payload)
        },
        logoutUser: () => {
            return {
                isAuth: false,
                isVerified: false,
            }
        }
    }

})

export const { authUser, verifyUser, fetchUser, logoutUser, updateUser } = authReducer.actions
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
                const { data: getUser } = await axios.post(GET_USER, { idToken: authData.idToken })

                // PREPAIRE FOR DISPATCH TRANSECTIONS
                const userTransections = userData.transections === undefined ? {} : userData.transections

                const newExpenseArr = Object.keys(userTransections).map((expenseId) => {
                    return { ...userTransections[expenseId], id: expenseId }
                })

                // PREPARING CATEGORY ARRAY
                const newCategoryArr = Object.values(userData.category === undefined ? {} : userData.category)

                // DISPATCH TRANSECTIONS
                dispatch(fetchExpense(newExpenseArr))
                dispatch(fetchCategory(newCategoryArr))




                // Before Dispatch removing the transection field
                delete userData.transections
                delete userData.category
                const newUserDataObj = { ...authData, ...userData, ...getUser.users[0] }

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

            const newExpenseArr = Object.keys(userTransections).map((expenseId) => {
                return { ...userTransections[expenseId], id: expenseId }
            })

            // PREPARING CATEGORY ARRAY
            const newCategoryArr = Object.keys(userData.category === undefined ? {} : userData.category).map((id) => {
                return { id: id, name: userData.category[id].name }
            })

            // DISPATCH
            dispatch(fetchCategory(newCategoryArr))
            dispatch(fetchExpense(newExpenseArr))



            // DISPATCH USER

            // Before Dispatch removing the transection field
            delete userData.transections
            delete userData.category
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
            const userEmail = getState().authReducer.email.replace(".", "").replace("@", "")
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


//! SEND EMAIL VERIFICATION
export const sendEmailVerification = (setLoader) => {
    return async (dispatch, getState) => {
        const idToken = getState().authReducer.idToken
        try {
            const { data } = await axios.post(SEND_VERIFY_LINK, { idToken: idToken, requestType: "VERIFY_EMAIL" })
            setLoader(false)
        } catch (error) {
            console.log(error);
            setLoader(false)
        }
    }
}

//! UPDATE PROFILE
export const updateProfile = (name, phone, password, setLoader, setToggleEdit) => {
    return async (dispatch, getState) => {
        try {

            const currentUserData = getState().authReducer
            const idToken = currentUserData.idToken
            const currentEmail = currentUserData.email.replace(".", "").replace("@", "")
            const currentUserName = currentUserData.userName
            const currentUserPhone = currentUserData.userMobile

            // Checking if user only want to update the password or want to update the name and phone
            // by this check i am reducing the api call
            if (currentUserName !== name || currentUserPhone !== phone) {

                const { data: userUpdateRes } = await axios.patch(`${USERS}/${currentEmail}.json`, {
                    userName: name,
                    userMobile: phone
                })
                dispatch(updateUser(userUpdateRes))
            }
            if (password !== "************") {
                const { data: passwordUpdateRes } = await axios.post(UPDATE_USER,
                    {
                        idToken: idToken,
                        password: password,
                        returnSecureToken: true,
                    })
                dispatch(logoutUserfunc())
            }
            setLoader(false)
            setToggleEdit(false)

        } catch (error) {
            console.log(error);
            setLoader(false)
            setToggleEdit(false)
        }
    }
}


//! SEND FORGOT PASSWORD LINK
export const sendForgotPassword = (email, setLoader, setOnForgot) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.post(PASSWORD_RESET, { email: email, requestType: "PASSWORD_RESET" })
            console.log("DATA")
            setLoader(false)
            setOnForgot(false)
        } catch (error) {
            console.log(error);
            setLoader(false)
            setOnForgot(false)
        }
    }
}


//! FETCH PAYMENT
export const fetchPayment = (paymentCode) => {
    return async (dispatch, getState) => {
        try {
            // const { data } = await axios.get('https://api.razorpay.com/v1/payments/pay_LrRQr67nDCIYjr', {
            //     auth: {
            //         "username": "rzp_test_mPoNwadW6BCpBy",
            //         "password": "sgs9uUwqA81IEvL6yjEQn7qa"
            //     }
            // })
            // console.log(data);
            const userEmail = getState().authReducer.email.replace(".", "").replace("@", "")
            const { data } = await axios.patch(`${USERS}/${userEmail}.json`, { VIP: true })
            dispatch(updateUser(data))
        } catch (error) {
            console.log(error);
        }
    }
}