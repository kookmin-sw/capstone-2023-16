import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import {colors} from '../colors';
import SmallText from '../Texts/SmallText';

import {ButtonProps} from './types';

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  /* max-width: 85px; */
  height: 50px;
  padding: 5px;
  text-align: center;
  border-radius: 15px;
`;

const SmallButton: FC<ButtonProps> = props => {
  return (
    <ButtonView onPress={props.onPress} style={props.btnStyles}>
      <SmallText textStyle={props.textStyles}>{props.children}</SmallText>
    </ButtonView>
  );
};

export default SmallButton;
