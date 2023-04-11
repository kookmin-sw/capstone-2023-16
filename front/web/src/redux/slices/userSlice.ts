import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  email: string;
  createdAt: Date;
  username: string;
  signupMethod: string;
  updatedAt: Date;
};

const initialState: UserState = {
  id: '',
  email: '',
  createdAt: new Date(),
  username: '',
  signupMethod: '',
  updatedAt: new Date(),
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