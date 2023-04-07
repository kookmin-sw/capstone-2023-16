import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import personaReducer from './slices/personaSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    persona: personaReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch