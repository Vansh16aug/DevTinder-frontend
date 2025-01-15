import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      const newArray = state.filter(
        (connection) => connection._id !== action.payload
      );
      return newArray;
    },
    emptyConnection: () => {
      return null;
    }
  },
});

export const { addConnection, removeConnection, emptyConnection } =
  connectionSlice.actions;
export default connectionSlice.reducer;
