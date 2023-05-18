import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_USER, USERS } from "../../Firebase/APIURL";

const transectionReducer = createSlice({
    name: "transections",
    initialState: { expense: [], credit: [] },
    reducers: {
        addExpense: (state, action) => {
            state.expense = [...state.expense, action.payload]

        },
        fetchExpense: (state, action) => {
            state.expense = action.payload
        }
    }
})


const { addExpense, fetchExpense } = transectionReducer.actions
export default transectionReducer



/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
//! Add Expense
export const addExpensefunc = (expenseData, onCloseBtnHandeler, setLoader) => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.userData.email.replace(".", "").replace("@", "")
            const { data } = await axios.post(`${USERS}/${userEmail}/transections/expense.json`, expenseData)
            const responseId = data.name
            const newObj = { ...expenseData, id: responseId }
            dispatch(addExpense(newObj))
            setLoader(false)
            onCloseBtnHandeler()

        } catch (error) {
            setLoader(false)
            console.log(error);
        }
    }
}

//! Fetch Expense
export const fetchExpensefunc = () => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.userData.email.replace(".", "").replace("@", "")
            const { data } = await axios.get(`${USERS}/${userEmail}/transections/expense.json`)
            const newExpenseArr = Object.keys(data).map((expenseId) => {
                return { ...data[expenseId], id: expenseId }
            })
            dispatch(fetchExpense(newExpenseArr))
        } catch (error) {
            console.log(error);
        }
    }
}

//! Delete Expense
export const deleteExpense = (expenseId, onCloseBtnHandeler, setLoader) => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.userData.email.replace(".", "").replace("@", "")
            const { data } = await axios.delete(`${USERS}/${userEmail}/transections/expense/${expenseId}.json`)
            const prevData = getState().transectionReducer.expense
            const updatedDataArray = prevData.filter((expesnes) => {
                if (expesnes.id !== expenseId) {
                    return true
                }
            })
            dispatch(fetchExpense(updatedDataArray))
            setLoader(false)
            onCloseBtnHandeler()
        } catch (error) {
            setLoader(false)
            console.log(error);
        }
    }
}


// !Edit expense
export const editExpensefunc = (expenseId, expenseData, onCloseBtnHandeler, setLoader) => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.userData.email.replace(".", "").replace("@", "")
            const prevData = getState().transectionReducer.expense
            const { data } = await axios.put(`${USERS}/${userEmail}/transections/expense/${expenseId}.json`, expenseData)
            const updatedDataArray = prevData.map((val) => {
                if (val.id === expenseId) {
                    return { ...data, id: expenseId }
                }
                else {
                    return val
                }
            })
            dispatch(fetchExpense(updatedDataArray))
            setLoader(false)
            onCloseBtnHandeler()

        } catch (error) {
            setLoader(false)
            console.log(error);
        }
    }
}