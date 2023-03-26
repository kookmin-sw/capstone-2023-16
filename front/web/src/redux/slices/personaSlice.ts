import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface PersonaState {
  id: string
  nickname: string
  src?: string
};

const initialState: PersonaState = {
    id: '',
    nickname: '',
    src: ''
};

export const personaSlice = createSlice({
  name: 'persona',
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<PersonaState>) => ({...state, ...action.payload}),
    disconnect: (state) => ({...state, ...initialState}),
  },
});

// Action creators are generated for each case reducer function
export const { connect, disconnect } = personaSlice.actions;

export default personaSlice.reducer;