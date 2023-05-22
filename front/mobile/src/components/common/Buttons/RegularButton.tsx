import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import {colors} from '../colors';
import {DimensionTheme} from '../shared';
import RegularText from '../Texts/RegularText';

import {ButtonProps} from './types';

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  background-color: ${colors.white};
  width: 100%;
  padding: 8px;
  border-radius: 15px;
  height: ${DimensionTheme.height(50)};
`;

const RegularButton: FC<ButtonProps> = props => {
  return (
    <ButtonView onPress={props.onPress} style={props.btnStyles}>
      <RegularText textStyle={props.textStyles}>{props.children}</RegularText>
    </ButtonView>
  );
};

export default RegularButton;
