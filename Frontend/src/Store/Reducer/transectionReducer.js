import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USERS } from "../../Firebase/APIURL";
import generate_txt from "../../Functions/generate_txt";
import { setVisiblefunc } from "./notificationReducer";
import { ADD_TRANSECTION, EDIT_TRANSECTION } from "../../API/endpoint";

const transectionReducer = createSlice({
    name: "transections",
    initialState: { transections: [] },
    reducers: {
        addExpense: (state, action) => {
            state.transections = [...state.transections, action.payload]
        },
        fetchExpense: (state, action) => {
            state.transections = action.payload
        },
        clearExpense: (state) => {
            state.transections = []
        }
    }
})


export const { addExpense, fetchExpense, clearExpense } = transectionReducer.actions
export default transectionReducer



/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
//! Add Expense
export const addExpensefunc = (expenseData, onCloseBtnHandeler, setLoader) => {
    return async (dispatch, getState) => {
        try {
            const email = getState().authReducer.email
            const { data } = await axios.post(ADD_TRANSECTION, { email, ...expenseData })

            // In Case Of Error
            if (data.error) {
                throw new Error(data.error);
            }

            dispatch(addExpense(data.body))
            onCloseBtnHandeler()

        } catch (error) {
            let message = error.message;
            dispatch(setVisiblefunc("error", message));
        }
        setLoader(false)

    }
}


//! Delete Expense
export const deleteExpense = (expenseId, onCloseBtnHandeler, setLoader) => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.email.replace(".", "").replace("@", "")
            const { data } = await axios.delete(`${USERS}/${userEmail}/transections/${expenseId}.json`)
            const prevData = getState().transectionReducer.expense
            const updatedDataArray = prevData.filter((expesnes) => {
                if (expesnes.id !== expenseId) {
                    return true
                }

            })
            dispatch(fetchExpense(updatedDataArray))
            onCloseBtnHandeler()
        } catch (error) {
            let message = error.message;
            dispatch(setVisiblefunc("error", message));
        }
        setLoader(false)
    }
}


// !Edit expense
export const editExpensefunc = (expenseId, expenseData, onCloseBtnHandeler, setLoader) => {
    return async (dispatch, getState) => {
        try {
            const prevData = getState().transectionReducer.transections
            // const { data } = await axios.patch(EDIT_TRANSECTION, { id: expenseId, ...expenseData })
            console.log(expenseData);

            // const updatedDataArray = prevData.map((val) => {
            //     if (val.id === expenseId) {
            //         return { ...data, id: expenseId }
            //     }
            //     else {
            //         return val
            //     }
            // })
            // dispatch(fetchExpense(updatedDataArray))
            // onCloseBtnHandeler()

        } catch (error) {
            let message = error.message;
            dispatch(setVisiblefunc("error", message));
        }
        setLoader(false)
    }
}


//! ON DOWNLOAD
export const onDownload = () => {
    return (dispatch, getState) => {
        const allTransections = getState().transectionReducer.expense
        const userDetails = getState().authReducer
        generate_txt(allTransections, userDetails)
    }
}