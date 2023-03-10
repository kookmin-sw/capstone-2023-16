import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import {colors} from '../colors';

const StyledText = styled.Text`
  font-size: 14px;
  color: ${colors.graydark};
  text-align: left;
`;

import {TextProps} from './types';

const SmallText: FC<TextProps> = props => {
  return <StyledText style={props.textStyle}>{props.children}</StyledText>;
};

export default SmallText;
