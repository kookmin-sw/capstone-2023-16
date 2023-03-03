import React from "react";

import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { LoginScreen } from "../screens/LoginScreen";

export type ParamList = {
  Login: undefined;
};

const StackNavigator = createNativeStackNavigator<ParamList>();

const AuthNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default AuthNavigator;

export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: NativeStackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
