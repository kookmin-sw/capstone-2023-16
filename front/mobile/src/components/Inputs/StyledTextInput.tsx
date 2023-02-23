import React, { FC, useState } from "react";
import styled from "styled-components/native";
import {
  View,
  StyleProp,
  TextStyle,
  KeyboardType,
  TextInputProps,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { colors } from "../colors";
import { ScreenWidth } from "../shared";
import SmallText from "../Texts/SmallText";

const InputField = styled.TextInput`
  padding: 25px;
  border-radius: 10px;
  background-color: ${colors.white};
  color: ${colors.graydark};
  height: 50px;
  width: 100%;
  min-width: ${ScreenWidth * 0.8}px;
  shadow-color: ${colors.black};
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 0.1;
  shadow-radius: 3.8,
  elevation: 5;
`;

const ErrorMessage = styled.Text`
  color: ${colors.tertiary};
`;

const RightIcon = styled.TouchableOpacity`
  position: absolute;
  top: 38px;
  right: 15px;
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
