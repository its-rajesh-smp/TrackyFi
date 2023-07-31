import { createSlice } from "@reduxjs/toolkit"



const totalReducer = createSlice({
    name: "transection/total",
    initialState: { totalExpense: 0, totalCredit: 0 },
    reducers: {
        setTotal: (state, action) => {
            return { ...action.payload }
        }

    }
})
export const { setTotal } = totalReducer.actions
export default totalReducer