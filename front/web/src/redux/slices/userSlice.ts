import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  email: string;
  createdAt: String;  // String형이지만 실제 값은 Data.toISOString()의 값이 삽입됨.
  username: string;
  signupMethod: string;
  updatedAt: String;  // String형이지만 실제 값은 Data.toISOString()의 값이 삽입됨.
};

const initialState: UserState = {
  id: '',
  email: '',
  createdAt: '',
  username: '',
  signupMethod: '',
  updatedAt: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => state = action.payload,
    clearUser: state => state = initialState,
  },
})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;