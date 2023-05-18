import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducer/authReducer";
import toggleAddEditExpense from "../Reducer/toggleAddEditExpense";
import transectionReducer from "../Reducer/transectionReducer";
import totalReducer from "../Reducer/totalReducer";

const store = configureStore({
    reducer: {
        authReducer: authReducer.reducer,
        toggleAddEdit: toggleAddEditExpense.reducer,
        transectionReducer: transectionReducer.reducer,
        totalReducer: totalReducer.reducer
    }
})
export default store