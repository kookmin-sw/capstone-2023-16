import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import newPostReducer from './slices/newPostSlice';
import newPersonaReducer from './slices/newPersonaSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    newPost: newPostReducer,
    newPersona: newPersonaReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch