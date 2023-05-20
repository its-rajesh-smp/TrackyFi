import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USERS } from "../../Firebase/APIURL";

const categoryReducer = createSlice({
    name: "category",
    initialState: { categoryArr: [] },
    reducers: {
        setCategory: (state, action) => {
            state.categoryArr.push(action.payload)
        },
        fetchCategory: (state, action) => {
            state.categoryArr = action.payload
        },
        deleteCategory: (state, action) => {
            state.categoryArr = action.payload
        }
    }
})

export const { setCategory, fetchCategory, deleteCategory } = categoryReducer.actions
export default categoryReducer



/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

export const addCategoryfunc = (enteredCategory, setLoader) => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.email.replace(".", "").replace("@", "")
            const { data } = await axios.post(`${USERS}/${userEmail}/category.json`, { name: enteredCategory })
            dispatch(setCategory({ id: data.name, name: enteredCategory }))
        } catch (error) {
            console.log(error);
        }
        setLoader(false)
    }
}


export const deleteCategoryfunc = (id, setLoader) => {
    return async (dispatch, getState) => {
        try {
            const userEmail = getState().authReducer.email.replace(".", "").replace("@", "")
            const { data } = await axios.delete(`${USERS}/${userEmail}/category/${id}.json`)
            const prevList = getState().categoryReducer.categoryArr.filter((category) => {
                if (category.id !== id) {
                    return true
                }
            })
            dispatch(deleteCategory(prevList))
        } catch (error) {
            console.log(error);
        }
        setLoader(false)
    }
}

