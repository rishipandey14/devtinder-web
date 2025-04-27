import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestsReducer from "./requestsSlice";
import toastReducer from "./toastSlice";




const appStore = configureStore({
  reducer : {
    user: userReducer,
    feed: feedReducer,
    connections : connectionReducer,
    requests : requestsReducer,
    toast : toastReducer,
  },
});

export default appStore;