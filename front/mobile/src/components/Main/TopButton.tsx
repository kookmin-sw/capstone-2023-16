/* eslint-disable prettier/prettier */
import React from 'react';
import { GestureResponderEvent, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '../common/colors';
import { DimensionTheme } from '../common/shared';

interface buttonProps{
    img?: string,
    onPress: ((event:GestureResponderEvent) => void) | undefined,
};

const TopButton = (props:buttonProps) => {
    return (
        <TouchableOpacity style={style.ButtonStyle} onPress={props.onPress}>
            <Image style={{width:DimensionTheme.width(28), height:DimensionTheme.height(28)}} source={props.img!} resizeMode="contain"/>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    ButtonStyle:{
        width: DimensionTheme.width(28),
        height: DimensionTheme.width(28),
        borderRadius: DimensionTheme.width(14),
        shadowOffset:{width:0, height: 0},
        shadowOpacity: 0.79,
        shadowColor: colors.primary,
        shadowRadius: DimensionTheme.width(2),
        elevation:1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: DimensionTheme.width(10),
    },
});

export default TopButton;
