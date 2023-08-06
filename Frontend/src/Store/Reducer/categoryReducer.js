import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USERS } from "../../Firebase/APIURL";
import { setVisiblefunc } from "./notificationReducer";
import { ADD_CATEGORY, DELETE_CATEGORY } from "../../API/endpoint";

const categoryReducer = createSlice({
  name: "category",
  initialState: { categoryArr: [] },
  reducers: {
    addCategory: (state, action) => {
      state.categoryArr.push(action.payload);
    },
    setCategory: (state, action) => {
      state.categoryArr = action.payload;
    },
    fetchCategory: (state, action) => {
      state.categoryArr = action.payload;
    },
  },
});

export const { addCategory, setCategory, deleteCategory } =
  categoryReducer.actions;
export default categoryReducer;

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

//! Add New Category
export const addCategoryfunc = (name, setLoader) => {
  return async (dispatch, getState) => {
    try {
      const userEmail = getState().authReducer.email;

      // Storing in database
      const { data } = await axios.post(ADD_CATEGORY, {
        email: userEmail,
        name: name,
      });

      // If Error
      if (data.error) {
        throw new Error(data.error);
      }

      dispatch(addCategory({ id: data.body.id, name: data.body.name }));
    } catch (error) {
      console.log(error);
      let message = error.response.data.error.message;
      dispatch(setVisiblefunc("error", message));
    }
    setLoader(false);
  };
};

//! Delete Existing Category
export const deleteCategoryfunc = (id, setLoader) => {
  return async (dispatch, getState) => {
    try {
      // Deleting From Database
      const { data } = await axios.post(DELETE_CATEGORY, { id: id });

      // If Error
      if (data.error) {
        throw new Error(data.error);
      }

      // Deleting From Redux Store
      const prevList = getState().categoryReducer.categoryArr.filter(
        (category) => {
          if (category.id !== id) {
            return true;
          }
        }
      );

      dispatch(setCategory(prevList));
    } catch (error) {
      console.log(error);
      let message = error.response.data.error.message;
      dispatch(setVisiblefunc("error", message));
    }
    setLoader(false);
  };
};
