import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inmate:  [],
};

const inmateSlice = createSlice({
  name: "inmate",
  initialState,
  reducers: {
    setInmate(state, action) {
      state.inmate =action.payload ;
     },
    
  },
});

export const { setInmate } = inmateSlice.actions;
export default inmateSlice.reducer;
