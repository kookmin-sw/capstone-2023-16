import React, {createContext, FC, useEffect, useMemo, useState} from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {colors} from '../components/common/colors';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

import {selectAuth} from '../redux/slices/userSlice';
import {useAppSelector} from '../redux/hooks';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

const NavContainer: FC = () => {
  let auth = useAppSelector(selectAuth);
  console.log(`!!!!!!!!nav : ${JSON.stringify(auth)}`);
  return (
    <NavigationContainer theme={MyTheme}>
      {auth.isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default NavContainer;
