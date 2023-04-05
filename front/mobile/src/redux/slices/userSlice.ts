import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../store';

interface AuthState {
  user: {
    id: string;
    username: string;
    email: string;
  };
  persona_id: string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: {
    id: '',
    username: '',
    email: '',
  },
  persona_id: '',
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<AuthState['isLoggedIn']>) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
    setPersona: (state, action: PayloadAction<AuthState['persona_id']>) => {
      state.persona_id = action.payload;
    },
  },
});

export const {setUser, setIsLoggedIn, setPersona} = authSlice.actions;

export const selectUser = (state: RootState) => state.authReducer.user;
export const selectIsLoggedIn = (state: RootState) =>
  state.authReducer.isLoggedIn;
export const selectAuth = (state: RootState) => state.authReducer;
export const selectPersona = (state: RootState) => state.authReducer.persona_id;

export default authSlice.reducer;
