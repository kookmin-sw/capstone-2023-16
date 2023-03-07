import React, { FC } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";

const StyledText = styled.Text`
  font-size: 24px;
  color: ${colors.black};
  text-align: center;
  font-weight: 700;
  line-height: 29px;
`;

import { TextProps } from "./types";

const RegularText: FC<TextProps> = (props) => {
  return <StyledText style={props.textStyle}>{props.children}</StyledText>;
};

export default RegularText;
