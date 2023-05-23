import React, { createContext, useContext, useState, useMemo, PropsWithChildren, Context, ContextType, useCallback } from 'react'
import { getCookie, removeCookie, setCookie } from '../utils/cookieUtils'

type AuthContextType = {
  loginState: boolean,
  persona?: {
    id?: string,
    nickname?: string,
  }
  login: () => {},
  logout: () => {},
  connect: (id:string, nickname:string) => {},
}

const isLoggedIn = getCookie('isLoggedIn')==='true'? true: false;
const isConnected = getCookie('isConnected');
const persona_id = getCookie('persona_id');
const persona_nickname = getCookie('persona_nickname');

export const AuthContext = createContext<AuthContextType|null>(null);

export function AuthProvider({ children }:PropsWithChildren) {
  const [loginState, setLoginState] = useState<boolean>(isLoggedIn);
  const [persona, setPersona] = useState<object>({ id:persona_id, nickname:persona_nickname });
  console.log(persona);

  const login = useCallback(() => {
    setLoginState(true);
    setCookie('isLoggedIn', 'true');
  }, []);
  const logout = useCallback(() => {
    setLoginState(false);
    removeCookie('isLoggedIn');
  }, []);

  const connect = useCallback((id: string, nickname: string) =>{
    console.log(persona);
    setPersona(prev => ({ ...prev, id: id, nickname: nickname }));
    setCookie('persona_id', id);
    setCookie('persona_nickname', nickname);
  }, []);

  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const value:any = { loginState, login, logout, persona, connect };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};


export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Cannot find AuthProvider')
  }
  return context;
};