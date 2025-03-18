import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice"; // Make sure the path is correct

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});
