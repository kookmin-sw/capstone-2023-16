/* eslint-disable prettier/prettier */
import React from 'react';
import { GestureResponderEvent, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DimensionTheme } from '../common/shared';

interface BtnProps {
    img: string;
    onPress: ((event:GestureResponderEvent) => void) | undefined;
    width: number;
    height: number;
}

const ReactBtn = (props:BtnProps) => {
    return (
        <TouchableOpacity style={style.Btn} onPress={props.onPress}>
            <Image style={{width: DimensionTheme.width(props.width), height: DimensionTheme.width(props.height)}} source={props.img} resizeMode='contain'/>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    Btn:{
        shadowColor:'#5B17CA',
        shadowOffset:{width:0, height:1},
        shadowOpacity: 60,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: DimensionTheme.width(42),
        height: DimensionTheme.width(42),
        marginEnd: DimensionTheme.width(23),
        borderRadius: DimensionTheme.width(21),
        backgroundColor: 'white',
        elevation: 6,
    },
});

export default ReactBtn;
