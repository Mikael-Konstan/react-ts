import { RootState } from '../reducerConfig';
import { createSelector } from '@reduxjs/toolkit';
import { ReactReduxState } from '@/models/reactRedux';

export const todoStateSelector = createSelector(
  (state: RootState): ReactReduxState => {
    return state.todo;
  },
  (todo) => todo,
);
