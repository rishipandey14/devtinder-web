import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const feedSlice = createSlice({
  name : "feed",
  initialState,
  reducers: {
    addUserInFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newArray = state.filter(user => user._id !== action.payload);
      return newArray;
    },
    resetFeedState: () =>  initialState,
  },
});


export const {addUserInFeed, removeUserFromFeed, resetFeedState} = feedSlice.actions;
export default feedSlice.reducer;