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
import {MyHistoryScreen} from '../screens/MyHistory/MyHistoryScreen';
import {SettingScreen} from '../screens/MyAccount/SettingScreen';
import DetailScreen from '../screens/DetailScreen';
import {FollowerScreen} from '../screens/MyAccount/FollowerScreen';
import {PersonaScreen} from '../screens/MyAccount/PersonaScreen';

export type ParamList = {
  Main: undefined;
  BaseInfo: undefined;
  InterestTagSetting: undefined;
  MyPage: undefined;
  Following: undefined;
  Follower: undefined;
  Persona: undefined;
  History: undefined;
  Setting: undefined;
  DetailContent: undefined;
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
        name="DetailContent"
        component={DetailScreen}
        options={{headerShown: false}}
      />
      <StackNavigator.Screen
        name="MyPage"
        component={MyPageScreen}
        options={({navigation}) => ({
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
                onPress={() => {
                  navigation.navigate('Setting');
                }}
              />
            </>
          ),
        })}
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
        name="Follower"
        component={FollowerScreen}
        options={{
          title: '팔로워',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
      <StackNavigator.Screen
        name="Persona"
        component={PersonaScreen}
        options={{
          title: '페르소나',
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
      <StackNavigator.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: true, title: 'SETTING'}}
      />
    </StackNavigator.Navigator>
  );
};

export default AppNavigator;

export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
