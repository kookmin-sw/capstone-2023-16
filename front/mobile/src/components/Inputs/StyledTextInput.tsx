import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { View, StyleProp, TextStyle, TextInputProps } from "react-native";

import { Feather } from "@expo/vector-icons";

import { colors } from "../colors";
import { ScreenWidth } from "../shared";
import SmallText from "../Texts/SmallText";

const InputField = styled.TextInput`
  padding: 12px;
  border-radius: 10px;
  background-color: ${colors.white};
  color: ${colors.graydark};
  width: 100%;
  height: 50px;
  min-width: ${ScreenWidth * 0.8}px;
  shadow-color: ${colors.black};
  shadow-opacity: 0.1;
  shadow-radius: 3.8,
  elevation: 5;
`;

const ErrorMessage = styled.Text`
  color: ${colors.tertiary};
`;

const RightIcon = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 50%;
  z-index: 1;
`;

interface StyledTextInputProps extends TextInputProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  isPassword?: boolean;
}

const StyledTextInput: FC<StyledTextInputProps> = ({
  label,
  labelStyle,
  textStyle,
  isPassword,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <View style={{ marginBottom: 10 }}>
      <SmallText textStyle={labelStyle}>{label}</SmallText>
      <InputField {...props} secureTextEntry={isPassword && hidePassword} />
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
    </View>
  );
};

export default StyledTextInput;
