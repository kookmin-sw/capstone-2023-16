import React, { FC } from "react";
import styled from "styled-components/native";
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

import { colors } from "../colors";
import SmallText from "../Texts/SmallText";

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  background-color: ${colors.white};
`;

interface ButtonProps {
  btnStyles?: StyleProp<ViewStyle>;
  onPress: ((evnet: GestureResponderEvent) => void) | undefined;
  textStyles?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const TextButton: FC<ButtonProps> = (props) => {
  return (
    <ButtonView onPress={props.onPress} style={props.btnStyles}>
      <SmallText textStyle={props.textStyles}>{props.children}</SmallText>
    </ButtonView>
  );
};

export default TextButton;
