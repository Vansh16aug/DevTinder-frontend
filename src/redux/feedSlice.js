import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      const newArray = state.filter((feed) => feed._id !== action.payload);
      return newArray;
    },
    emptyFeed: () => {
      return null;
    },
  },
});

export const { addFeed, removeFeed, emptyFeed } = feedSlice.actions;
export default feedSlice.reducer;
