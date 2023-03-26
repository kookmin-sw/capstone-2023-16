import { configureStore } from '@reduxjs/toolkit'
import personaReducer from './slices/personaSlice'

export const store = configureStore({
  reducer: {
    persona: personaReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch