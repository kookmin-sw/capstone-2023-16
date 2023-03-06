import React from "react";
import styled from "styled-components/native";

import { DimensionTheme } from "../shared";
import { colors } from "../colors";
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
    height: ${DimensionTheme.height(43)};
    border-radius: ${DimensionTheme.width(15)};
    border-color: ${colors.purple};
    border-width: 1.5;
    padding-left: ${DimensionTheme.width(16)};
    padding-right: ${DimensionTheme.width(16)};
    margin-right: ${DimensionTheme.width(18)};
`;

const BtnImg = styled.Image`
    width: ${DimensionTheme.width(24)};
    height: ${DimensionTheme.height(24)};
    margin-right: ${DimensionTheme.width(11)};
`;

const BtnText = styled.Text`
    font-size: ${DimensionTheme.fontSize(16)};
`

const FeedCategory = (props: btnProps) => {
    return(
        <PinkButton onPress={props.onPress}>
            {
                (props.img !== null)?<BtnImg source={require(props.img!)}/>:null
            }
            <BtnText>{props.children}</BtnText>
        </PinkButton>
    )
};

export default FeedCategory;