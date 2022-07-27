import { ModelsNameSpaceEnum } from '@/utils/enum';
import { PayloadAction } from '@/utils/type';
import { isFn } from '@/utils/tools';
import { getThrottleListApi } from '@/services/fnList';
import { getAboutModelNumberApi } from '@/services/about';
import { getAboutModelNumberRes } from '@/services/about/type';

export interface AboutState {
  list: number[];
  total: number;
  page: number;
  modelNumber: number;
}

export const state: AboutState = {
  list: [1, 2, 3],
  total: 0,
  page: 1,
  modelNumber: 1,
};

export default {
  namespace: ModelsNameSpaceEnum.ABOUT,
  state,
  reducers: {
    save(
      state: AboutState,
      action: PayloadAction<((state: AboutState) => AboutState) | AboutState>,
    ) {
      if (isFn(action.payload)) {
        return {
          ...state,
          ...(<(state: AboutState) => AboutState>action.payload)(state),
        };
      }
      return { ...state, ...action.payload };
    },
    setList: (
      state: AboutState,
      action: PayloadAction<((comp: number[]) => number[]) | number[]>,
    ) => {
      if (!Array.isArray(action.payload)) {
        return { ...state, list: action.payload(state.list) };
      }
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 只能用* yield   不支持async await
    *query(params: any, { call, put }: { call: any; put: any }) {
      const { data }: getAboutModelNumberRes = yield call(
        getAboutModelNumberApi,
        {},
      );
      console.log(data);
      yield put({
        type: 'save',
        payload: {
          modelNumber: data,
        },
      });
    },
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, query }) => {
    //     if (pathname === '/users') {
    //       dispatch({ type: 'fetch', payload: query });
    //     }
    //   });
    // },
  },
};
