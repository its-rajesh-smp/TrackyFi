import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
    name: "notification",
    initialState: {
        type: "success",
        message: "",
        isVisible: false
    },
    reducers: {
        setVisible: (state, action) => {
            state.isVisible = true,
                state.message = action.payload.message,
                state.type = action.payload.type
        },
        setInvisible: (state) => {
            state.isVisible = false,
                state.message = "",
                state.type = ""
        }
    }
})


export const { setInvisible, setVisible } = notificationReducer.actions
export default notificationReducer



/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
export const setVisiblefunc = (type, message) => {
    return (dispatch, getState) => {
        dispatch(setVisible({ type: type, message: message }))
        setTimeout(function () {
            dispatch(setInvisible())
        }, 3000);
    }
}