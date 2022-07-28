import { ModelsNameSpaceEnum } from '@/utils/enum';

export declare namespace FnListType {
  type Name = string;
}
export interface FnListState {
  name: FnListType.Name;
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
    setName(state: FnListState, action: { payload: FnListType.Name }) {
      return {
        ...state,
        name: action.payload,
      };
    },
  },
  effects: {},
  subscriptions: {},
};
