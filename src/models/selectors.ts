import { AboutState } from './about';
import { FnListState } from './fnList';

interface StoreState {
  about: AboutState;
  fnList: FnListState;
}

export const aboutSelector = (state: StoreState): AboutState => {
  return state.about;
};

export const fnListSelector = (state: StoreState): FnListState => {
  return state.fnList;
};
