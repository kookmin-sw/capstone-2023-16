import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../store';

interface AuthState {
  user: {
    id: string;
    username: string;
    email: string;
  };
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: {
    id: '',
    username: '',
    email: '',
  },
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
  },
});

export const {setUser, setIsLoggedIn} = authSlice.actions;

export const selectUser = (state: RootState) => state.authReducer.user;
export const selectIsLoggedIn = (state: RootState) =>
  state.authReducer.isLoggedIn;
export const selectAuth = (state: RootState) => state.authReducer;

export default authSlice.reducer;
