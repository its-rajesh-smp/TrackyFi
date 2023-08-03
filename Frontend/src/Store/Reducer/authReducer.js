import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
    AUTH_DETAILS,
    CREATE_USER,
    FETCH_PAYMENT,
    LOGIN_USER,
    PASSWORD_RESET,
    SEND_VERIFY_LINK,
    USERS,
} from "../../Firebase/APIURL";
import { SIGN_IN, SIGN_UP, GET_USER, UPDATE_USER, BUY_VIP, PAYMENT_CAPTURE, PAYMENT_FAILED } from "../../API/endpoint";
import { clearExpense, setTransections } from "./transectionReducer";
import { fetchCategory } from "./categoryReducer";
import { setVisiblefunc } from "./notificationReducer";

const authReducer = createSlice({
    name: "user/auth",
    initialState: {
        auth: false,
        VIP: false
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
                dispatch(fetchCategory(data.body.categoryList));
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
            console.log(data);
            // In Case Of Error
            if (data.error) {
                throw new Error(data.error);
            }

            // DISPATCHING
            dispatch(fetchCategory(data.body.categories));
            dispatch(setTransections(data.body.transections))
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
            const { data: updatedData } = await axios.patch(UPDATE_USER, {
                email: userEmail,
                updateFields: { name, mobile, verified: true },
            });

            if (updatedData.error) {
                throw new Error(updatedData.error);
            }

            dispatch(updateUser(updatedData.body));
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
    return async (dispatch, getState) => {
        const idToken = getState().authReducer.idToken;
        try {
            const { data } = await axios.post(SEND_VERIFY_LINK, {
                idToken: idToken,
                requestType: "VERIFY_EMAIL",
            });
            setLoading(false);
        } catch (error) {
            let message = error.response.data.error.message;
            dispatch(setVisiblefunc("error", message));
            console.log(error);
            setLoading(false);
        }
    };
};

//! UPDATE PROFILE
export const updateProfile = (
    name,
    phone,
    password,
    setLoading,
    setToggleEdit
) => {
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
    };
};

//! SEND FORGOT PASSWORD LINK
export const sendForgotPassword = (email, setLoading, setOnForgot) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.post(PASSWORD_RESET, {
                email: email,
                requestType: "PASSWORD_RESET",
            });
            console.log("DATA");
            setLoading(false);
            setOnForgot(false);
        } catch (error) {
            console.log(error);
            let message = error.response.data.error.message;
            dispatch(setVisiblefunc("error", message));
            setLoading(false);
            setOnForgot(false);
        }
    };
};





//! FETCH PAYMENT
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


            const { data } = await axios.post(BUY_VIP, { idToken: localToken })

            const option = {
                key: data.body.key_id,
                order_id: data.body.orderId,
                handler: async (response) => {
                    try {
                        const payload = { orderId: data.body.orderId, paymentId: response.razorpay_payment_id, idToken: localToken }
                        axios.post(PAYMENT_CAPTURE, payload)
                        dispatch(updateUser({ VIP: true }))

                    } catch (error) {
                        await axios.patch(PAYMENT_FAILED, { orderId: data.body.orderId })
                        let message = error.message;
                        dispatch(setVisiblefunc("error", message));
                    }
                }
            }

            const rzp = new Razorpay(option)
            rzp.open()





        } catch (error) {
            let message = error.message;
            dispatch(setVisiblefunc("error", message));
        }
    };
};
