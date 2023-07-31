import { createSlice } from "@reduxjs/toolkit"

const toggleAddEditExpense = createSlice({
    name: "toggle/expenseAddEdit",
    initialState: {
        isEdit: false,
        isAdd: false,
        data: { name: "", category: "", date: "", time: "", price: "", id: "" }
    },
    reducers: {
        toggleAdd: (state) => {
            state.isAdd = true
        },
        toggleEdit: (state, action) => {
            state.isEdit = true
            state.data = action.payload
        },
        disableToggle: () => {
            return {
                isEdit: false,
                isAdd: false,
                data: { name: "", category: "", date: "", time: "", price: "", id: "" }
            }
        }
    }
})

export const { toggleAdd, toggleEdit, disableToggle } = toggleAddEditExpense.actions
export default toggleAddEditExpense