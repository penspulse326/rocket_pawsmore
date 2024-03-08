import { createSlice } from "@reduxjs/toolkit";

import type { PetDataType } from "@/types";

const initialState: PetDataType[] = [];

export const petListSlice = createSlice({
  name: "petList",
  initialState,
  reducers: {
    setPetList: (_, action) => {
      return action.payload;
    },
  },
});

export const { setPetList } = petListSlice.actions;
export default petListSlice.reducer;
