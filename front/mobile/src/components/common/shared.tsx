//@ts-ignore
import styled from 'styled-components/native';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StatusBar, Platform, Dimensions} from 'react-native';

import {colors} from './colors';

export const StatusBarHeight =
  Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeight = Dimensions.get('screen').height;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: ${ScreenHeight}px;
  background-color: ${colors.white};
`;

// export const headerStyle : {
//   height: 50 + StatusBarHeight,
// }
