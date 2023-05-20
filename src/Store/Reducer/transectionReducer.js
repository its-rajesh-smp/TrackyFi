import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USERS } from "../../Firebase/APIURL";
import generate_txt from "../../Functions/generate_txt";

const transectionReducer = createSlice({
    name: "transections",
    initialState: { expense: [] },
    reducers: {
        addExpense: (state, action) => {
            state.expense = [...state.expense, action.payload]
        },
        fetchExpense: (state, action) => {
            state.expense = action.payload
        },
        setBlob: (state, action) => {
            state.blob = action.payload
        }
    }
})


export const { addExpense, fetchExpense, setBlob } = transectionReducer.actions
export default transectionReducer



/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
//! Add Expense
export const addExpensefunc = (expenseData, onCloseBtnHandeler, setLoader) => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.email.replace(".", "").replace("@", "")
            const { data } = await axios.post(`${USERS}/${userEmail}/transections.json`, expenseData)
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
// Fetching expensess in also done from auth just because we will get all the data related to the user in 
// a single api call

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
            const userEmail = getState().authReducer.email.replace(".", "").replace("@", "")
            const prevData = getState().transectionReducer.expense
            const { data } = await axios.put(`${USERS}/${userEmail}/transections/${expenseId}.json`, expenseData)
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


//! ON DOWNLOAD
export const onDownload = () => {
    return (dispatch, getState) => {
        const allTransections = getState().transectionReducer.expense
        const userDetails = getState().authReducer
        generate_txt(allTransections, userDetails)
    }
}