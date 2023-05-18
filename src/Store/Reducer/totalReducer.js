import { createSlice } from "@reduxjs/toolkit"



const totalReducer = createSlice({
    name: "transection/total",
    initialState: { totalExpense: 0, totalCredit: 0 },
    reducers: {
        fetchTotal: (state, action) => {
            return { ...action.payload }
        },
        increamentExpense: (state, action) => {
            state.totalExpense = state.totalExpense + Number(action.payload)
        },
        increamentCredit: (state, action) => {
            state.totalCredit = state.totalCredit + Number(action.payload)
        },
        decreamentExpense: (state, action) => {
            state.totalExpense = state.totalExpense - Number(action.payload)
        },
        decreamentCredit: (state, action) => {
            state.totalCredit = state.totalCredit - Number(action.payload)
        }

    }
})
export const { fetchTotal, increamentCredit, increamentExpense, decreamentCredit, decreamentExpense } = totalReducer.actions
export default totalReducer