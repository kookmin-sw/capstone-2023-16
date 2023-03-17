import React, {FC, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {
  StyleProp,
  TextStyle,
  TextInputProps,
  ViewStyle,
  Image,
} from 'react-native';

import {colors} from '../colors';
import SmallText from '../Texts/SmallText';
import {imagePath} from '../../../utils/imagePath';

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
  shadow-radius: 3px;
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
  top: 38px;
  z-index: 1;
  align-items: center;
  justfiy-content: center;
`;

interface StyledTextInputProps extends TextInputProps {
  viewStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  error?: string | boolean;
  touched?: boolean;
  isPassword?: boolean;
}

const StyledTextInput: FC<StyledTextInputProps> = ({
  viewStyle,
  label,
  labelStyle,
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
          }}>
          <Image source={hidePassword ? imagePath.eye_off : imagePath.eye} />
        </RightIcon>
      )}
      {error && touched ? <ErrorMessage>{error}</ErrorMessage> : null}
    </StyledTextInputContainer>
  );
};

export default StyledTextInput;