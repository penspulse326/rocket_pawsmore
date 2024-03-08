import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";

import userInfoReducer from "./userInfoSlice";
import petDataReducer from "./petListSlice";
import recordReducer from "./recordSlice";

// 重置全域狀態
const RESET_STATE_ACTION_TYPE = "resetState";

// 組合 reducer
const combinedReducer = combineReducers({
  userInfo: userInfoReducer,
  petList: petDataReducer,
  petRecord: recordReducer,
});

// 收到重置狀態的 action， undefined 以重置所有 reducer 的狀態
const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: Action
) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Action creator 用於重置狀態
export const resetState = () => ({ type: RESET_STATE_ACTION_TYPE });
