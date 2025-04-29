import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestsReducer from "./requestsSlice";
import toastReducer from "./toastSlice";
import {persistStore , persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";


const userPersistConfig = {
  key : "user",
  storage,
}

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);


const appStore = configureStore({
  reducer : {
    user: persistedUserReducer,
    feed: feedReducer,
    connections : connectionReducer,
    requests : requestsReducer,
    toast : toastReducer,
  },
  middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck : false,
    }),
});

export const persistor = persistStore(appStore);

export default appStore;