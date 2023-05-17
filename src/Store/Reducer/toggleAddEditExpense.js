import { createSlice } from "@reduxjs/toolkit"

const toggleAddEditExpense = createSlice({
    name: "toggle/expenseAddEdit",
    initialState: { isEdit: false, isAdd: false },
    reducers: {
        toggleAdd: (state) => {
            state.isAdd = true
        },
        toggleEdit: (state) => {
            state.isEdit = true
        },
        disableToggle: () => {
            return { isEdit: false, isAdd: false }
        }
    }
})

export const { toggleAdd, toggleEdit, disableToggle } = toggleAddEditExpense.actions
export default toggleAddEditExpense