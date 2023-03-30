import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
  id: string,
  password: string,
};

const initialState: LoginState = {
  id: '',
  password: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginState>) => state = action.payload,
    logout: state => state = initialState,
  },
})

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;