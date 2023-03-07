import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { StyleProp, TextStyle } from "react-native";

import { Feather } from "@expo/vector-icons";

import { colors } from "../colors";
import SmallText from "../Texts/SmallText";

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
  labelStyle?: StyleProp<TextStyle>;
};

const CheckBox: FC<CheckboxProps> = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <StyledView>
      <StyledCheckBox
        onPress={() => {
          setIsChecked(!isChecked);
        }}
      >
        {isChecked ? (
          <Feather name="check" style={{ color: colors.graydark }} />
        ) : null}
      </StyledCheckBox>
      <SmallText textStyle={props.labelStyle}>{props.label}</SmallText>
    </StyledView>
  );
};

export default CheckBox;
