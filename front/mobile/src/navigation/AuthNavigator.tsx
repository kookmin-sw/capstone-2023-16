import React from 'react';

import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {LoginScreen} from '../screens/LoginScreen';
import {SignupScreen} from '../screens/SignupScreen';
import {BaseInfoScreen} from '../screens/Persona/BaseInfoScreen';
import {InterestTagSettingScreen} from '../screens/Persona/InterestTagSettingScreen';

export type ParamList = {
  Login: undefined;
  Signup: undefined;
  BaseInfo: undefined;
  InterestTagSetting: undefined;
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
      <StackNavigator.Screen
        name="BaseInfo"
        component={BaseInfoScreen}
        options={{
          title: '페르소나 생성',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
      <StackNavigator.Screen
        name="InterestTagSetting"
        component={InterestTagSettingScreen}
        options={{
          title: '페르소나 생성',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default AuthNavigator;

export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
