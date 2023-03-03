import React, { FC } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";
import RegularText from "../Texts/RegularText";

import { ButtonProps } from "./types";

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  background-color: ${colors.white};
  width: 100%;
  padding: 12px;
  border-radius: 15px;
  border: solid 3px ${colors.gray};
  shadow-color: ${colors.gray};
  shadow-opacity: 0.9;
  shadow-radius: 3,
  elevation: 5;
`;

const RegularButton: FC<ButtonProps> = (props) => {
  return (
    <ButtonView onPress={props.onPress} style={props.btnStyles}>
      <RegularText textStyle={props.textStyles}>{props.children}</RegularText>
    </ButtonView>
  );
};

export default RegularButton;
