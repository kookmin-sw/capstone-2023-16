import React, {FC} from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';
import {colors} from '../components/common/colors';
import AppNavigator from './AppNavigator';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

const NavContainer: FC = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthNavigator />
      {/* <AppNavigator /> */}
    </NavigationContainer>
  );
};

export default NavContainer;
