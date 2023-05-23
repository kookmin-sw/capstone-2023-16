import React, {createContext, FC, useEffect, useMemo, useState} from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {colors} from '../components/common/colors';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

import {selectAuth} from '../redux/slices/userSlice';
import {useAppSelector} from '../redux/hooks';
import {RelayEnvironmentProvider} from 'react-relay';
import RelayEnvironment from '../RelayEnvironment';
import LoginEnvironment from '../LoginEnvironment';
import {getData} from '../asyncstorage';

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
      {auth.isLoggedIn ? (
        <RelayEnvironmentProvider environment={RelayEnvironment}>
          <AppNavigator />
        </RelayEnvironmentProvider>
      ) : (
        <RelayEnvironmentProvider environment={LoginEnvironment}>
          <AuthNavigator />
        </RelayEnvironmentProvider>
      )}
    </NavigationContainer>
  );
};

export default NavContainer;
