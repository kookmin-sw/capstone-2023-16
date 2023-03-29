import React from 'react';

import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {LoginScreen} from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import {SignupScreen} from '../screens/SignupScreen';
import {BaseInfoScreen} from '../screens/Persona/BaseInfoScreen';
import {InterestTagSettingScreen} from '../screens/Persona/InterestTagSettingScreen';
import DetailScreen from '../screens/DetailScreen';
import ImageButton from '../components/common/Buttons/ImageButton';
import {MyPageScreen} from '../screens/MyAccount/MyPageScreen';
import {imagePath} from '../utils/imagePath';
import {FollowingScreen} from '../screens/MyAccount/FollowingScreen';
import {MyHistoryScreen} from '../screens/MyHistory/MyHistoryScreen';

export type ParamList = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
  BaseInfo: undefined;
  InterestTagSetting: undefined;
  MyPage: undefined;
  Following: undefined;
  History: undefined;
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
        name="DetailContent"
        component={DetailScreen}
        options={{headerShown: false}}
      />
      <StackNavigator.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          headerShadowVisible: false,
          headerTitle: '홍현지',
          headerTransparent: true,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 28,
          },
          headerRight: () => (
            <>
              <ImageButton
                btnStyles={{backgroundColor: 'transparent'}}
                source={imagePath.shareIcon}
                onPress={() => {}}
              />
              <ImageButton
                btnStyles={{backgroundColor: 'transparent'}}
                source={imagePath.editIcon}
                onPress={() => {}}
              />
              <ImageButton
                btnStyles={{backgroundColor: 'transparent'}}
                source={imagePath.settingIcon}
                onPress={() => {}}
              />
            </>
          ),
        }}
      />
      <StackNavigator.Screen
        name="Following"
        component={FollowingScreen}
        options={{
          title: '팔로잉',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
      <StackNavigator.Screen
        name="History"
        component={MyHistoryScreen}
        options={{
          title: 'MY HISTORY',
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
