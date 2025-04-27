import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const connectionSlice = createSlice({
  name : "connections",
  initialState,
  reducers : {
    addConnections : (state, action) => action.payload,
    removeConnection : () => null,
    resetConnectionState : () => initialState,
  },
});


export const {addConnections, removeConnection, resetConnectionState} = connectionSlice.actions;

export default connectionSlice.reducer;