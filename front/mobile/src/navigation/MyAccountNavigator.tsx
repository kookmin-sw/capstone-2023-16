import React from 'react';

import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {MyPageScreen} from '../screens/MyAccount/MyPageScreen';
import {FollowingScreen} from '../screens/MyAccount/FollowingScreen';

import ImageButton from '../components/common/Buttons/ImageButton';
import {imagePath} from '../utils/imagePath';

export type ParamList = {
  MyPage: undefined;
  Following: undefined;
};

const StackNavigator = createNativeStackNavigator<ParamList>();

const AppNavigator = () => {
  return (
    <StackNavigator.Navigator>
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
