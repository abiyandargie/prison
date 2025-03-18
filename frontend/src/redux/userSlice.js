import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:  {}, // Load from localStorage
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Persist user data
    },
    logout(state) {
      state.user = {};
      localStorage.clear(); // Clear everything on logout
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
