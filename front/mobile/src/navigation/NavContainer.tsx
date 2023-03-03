import React, { FC } from "react";

import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";

const NavContainer: FC = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default NavContainer;
