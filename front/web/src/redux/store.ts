import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './slices/loginSlice'
import personaReducer from './slices/personaSlice'

export const store = configureStore({
  reducer: {
    login: loginSlice,
    persona: personaReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch