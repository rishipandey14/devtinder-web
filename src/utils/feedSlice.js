/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name : "feed",
  initialState: null,
  reducers: {
    addUserInFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newArray = state.filter(user => user._id !== action.payload);
      return newArray;
    },
  },
});


export const {addUserInFeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;