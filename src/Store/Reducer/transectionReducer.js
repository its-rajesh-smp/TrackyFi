import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USERS } from "../../Firebase/APIURL";

const transectionReducer = createSlice({
    name: "transections",
    initialState: { expense: {}, credit: {} },
    reducers: {
        addExpense: (state, action) => {
            state.expense = action.payload
        }
    }
})


const { addExpense } = transectionReducer.actions
export default transectionReducer



/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
//! Add Expense
export const addExpensefunc = (expenseData) => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.userData.email.replace(".", "").replace("@", "")
            const { data } = await axios.post(`${USERS}/${userEmail}/transections/${"expense"}/${expenseData.date}.json`, expenseData)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
}

//! Fetch Expense
export const fetchExpensefunc = () => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.userData.email.replace(".", "").replace("@", "")
            const { data } = await axios.get(`${USERS}/${userEmail}/transections/${"expense"}.json`)
            dispatch(addExpense(data))
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
}
