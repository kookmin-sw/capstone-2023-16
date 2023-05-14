import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import personaReducer from './slices/personaSlice'
import newPostReducer from './slices/newPostSlice'
import newPersonaReducer from './slices/newPersonaSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    persona: personaReducer,
    newPost: newPostReducer,
    newPersona: newPersonaReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch