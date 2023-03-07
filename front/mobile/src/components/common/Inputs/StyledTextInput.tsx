import React, { FC, useState } from "react";
import styled from "styled-components/native";
import {
  View,
  StyleProp,
  TextStyle,
  TextInputProps,
  ViewStyle,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { colors } from "../colors";
import SmallText from "../Texts/SmallText";

const StyledTextInputContainer = styled.View`
  margin-bottom: 10px;
`;

const InputField = styled.TextInput`
  padding: 12px;
  border-radius: 10px;
  background-color: ${colors.white};
  color: ${colors.graydark};
  height: 50px;
  min-width: 100%;
  shadow-color: ${colors.black};
  shadow-offset: 3px 3px;
  shadow-opacity: 0.1;
  shadow-radius: 3.8,
  elevation: 5;
`;

const ErrorMessage = styled.Text`
  color: ${colors.graydark};
  margin-top: 5px;
  margin-bottom: 10px;
`;

const RightIcon = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 50%;
  z-index: 1;
`;

interface StyledTextInputProps extends TextInputProps {
  viewStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  error?: string | boolean;
  touched?: boolean;
  isPassword?: boolean;
}

const StyledTextInput: FC<StyledTextInputProps> = ({
  viewStyle,
  label,
  labelStyle,
  textStyle,
  isPassword,
  error,
  touched,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <StyledTextInputContainer style={viewStyle}>
      <SmallText textStyle={labelStyle}>{label}</SmallText>
      <InputField
        style={viewStyle}
        {...props}
        secureTextEntry={isPassword && hidePassword}
      />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Feather
            name={hidePassword ? "eye-off" : "eye"}
            size={20}
            color={colors.graydark}
          />
        </RightIcon>
      )}
      {error && touched ? <ErrorMessage>{error}</ErrorMessage> : null}
    </StyledTextInputContainer>
  );
};

export default StyledTextInput;
