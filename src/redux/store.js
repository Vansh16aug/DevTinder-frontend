import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
  },
});

export default store;
