import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompSet {
  name: string; // 看板name
  nodeCode: string; // 树节点code
  type: 'create' | 'edit';
}

export interface DataAnalysisPlateState {
  editIdx: number; // 组件编辑索引
  compSet: CompSet;
}

export const initialState: DataAnalysisPlateState = {
  editIdx: -1,
  compSet: {
    name: '',
    nodeCode: '',
    type: 'create',
  },
};

const slice = createSlice({
  name: 'DataAnalysisPlate',
  initialState,
  reducers: {
    setEditIdx(
      state,
      action: PayloadAction<((editIdx: number) => number) | number>,
    ) {
      if (typeof action.payload === 'number') {
        state.editIdx = action.payload;
      } else {
        state.editIdx = action.payload(state.editIdx);
      }
    },
    setCompSet(state, action: PayloadAction<CompSet>) {
      state.compSet = action.payload;
    },
  },
});
export const actions = slice.actions;
export default slice.reducer;
