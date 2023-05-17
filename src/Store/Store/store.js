import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducer/authReducer";
import toggleAddEditExpense from "../Reducer/toggleAddEditExpense";

const store = configureStore({
    reducer: {
        authReducer: authReducer.reducer,
        toggleAddEdit: toggleAddEditExpense.reducer
    }
})
export default store