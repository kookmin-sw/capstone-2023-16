import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

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

const basicDimensions = {
  width: 393,
  height: 852
};

const width = (num: number) : number => {
  const p = (num / basicDimensions.width) * 100;
  return responsiveWidth(p);
};

const height = (num: number): number => {
  const p = (num / basicDimensions.height) * 100;
  return responsiveHeight(p);
};

const fontSize = (num: number): number => {
  const p = num * 0.125;
  return responsiveFontSize(p);
};

export const DimensionTheme = {
  fontSize,
  width,
  height
}
