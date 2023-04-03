import {configureStore, combineReducers} from '@reduxjs/toolkit';

import authReducer from './slices/userSlice';

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

export const store = configureStore({
  reducer: {authReducer},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type store
export type AppDispatch = typeof store.dispatch;
