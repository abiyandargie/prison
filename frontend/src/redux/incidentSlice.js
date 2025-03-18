import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incident:  [],
};

const incidentSlice = createSlice({
  name: "incident",
  initialState,
  reducers: {
    setIncident(state, action) {
      state.incident =action.payload ;
     },
    
  },
});

export const { setIncident } = incidentSlice.actions;
export default incidentSlice.reducer;
