import React from 'react';

import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

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
import {ChallengeScreen} from '../screens/Challenge/ChallengeScreen';
import {ChallengeCreateScreen} from '../screens/Challenge/ChallengeCreateScreen';
import {ChallengeDetailScreen} from '../screens/Challenge/ChallengeDetailScreen';
import {MyContentScreen} from '../screens/MyContent/MyContentScreen';
import {FollowScreen} from '../screens/MyAccount/FollowScreen';

export type ParamList = {
  Main: undefined;
  BaseInfo: undefined;
  InterestTagSetting: undefined;
  MyPage: undefined;
  Follow: undefined;
  Following: undefined;
  Follower: undefined;
  Persona: undefined;
  History: undefined;
  Setting: undefined;
  DetailContent: undefined;
  Challenge: undefined;
  ChallengeCreate: undefined;
  ChallengeDetail: undefined;
  MyContent: undefined;
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
        name="MyPage"
        component={MyPageScreen}
        options={({navigation}) => ({
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: '홍현지',
          headerTransparent: true,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 28,
          },
        })}
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
        name="Follow"
        component={FollowScreen}
        options={{headerShown: false}}
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
          headerShown: false,
        }}
      />
      <StackNavigator.Screen
        name="History"
        component={MyHistoryScreen}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigator.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: true, title: 'SETTING'}}
      />
      <StackNavigator.Screen
        name="Challenge"
        component={ChallengeScreen}
        options={{headerShown: false}}
      />
      <StackNavigator.Screen
        name="ChallengeCreate"
        component={ChallengeCreateScreen}
        options={{headerShown: false}}
      />
      <StackNavigator.Screen
        name="ChallengeDetail"
        component={ChallengeDetailScreen}
        options={{headerShown: false}}
      />
      <StackNavigator.Screen
        name="MyContent"
        component={MyContentScreen}
        options={{headerShown: false}}
      />
    </StackNavigator.Navigator>
  );
};

export default AppNavigator;

export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
