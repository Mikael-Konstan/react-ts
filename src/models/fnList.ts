import { ModelsNameSpaceEnum } from '@/utils/enum';

export interface FnListState {
  name: string;
}

export const state: FnListState = {
  name: '',
};

export default {
  namespace: ModelsNameSpaceEnum.FNLIST,
  state,
  reducers: {
    save(state: FnListState, { payload }: { payload: FnListState }) {
      return { ...state, ...payload };
    },
    setName(state: FnListState, action: { payload: string }) {
      return {
        ...state,
        name: action.payload,
      };
    },
  },
  effects: {},
  subscriptions: {},
};
