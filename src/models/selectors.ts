import { ReactReduxState } from './reactRedux';
import { FnListState } from './fnList';

export declare namespace StoreStateType {
  type ReactRedux = ReactReduxState;
  type FnList = FnListState;
}

export interface StoreState {
  reactRedux: StoreStateType.ReactRedux;
  fnList: StoreStateType.FnList;
}

export const reactReduxSelector = (state: StoreState): StoreStateType.ReactRedux => {
  return state.reactRedux;
};

export const fnListSelector = (state: StoreState): StoreStateType.FnList => {
  return state.fnList;
};

export default {
  reactReduxSelector,
  fnListSelector,
};
