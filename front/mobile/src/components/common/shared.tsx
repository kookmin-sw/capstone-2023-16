//@ts-ignore
import styled from 'styled-components/native';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StatusBar, Platform, Dimensions} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {colors} from './colors';

export const StatusBarHeight =
  Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeight = Dimensions.get('screen').height;

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: ${ScreenHeight}px;
  background-color: ${colors.white};
`;

// export const headerStyle : {
//   height: 50 + StatusBarHeight,
// }

const basicDimensions = {
  width: 393,
  height: 852,
};

const width = (num: number): number => {
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
  height,
};
