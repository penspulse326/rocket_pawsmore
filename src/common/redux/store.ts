import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "./userInfoSlice";
import petDataReducer from "./petListSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    petList: petDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
