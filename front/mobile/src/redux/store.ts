import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {PersistConfig, persistStore, persistReducer} from 'redux-persist';

import authReducer from './slices/userSlice';
import createMigrate from 'redux-persist/es/createMigrate';

const rootReducer = combineReducers({
  auth: authReducer,
});
type ReducerState = ReturnType<typeof rootReducer>;

const migrations = {
  0: (state: ReducerState): ReducerState => {
    const {cookie, ...updteState} = state;
    return updteState;
  },
};

const persistConfig: PersistConfig<ReducerState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  version: 0,
  migrate: createMigrate(migrations, {debug: false}),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
// persistor.purge();

export {store, persistor};
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type store
export type AppDispatch = typeof store.dispatch;