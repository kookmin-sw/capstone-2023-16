import React, { FC } from "react";
import { GestureResponderEvent } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { DimensionTheme } from "../shared";

interface buttonProps{
    img?: string,
    onPress: ((event:GestureResponderEvent) => void) | undefined,
};

const ButtonStyle = styled.TouchableOpacity`
    width: ${DimensionTheme.width(28)};
    height: ${DimensionTheme.height(28)};
    border-radius: ${DimensionTheme.width(14)};
    shadow-offset:{width:0, height: 0};
    shadow-opacity: 0.79;
    shadow-color: ${colors.purple};
    shadow-radius: ${DimensionTheme.width(2)};
    align-items: center;
    justify-content: center;
    margin-right: ${DimensionTheme.width(10)};
`;

const ButtonImg = styled.Image`
    width: ${DimensionTheme.width(28)};
    height: ${DimensionTheme.height(28)};
`

const TopButton = (props:buttonProps) => {
    return (
        <ButtonStyle onPress={props.onPress}>
            <ButtonImg source={require(props.img!)} />
        </ButtonStyle>
    );
};

export default TopButton;
