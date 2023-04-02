import React, {FC} from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {colors} from '../components/common/colors';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {useAppSelector} from '../redux/hooks';
import {selectAuth} from '../redux/slices/userSlice';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

const NavContainer: FC = () => {
  const auth = useAppSelector(selectAuth);
  console.log(`@@contianer: ${auth.isLoggedIn}`);
  return (
    <NavigationContainer theme={MyTheme}>
      {auth.isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
      {/* <AuthNavigator /> */}
      {/* <AppNavigator /> */}
    </NavigationContainer>
  );
};

export default NavContainer;
