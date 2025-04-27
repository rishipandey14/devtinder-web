import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const requestSlice = createSlice({
  name : "requests",
  initialState,
  reducers : {
    addRequest : (state, action) => action.payload,
    removeRequest : (state, action) => {
      const newArray = state.filter(r => r._id !== action.payload);
      return newArray;
    },
    resetRequestState: () => initialState,
  },
});


export const {addRequest, removeRequest, resetRequestState} = requestSlice.actions;
export default requestSlice.reducer;