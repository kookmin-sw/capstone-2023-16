import React from 'react';

import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {BaseInfoScreen} from '../../screens/Persona/BaseInfoScreen';
import {InterestTagSettingScreen} from '../../screens/Persona/InterestTagSettingScreen';

export type ParamList = {
  BaseInfo: undefined;
  InterestTagSetting: undefined;
};

const StackNavigator = createNativeStackNavigator<ParamList>();

const PersonaNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="BaseInfo"
        component={BaseInfoScreen}
        options={{title: '페르소나 생성', headerShadowVisible: false}}
      />
      <StackNavigator.Screen
        name="InterestTagSetting"
        component={InterestTagSettingScreen}
        options={{title: '페르소나 생성', headerShadowVisible: false}}
      />
    </StackNavigator.Navigator>
  );
};

export default PersonaNavigator;

export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
