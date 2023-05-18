import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    login: (state, action: PayloadAction<AuthState['user']>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
    setPersona: (state, action: PayloadAction<AuthState['persona_id']>) => {
      state.persona_id = action.payload;
      AsyncStorage.setItem('persona_id', JSON.stringify(action.payload));
    },
    logout: state => {
      AsyncStorage.removeItem('user');
      AsyncStorage.removeItem('persona_id');
      state.isLoggedIn = false;
      state.persona_id = '';
      (state.user = {
        id: '',
        username: '',
        email: '',
      }),
        console.log(`@@@@@@@@state : ${JSON.stringify(state)}`);
    },
  },
});

export const {login, setPersona, logout} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuth = (state: RootState) => state.auth;
export const selectPersona = (state: RootState) => state.auth.persona_id;

export default authSlice.reducer;