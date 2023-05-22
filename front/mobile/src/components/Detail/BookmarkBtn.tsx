/* eslint-disable prettier/prettier */
import React from 'react';
import { GestureResponderEvent, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DimensionTheme } from '../common/shared';

interface BtnProps {
    img: string;
    onPress: ((event:GestureResponderEvent) => void) | undefined;
    width: number;
    height: number;
}

const BookmarkBtn = (props:BtnProps) => {
    return (
        <TouchableOpacity style={style.Btn} onPress={props.onPress}>
            <Image style={{width: DimensionTheme.width(props.width), height: DimensionTheme.width(props.height)}} source={props.img} resizeMode='contain'/>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    Btn:{
        width: DimensionTheme.width(40),
        height: DimensionTheme.width(40),
        backgroundColor: 'white',
        borderTopEndRadius: DimensionTheme.width(5),
        borderTopStartRadius: DimensionTheme.width(5),
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: DimensionTheme.width(6),
    },
});

export default BookmarkBtn;
