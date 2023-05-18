import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USERS } from "../../Firebase/APIURL";
import { fetchTotal, increamentExpense, increamentCredit, decreamentCredit, decreamentExpense } from "./totalReducer";

const transectionReducer = createSlice({
    name: "transections",
    initialState: { expense: [] },
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
            const { data } = await axios.post(`${USERS}/${userEmail}/transections.json`, expenseData)
            const responseId = data.name
            const newObj = { ...expenseData, id: responseId }
            dispatch(addExpense(newObj))
            if (expenseData.type === "credit") {
                dispatch(increamentCredit(expenseData.price))
            }
            else {
                dispatch(increamentExpense(expenseData.price))
            }
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
            const { data } = await axios.get(`${USERS}/${userEmail}/transections.json`)
            const totalTransection = { totalExpense: 0, totalCredit: 0 }

            const newExpenseArr = Object.keys(data).map((expenseId) => {
                if (data[expenseId].type === "credit") {
                    totalTransection.totalCredit += Number(data[expenseId].price)
                }
                else {
                    totalTransection.totalExpense += Number(data[expenseId].price)
                }
                return { ...data[expenseId], id: expenseId }
            })


            dispatch(fetchExpense(newExpenseArr))
            dispatch(fetchTotal(totalTransection))
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
            const { data } = await axios.delete(`${USERS}/${userEmail}/transections/${expenseId}.json`)
            const prevData = getState().transectionReducer.expense
            const updatedDataArray = prevData.filter((expesnes) => {
                if (expesnes.id === expenseId) {
                    if (expesnes.type === "credit") {
                        dispatch(decreamentCredit(expesnes.price))
                    }
                    else {
                        dispatch(decreamentExpense(expesnes.price))
                    }
                }
                else {

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
            const { data } = await axios.put(`${USERS}/${userEmail}/transections/${expenseId}.json`, expenseData)
            const updatedDataArray = prevData.map((val) => {
                if (val.id === expenseId) {
                    if (val.type === "credit") {
                        dispatch(decreamentCredit(val.price))
                        if (expenseData.type === "credit") {
                            dispatch(increamentCredit(val.price))
                        }
                        else {
                            dispatch(increamentExpense(val.price))
                        }
                    }
                    else {
                        dispatch(decreamentExpense(val.price))
                        if (expenseData.type === "credit") {
                            dispatch(increamentCredit(val.price))
                        }
                        else {
                            dispatch(increamentExpense(val.price))
                        }
                    }
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