import React from 'react';

import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {LoginScreen} from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

export type ParamList = {
  Login: undefined;
  Signup: undefined;
};

const StackNavigator = createNativeStackNavigator<ParamList>();

const AuthNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <StackNavigator.Screen
        name="Signup"
        component={SignupScreen}
        options={{title: '회원가입', headerShadowVisible: false}}
      />
    </StackNavigator.Navigator>
  );
};

export default AuthNavigator;

export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
