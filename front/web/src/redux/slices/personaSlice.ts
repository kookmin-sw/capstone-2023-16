import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getCookie, setCookie } from '../../utils/cookieUtils';

interface PersonaState {
  id: string
  nickname: string
};

const persona_id = getCookie('persona_id');
const persona_nickname = getCookie('persona_nickname');
const initialState: PersonaState = {
    id: persona_id,
    nickname: persona_nickname,
};


export const personaSlice = createSlice({
  name: 'persona',
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<PersonaState>) => {
      setCookie('persona_id', action.payload.id);
      setCookie('persona_nickname', action.payload.nickname);
      return { ...state, ...action.payload }
    },
    disconnect: (state) => ({...state, ...initialState}),
  },
});

// Action creators are generated for each case reducer function
export const { connect, disconnect } = personaSlice.actions;

export default personaSlice.reducer;