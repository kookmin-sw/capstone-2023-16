import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Constants from "expo-constants";

import { colors } from "./colors";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
`;

export const StatusBarHeight = Constants.statusBarHeight;
export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;
