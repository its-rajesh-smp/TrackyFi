import { createSlice } from "@reduxjs/toolkit";

const themeReducer = createSlice({
    name: "theme/dark&light",
    initialState: { theme: "lightMode", bool: false },
    reducers: {
        switchTheme: (state) => {
            if (state.theme === "lightMode") {
                state.theme = "darkMode"
            }
            else if (state.theme === "darkMode") {
                state.theme = "lightMode"
            }
            state.bool = !state.bool
        }
    }
})
export const { switchTheme } = themeReducer.actions
export default themeReducer