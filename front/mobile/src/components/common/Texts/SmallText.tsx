import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import {colors} from '../colors';
import {DimensionTheme} from '../shared';

const StyledText = styled.Text`
  font-size: ${DimensionTheme.fontSize(13)};
  color: ${colors.graydark};
  text-align: left;
`;

import {TextProps} from './types';

const SmallText: FC<TextProps> = props => {
  return <StyledText style={props.textStyle}>{props.children}</StyledText>;
};

export default SmallText;
