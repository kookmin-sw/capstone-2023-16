/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import { DimensionTheme } from '../common/shared';

interface FoldFilterProps{
    text: string;
    state: boolean;
    onPress: ((event:GestureResponderEvent) => void)|undefined;
}

const FoldFilter = (props:FoldFilterProps) => {
    return (
        <TouchableOpacity style={style.TouchBox}>
            <Text style={style.text}>{props.text}</Text>
            <Image style={style.image} source={(props.state) ? require('../../assets/top_arrow.png') : require('../../assets/bottom_arrow.png')}/>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    TouchBox:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: DimensionTheme.width(18),
        width: DimensionTheme.width(320),
        marginStart: DimensionTheme.width(31),
        marginTop: DimensionTheme.width(17),
        marginBottom: DimensionTheme.width(16),
    },
    text:{
        fontSize: DimensionTheme.fontSize(14),
    },
    image:{
        width: DimensionTheme.width(18),
        height: DimensionTheme.width(18),
    },
});

export default FoldFilter;
