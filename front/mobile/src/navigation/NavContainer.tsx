import React, {FC} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';
import MyPageNavigator from './AppNavigator/MyPageNavigator';

const NavContainer: FC = () => {
  return (
    <NavigationContainer>
      {/* <AuthNavigator /> */}
      <MyPageNavigator />
    </NavigationContainer>
  );
};

export default NavContainer;
