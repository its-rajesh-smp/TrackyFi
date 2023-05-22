import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducer/authReducer";
import toggleAddEditExpense from "../Reducer/toggleAddEditExpense";
import transectionReducer from "../Reducer/transectionReducer";
import totalReducer from "../Reducer/totalReducer";
import themeReducer from "../Reducer/themeReducer";
import searchReducer from "../Reducer/searchReducer";
import categoryReducer from "../Reducer/categoryReducer";
import notificationReducer from "../Reducer/notificationReducer";

const store = configureStore({
    reducer: {
        authReducer: authReducer.reducer,
        toggleAddEdit: toggleAddEditExpense.reducer,
        transectionReducer: transectionReducer.reducer,
        totalReducer: totalReducer.reducer,
        themeReducer: themeReducer.reducer,
        searchReducer: searchReducer.reducer,
        categoryReducer: categoryReducer.reducer,
        notificationReducer: notificationReducer.reducer
    }
})
export default store