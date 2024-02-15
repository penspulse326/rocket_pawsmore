import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";

import userInfoReducer from "./userInfoSlice";
import petDataReducer from "./petListSlice";

// 定義一個特殊的 action 類型用於重置狀態
const RESET_STATE_ACTION_TYPE = "resetState";

// 結合所有的 reducers
const combinedReducer = combineReducers({
  userInfo: userInfoReducer,
  petList: petDataReducer,
});

// 創建一個可以處理重置狀態的 rootReducer
// 現在明確指定 state 和 action 的類型
const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: Action
) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    // 如果收到重置狀態的 action，返回 undefined 以重置所有 reducer 的狀態
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

// 配置 store
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Action creator 用於重置狀態
export const resetState = () => ({ type: RESET_STATE_ACTION_TYPE });
