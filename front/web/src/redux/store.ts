import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import personaReducer from './slices/personaSlice'
import newPostReducer from './slices/newPostSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    persona: personaReducer,
    newPost: newPostReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch