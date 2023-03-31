import React from 'react';

import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import ImageButton from '../components/common/Buttons/ImageButton';
import {imagePath} from '../utils/imagePath';

import MainScreen from '../screens/MainScreen';
import {BaseInfoScreen} from '../screens/Persona/BaseInfoScreen';
import {InterestTagSettingScreen} from '../screens/Persona/InterestTagSettingScreen';
import {MyPageScreen} from '../screens/MyAccount/MyPageScreen';
import {FollowingScreen} from '../screens/MyAccount/FollowingScreen';

export type ParamList = {
  Main: undefined;
  BaseInfo: undefined;
  InterestTagSetting: undefined;
  MyPage: undefined;
  Following: undefined;
};

const StackNavigator = createNativeStackNavigator<ParamList>();

const AppNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Main"
        component={MainScreen}
        options={{headerShown: false}}
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
      <StackNavigator.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          headerShadowVisible: false,
          headerTitle: '홍현지',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 28,
          },
          headerRight: () => (
            <>
              <ImageButton
                btnStyles={{backgroundColor: 'transparent'}}
                source={imagePath.eye}
                onPress={() => {}}
              />
              <ImageButton
                btnStyles={{backgroundColor: 'transparent'}}
                source={imagePath.eye_off}
                onPress={() => {}}
              />
              <ImageButton
                btnStyles={{backgroundColor: 'transparent'}}
                source={imagePath.eye}
                onPress={() => {}}
              />
            </>
          ),
        }}
      />
      <StackNavigator.Screen
        name="Following"
        component={FollowingScreen}
        options={{headerShadowVisible: false}}
      />
    </StackNavigator.Navigator>
  );
};

export default AppNavigator;

export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
