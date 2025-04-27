/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name : "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
    resetUserState : () => initialState,
  },
});


export const {addUser, removeUser, resetUserState} = userSlice.actions; 

export default userSlice.reducer;