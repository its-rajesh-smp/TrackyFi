import { createSlice } from "@reduxjs/toolkit";

const searchReducer = createSlice({
  name: "search",
  initialState: { searchValue: "", filterValue: "" },
  reducers: {
    setSearch: (state, action) => {
      state.searchValue = action.payload;
    },
    setFilter: (state, action) => {
      state.filterValue = action.payload;
    },
    reset: (state) => {
      state.filterValue = "";
      state.searchValue = "";
    },
  },
});

export const { setSearch, setFilter, reset } = searchReducer.actions;
export default searchReducer;
