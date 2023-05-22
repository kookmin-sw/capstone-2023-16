import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import {colors} from '../colors';
import {DimensionTheme} from '../shared';

const StyledText = styled.Text`
  font-size: ${DimensionTheme.fontSize(20)};
  color: ${colors.black};
  text-align: center;
  font-weight: 600;
  line-height: 29px;
`;

import {TextProps} from './types';

const RegularText: FC<TextProps> = props => {
  return <StyledText style={props.textStyle}>{props.children}</StyledText>;
};

export default RegularText;
