import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USERS } from "../../Firebase/APIURL";
import generate_txt from "../../Functions/generate_txt";
import { setVisiblefunc } from "./notificationReducer";
import {
  ADD_TRANSECTION,
  EDIT_TRANSECTION,
  DELETE_TRANSECTION,
} from "../../API/endpoint";

const transectionReducer = createSlice({
  name: "transections",
  initialState: { transections: [] },
  reducers: {
    addExpense: (state, action) => {
      state.transections = [...state.transections, action.payload];
    },
    setTransections: (state, action) => {
      state.transections = action.payload;
    },
    clearExpense: (state) => {
      state.transections = [];
    },
  },
});

export const { addExpense, setTransections, clearExpense } =
  transectionReducer.actions;
export default transectionReducer;

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
//! Add Expense
export const addExpensefunc = (expenseData, onCloseBtnHandeler, setLoader) => {
  return async (dispatch, getState) => {
    try {
      const email = getState().authReducer.email;

      const payload = {
        categoryId: expenseData.category.id,
        categoryName: expenseData.category.name,
        date: expenseData.date,
        time: expenseData.time,
        price: expenseData.price,
        type: expenseData.type,
        name: expenseData.name,
        email,
      };

      const { data } = await axios.post(ADD_TRANSECTION, payload);

      // In Case Of Error
      if (data.error) {
        throw new Error(data.error);
      }

      dispatch(addExpense(data.body));
      onCloseBtnHandeler();
    } catch (error) {
      let message = error.message;
      dispatch(setVisiblefunc("error", message));
    }
    setLoader(false);
  };
};

//! Delete Expense
export const deleteExpense = (transectionId, onCloseBtnHandeler, setLoader) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(DELETE_TRANSECTION, { transectionId });

      // In Case Of Error
      if (data.error) {
        throw new Error(data.error);
      }

      const prevData = getState().transectionReducer.transections;
      const newTransArray = prevData.filter((transection) => {
        if (transection.id !== transectionId) {
          return true;
        }
      });

      dispatch(setTransections(newTransArray));
      onCloseBtnHandeler();
    } catch (error) {
      let message = error.message;
      dispatch(setVisiblefunc("error", message));
    }
    setLoader(false);
  };
};

// !Edit expense
export const editExpensefunc = (
  transectionId,
  expenseData,
  onCloseBtnHandeler,
  setLoader
) => {
  return async (dispatch, getState) => {
    try {
      const prevData = getState().transectionReducer.transections;

      const payload = {
        transectionId,
        categoryId: expenseData.category.id,
        categoryName: expenseData.category.name,
        date: expenseData.date,
        time: expenseData.time,
        price: expenseData.price,
        type: expenseData.type,
        name: expenseData.name,
      };

      await axios.patch(EDIT_TRANSECTION, payload);

      const newTransArray = prevData.map((val) => {
        if (val.id === transectionId) {
          return { ...expenseData, id: transectionId };
        } else {
          return val;
        }
      });

      dispatch(setTransections(newTransArray));
      onCloseBtnHandeler();
    } catch (error) {
      let message = error.message;
      dispatch(setVisiblefunc("error", message));
    }
    setLoader(false);
  };
};

//! ON DOWNLOAD
export const onDownload = () => {
  return (dispatch, getState) => {
    const allTransections = getState().transectionReducer.expense;
    const userDetails = getState().authReducer;
    generate_txt(allTransections, userDetails);
  };
};
