import { RootState } from '../reducerConfig';
import { createSelector } from '@reduxjs/toolkit';
import { DataAnalysisPlateState } from '../reducers/todoReducer';

export const dataAnalysisStateSelector = createSelector(
  (state: RootState): DataAnalysisPlateState => {
    return state.dataAnalysisPlate;
  },
  (dataAnalysisPlate) => dataAnalysisPlate,
);
