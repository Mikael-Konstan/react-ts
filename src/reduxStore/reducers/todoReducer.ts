import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ReactReduxState } from '@/models/reactRedux';
import { getReactReduxModelNumberApi } from '@/services/reactRedux';

export const getModelNumber = createAsyncThunk(
  'todo/getModelNumber',
  async () => {
    const res = await getReactReduxModelNumberApi();
    return res; // 此处的返回结果会在 .fulfilled中作为payload的值
  },
);

export const getModelNumber2 = createAsyncThunk(
  'todo/getModelNumber2',
  async () => {
    const res = await getReactReduxModelNumberApi();
    return res; // 此处的返回结果会在 .fulfilled中作为payload的值
  },
);

export const initialState: ReactReduxState = {
  list: [1, 2, 3],
  total: 0,
  page: 1,
  modelNumber: 1,
  productId: 'dva',
  products: [
    {
      id: 'dva',
      name: 'dva',
    },
    {
      id: 'antd',
      name: 'antd',
    },
  ],
};

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setList(
      state,
      action: PayloadAction<((list: number[]) => number[]) | number[]>,
    ) {
      if (Array.isArray(action.payload)) {
        state.list = action.payload;
      } else {
        state.list = action.payload(state.list);
      }
    },
  },
  // extraReducers: {
  //   [getModelNumber.fulfilled.type](state, { payload }) {
  //     console.log('payload', payload);
  //     const { data } = payload;
  //     state.modelNumber = data;
  //   },
  //   [getModelNumber.rejected.type](state, err) {
  //     console.log(err);
  //   },
  //   [getModelNumber.pending.type](state) {
  //     console.log('进行中');
  //   },
  // },
  // 对象或者Function都可以
  // fulfilled rejected pending 这些状态不是必须的
  extraReducers: (builder) => {
    builder
      .addCase(getModelNumber.fulfilled, (state, { payload }) => {
        console.log('payload', payload);
        const { data } = payload;
        state.modelNumber = data;
      })
      .addCase(getModelNumber.rejected, (state, err) => {
        console.log(err);
      })
      .addCase(getModelNumber.pending, (state, action) => {
        console.log('进行中');
      })
      .addCase(getModelNumber2.fulfilled, (state, { payload }) => {
        console.log('payload', payload);
        const { data } = payload;
        state.modelNumber = data;
      });
  },
});

export const actions = slice.actions;
export const { setList } = actions;

export default slice.reducer;
