import { UserInfoType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserInfoType = {
  id: "",
  username: "",
  account: "",
  photoUrl: "",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUserInfo: () => {
      return initialState;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
