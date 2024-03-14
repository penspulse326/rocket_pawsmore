import { createSlice } from '@reduxjs/toolkit';

import { CardUnionDataType } from '@/common/types';

interface initialStateType {
  petId: number | null;
  data: CardUnionDataType[];
}

const initialState: initialStateType = {
  petId: null,
  data: [],
};

export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    setRecordInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearRecordInfo: () => {
      return initialState;
    },
  },
});

export const { setRecordInfo, clearRecordInfo } = recordSlice.actions;
export default recordSlice.reducer;
