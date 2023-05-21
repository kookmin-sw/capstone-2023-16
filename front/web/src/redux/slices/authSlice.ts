import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getCookie, setCookie } from '../../utils/cookieUtils';

interface PersonaType {
  id: string,
  nickname: string,
};

interface AuthType{
  isLoggedIn: boolean,
  isConnected: boolean,
  persona: PersonaType,
}

const isLoggedIn = getCookie('csrftoken')?true:false;
const persona_id = getCookie('persona_id');
const isConnected = persona_id?true:false;
const persona_nickname = getCookie('persona_nickname');

const initialState: AuthType= { 
  isLoggedIn,
  isConnected,
  persona:{
    id: persona_id,
    nickname: persona_nickname,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => ({...state, isLoggedIn: true}),
    logout: state => ({...initialState, isLoggedIn: false}),
    connect: (state, action: PayloadAction<PersonaType>) => {
      setCookie('persona_id', action.payload.id);
      setCookie('persona_nickname', action.payload.nickname);
      return { ...state, ...action.payload, isConnected: true };
    },
    disconnect: (state) => ({...state, ...initialState, isConnected: false}),
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, connect, disconnect } = authSlice.actions;

export default authSlice.reducer;