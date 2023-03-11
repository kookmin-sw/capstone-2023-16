import loginType from '../types/loginType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: loginType = {
  id: '',
  password: '',
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<loginType>) => state = action.payload,
    logout: state => state = initialState,
  },
})

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;