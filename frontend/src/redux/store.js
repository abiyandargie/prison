import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import inmateSlice from "./prisonSlice";
import usersSlice from "./usersSlice";
import incidentSlice from "./incidentSlice";
import sidebarReducer from "./sidebarSlice"; // Import sidebar reducer

const store = configureStore({
  reducer: {
    user: userSlice,
    inmate: inmateSlice,
    users: usersSlice,
    incidents: incidentSlice,
    sidebar: sidebarReducer, // Add sidebar reducer here
  },
});

export default store;
