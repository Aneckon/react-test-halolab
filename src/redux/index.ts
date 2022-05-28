import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import cardSliceReducer from './card/reducer';

export const store = configureStore({
  reducer: {
    cardSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type RootState = ReturnType<typeof store.getState>;
