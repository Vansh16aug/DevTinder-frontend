import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state,action) => {
      const newArray = state.filter((item)=> item._id !== action.payload);
      return newArray;
    },
    emptyRequest: () => null,
  },
});

export const { addRequest, removeRequest, emptyRequest } = requestSlice.actions;
export default requestSlice.reducer;
