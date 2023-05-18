import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {PersistConfig, persistStore, persistReducer} from 'redux-persist';

import authReducer from './slices/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});
type ReducerState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<ReducerState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export {store, persistor};
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type store
export type AppDispatch = typeof store.dispatch;