import React from 'react';

import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {MyPageScreen} from '../../screens/MyPageScreen';

export type ParamList = {
  MyPageScreen: undefined;
};

const StackNavigator = createNativeStackNavigator<ParamList>();

const MyPageNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={{headerShadowVisible: false}}
      />
    </StackNavigator.Navigator>
  );
};

export default MyPageNavigator;

export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
