import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {
  GestureResponderEvent,
  Image,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {colors} from '../colors';
import SmallText from '../Texts/SmallText';
import {imagePath} from '../../../utils/imagePath';

const StyledView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledCheckBox = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border: solid 1px ${colors.graydark};
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
`;

type CheckboxProps = {
  label: string;
  viewStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  isChecked: boolean;
  onPress: ((event: GestureResponderEvent) => void) | undefined | undefined;
};

const CheckBox: FC<CheckboxProps> = props => {
  return (
    <StyledView style={props.viewStyle}>
      <StyledCheckBox onPress={props.onPress}>
        {props.isChecked ? <Image source={imagePath.check} /> : null}
      </StyledCheckBox>
      <SmallText textStyle={props.labelStyle}>{props.label}</SmallText>
    </StyledView>
  );
};

export default CheckBox;
