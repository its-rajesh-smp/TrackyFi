import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducer/authReducer";
import toggleAddEditExpense from "../Reducer/toggleAddEditExpense";
import transectionReducer from "../Reducer/transectionReducer";
import totalReducer from "../Reducer/totalReducer";
import themeReducer from "../Reducer/themeReducer";

const store = configureStore({
    reducer: {
        authReducer: authReducer.reducer,
        toggleAddEdit: toggleAddEditExpense.reducer,
        transectionReducer: transectionReducer.reducer,
        totalReducer: totalReducer.reducer,
        themeReducer: themeReducer.reducer
    }
})
export default store