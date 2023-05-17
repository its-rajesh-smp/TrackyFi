import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USERS } from "../../Firebase/APIURL";

const transectionReducer = createSlice({
    name: "transections",
    initialState: { expense: {}, credit: {} },
    reducers: {
        fetchExpense: (state, action) => {
            state.expense = action.payload
        },
        addExpense: (state, action) => {
            state.expense = action.payload

        }
    }
})


const { fetchExpense, addExpense } = transectionReducer.actions
export default transectionReducer



/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
//! Add Expense
export const addExpensefunc = (expenseData) => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.userData.email.replace(".", "").replace("@", "")
            const prevData = { ...getState().transectionReducer.expense }
            const { data } = await axios.post(`${USERS}/${userEmail}/transections/${"expense"}/${expenseData.date}.json`, expenseData)
            const id = data.name
            const newDataObj = { [id]: expenseData }

            if (prevData[expenseData.date] !== undefined) {
                const updatedData = {
                    ...prevData[expenseData.date],
                    ...newDataObj
                };
                prevData[expenseData.date] = updatedData;
                dispatch(addExpense(prevData))
            }
            else {
                const keys = Object.keys(prevData)
                // Checking if first.date < current.date
                // dont know why working
                let newExpenseState = {}
                if (new Date(keys[0]) < new Date(expenseData.date)) {
                    newExpenseState = { ...prevData, [expenseData.date]: newDataObj }
                }
                else {
                    newExpenseState = { [expenseData.date]: newDataObj, ...prevData }
                }
                dispatch(addExpense(newExpenseState))
            }

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
            dispatch(fetchExpense(data))
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
}

//! Delete Expense
export const deleteExpense = (expenseDate, expenseId) => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.userData.email.replace(".", "").replace("@", "")
            const prevData = { ...getState().transectionReducer.expense }
            await axios.delete(`${USERS}/${userEmail}/transections/${"expense"}/${expenseDate}/${expenseId}.json`)
            const newObj = { ...prevData[expenseDate] }
            delete newObj[expenseId]
            if (Object.keys(newObj).length === 0) {
                const updatedData = { ...prevData }
                delete updatedData[expenseDate]
                dispatch(fetchExpense(updatedData))
            }
            else {
                const updatedData = { ...prevData, [expenseDate]: newObj }
                dispatch(fetchExpense(updatedData))
            }

        } catch (error) {
            console.log(error);
        }
    }
}