/* eslint-disable prettier/prettier */
import React from "react";
import styled from "styled-components/native";

import { DimensionTheme } from "../common/shared";
import { colors } from "../common/colors";
import { GestureResponderEvent } from "react-native";

interface btnProps{
    img?: string,
    children: React.ReactNode,
    onPress: ((event:GestureResponderEvent) => void)|undefined
}

const PinkButton = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    height: ${DimensionTheme.width(38)}px;
    border-radius: ${DimensionTheme.width(15)}px;
    border-color: ${colors.primary};
    border-width: 1.5px;
    margin-bottom: 6px;
    padding-left: ${DimensionTheme.width(16)}px;
    padding-right: ${DimensionTheme.width(16)}px;
    margin-right: ${DimensionTheme.width(10)}px;
`;

const BtnImg = styled.Image`
    width: ${DimensionTheme.width(24)}px;
    height: ${DimensionTheme.width(24)}px;
    margin-right: ${DimensionTheme.width(11)}px;
`;

const BtnText = styled.Text`
    font-size: ${DimensionTheme.fontSize(16)}px;
    color: black;
`

const FeedCategory = (props: btnProps) => {
    return (
        <PinkButton onPress={props.onPress}>
            {
                (props.img !== '') ? <BtnImg source={props.img!}/> : null
            }
            <BtnText>{props.children}</BtnText>
        </PinkButton>
    );
};

export default FeedCategory;