import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_DETAILS, CREATE_USER, FETCH_PAYMENT, LOGIN_USER, PASSWORD_RESET, SEND_VERIFY_LINK, USERS } from "../../Firebase/APIURL";
import { SIGN_IN, SIGN_UP, GET_USER, UPDATE_USER } from "../../API/endpoint"
import { clearExpense, fetchExpense } from "./transectionReducer";
import { fetchCategory } from "./categoryReducer";
import { setVisiblefunc } from "./notificationReducer";




const authReducer = createSlice({
    name: "user/auth",
    initialState: {
        auth: false,

    },
    reducers: {
        authUser: (state, action) => {
            state.auth = true
            Object.assign(state, action.payload)
        },
        updateUser: (state, action) => {
            Object.assign(state, action.payload)
        },
        logoutUser: () => {
            return {
                isAuth: false,
            }
        }
    }

})

export const { authUser, logoutUser, updateUser } = authReducer.actions
export default authReducer

/* -------------------------------------------------------------------------- */
/*                                  FUNCTION                                  */
/* -------------------------------------------------------------------------- */
//! Create User
export const createUserfunc = (enteredData, switchLogin, onSwitchLoginHandeler, setLoading) => {
    return async (dispatch, getState) => {
        try {
            if (!switchLogin) {
                const { data: authData } = await axios.post(SIGN_UP, enteredData)

                console.log(authData);

                if (authData.error) {
                    throw new Error(authData.error)
                }

                localStorage.setItem("trackfyUser", authData.body.idToken)


                dispatch(authUser(authData.body))

            }
            else {
                const { data: authData } = await axios.post(SIGN_IN, enteredData)    //AuthData=>idToken

                console.log(authData);

                if (authData.error) {
                    throw new Error(authData.error)
                }


                localStorage.setItem("trackfyUser", authData.body.idToken)


                // // PREPAIRE FOR DISPATCH TRANSECTIONS
                // const userTransections = !userData.transections ? {} : userData.transections

                // const newExpenseArr = Object.keys(userTransections).map((expenseId) => {
                //     return { ...userTransections[expenseId], id: expenseId }
                // })

                // // PREPARING CATEGORY ARRAY
                // const newCategoryArr = Object.values(!userData.category ? {} : userData.category)

                // // DISPATCH TRANSECTIONS
                // dispatch(fetchExpense(newExpenseArr))
                // dispatch(fetchCategory(newCategoryArr))

                // // Before Dispatch removing the transection field
                // delete userData.transections
                // delete userData.category
                // const newUserDataObj = { ...authData, ...userData, ...getUser.users[0] }

                // // DISPATCH USER
                dispatch(authUser(authData.body))
            }

        } catch (error) {
            let message = error.message
            dispatch(setVisiblefunc("error", message))
        }
        setLoading(false)
    }
}


//! Fetch User
export const fetchUsefunc = (setLoading) => {
    return async (dispatch, getState) => {
        try {
            const localToken = localStorage.getItem("trackfyUser")
            if (!localToken) {
                setLoading(false)
                return
            }

            const { data: authData } = await axios.post(GET_USER, { idToken: localToken })


            if (authData.error) {
                throw new Error(authData.error)
            }


            // // PREPAIRE FOR DISPATCH TRANSECTIONS AND TOTAL
            // const userTransections = !userData.transections ? {} : userData.transections

            // const newExpenseArr = Object.keys(userTransections).map((expenseId) => {
            //     return { ...userTransections[expenseId], id: expenseId }
            // })

            // // PREPARING CATEGORY ARRAY
            // const newCategoryArr = Object.keys(!userData.category ? {} : userData.category).map((id) => {
            //     return { id: id, name: userData.category[id].name }
            // })

            // // DISPATCH
            // dispatch(fetchCategory(newCategoryArr))
            // dispatch(fetchExpense(newExpenseArr))




            // // Before Dispatch removing the transection field
            // delete userData.transections
            // delete userData.category
            // const newUserDataObj = { ...userAuth, ...userData, idToken: localToken }

            // // DISPATCH USER
            dispatch(authUser(authData.body))

        } catch (error) {
            let message = error.message
            dispatch(setVisiblefunc("error", message))
        }
        setLoading(false)
    }
}


//! VERIFY USER
export const verifyUserfunc = (name, mobile, setLoading) => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.email
            const { data: updatedData } = await axios.patch(UPDATE_USER, { email: userEmail, updateFields: { name, mobile, verified: true } })

            if (updatedData.error) {
                throw new Error(updatedData.error)
            }

            dispatch(updateUser(updatedData.body))

        } catch (error) {
            let message = error.message
            dispatch(setVisiblefunc("error", message))
        }
        setLoading(false)
    }
}



//! LOGOUT USER
export const logoutUserfunc = () => {
    return (dispatch) => {
        localStorage.clear("trackfyUser")
        dispatch(logoutUser())
        dispatch(clearExpense())
    }
}





//! SEND EMAIL VERIFICATION
export const sendEmailVerification = (setLoading) => {
    return async (dispatch, getState) => {
        const idToken = getState().authReducer.idToken
        try {
            const { data } = await axios.post(SEND_VERIFY_LINK, { idToken: idToken, requestType: "VERIFY_EMAIL" })
            setLoading(false)
        } catch (error) {
            let message = error.response.data.error.message
            dispatch(setVisiblefunc("error", message))
            console.log(error);
            setLoading(false)
        }
    }
}

//! UPDATE PROFILE
export const updateProfile = (name, phone, password, setLoading, setToggleEdit) => {
    return async (dispatch, getState) => {
        // try {
        //     const currentUserData = getState().authReducer
        //     const idToken = currentUserData.idToken
        //     const currentEmail = currentUserData.email.replace(".", "").replace("@", "")
        //     const currentUserName = currentUserData.userName
        //     const currentUserPhone = currentUserData.userMobile

        //     // Checking if user only want to update the password or want to update the name and phone
        //     // by this check i am reducing the api call
        //     if (currentUserName !== name || currentUserPhone !== phone) {

        //         const { data: userUpdateRes } = await axios.patch(`${USERS}/${currentEmail}.json`, {
        //             userName: name,
        //             userMobile: phone
        //         })
        //         dispatch(updateUser(userUpdateRes))
        //     }
        //     if (password !== "************") {
        //         const { data: passwordUpdateRes } = await axios.post(UPDATE_USER,
        //             {
        //                 idToken: idToken,
        //                 password: password,
        //                 returnSecureToken: true,
        //             })
        //         dispatch(logoutUserfunc())
        //     }
        //     setLoading(false)
        //     setToggleEdit(false)

        // } catch (error) {
        //     let message = error.response.data.error.message
        //     dispatch(setVisiblefunc("error", message))
        //     console.log(error);
        //     setLoading(false)
        //     setToggleEdit(false)
        // }
    }
}


//! SEND FORGOT PASSWORD LINK
export const sendForgotPassword = (email, setLoading, setOnForgot) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.post(PASSWORD_RESET, { email: email, requestType: "PASSWORD_RESET" })
            console.log("DATA")
            setLoading(false)
            setOnForgot(false)
        } catch (error) {
            console.log(error);
            let message = error.response.data.error.message
            dispatch(setVisiblefunc("error", message))
            setLoading(false)
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
            let message = error.response.data.error.message
            dispatch(setVisiblefunc("error", message))
            console.log(error);
        }
    }
}