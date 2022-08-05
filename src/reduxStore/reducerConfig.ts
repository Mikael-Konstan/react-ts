import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import dataAnalysisPlateReducer from './reducers/todoReducer';

const reducer = combineReducers({
  dataAnalysisPlate: dataAnalysisPlateReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
