/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert } from "react-native";
import { colors } from '../common/colors';
import { DimensionTheme } from '../common/shared';

interface CommentProps {
    user_id: number;
    nickname: string;
    comment: string;
    user_img: string;
    date: string;
}

const Comment = (props:CommentProps) => {
    return (
        <View style={style.commentBox}>
            <TouchableOpacity style={style.imgBtn}>
                <Image style={style.img} source={(props.user_img !== null || props.user_img !== '') ? (props.user_img) : require('../../assets/profileImg.png')} resizeMode='contain'/>
            </TouchableOpacity>
            <View style={{flexDirection:'column', width:DimensionTheme.width(270)}}>
                <TouchableOpacity style={{marginBottom: DimensionTheme.width(4)}}>
                    <Text style={style.text1}>{props.nickname}</Text>
                </TouchableOpacity>
                <Text style={style.text1}>{props.comment}</Text>
                <Text style={{...style.text2, marginTop:DimensionTheme.width(1)}}>{props.date}</Text>
            </View>
            <TouchableOpacity onPress={()=>{Alert.alert('아직 구현되지 않은 기능입니다.');}}>
                <Text style={style.text2}>신고</Text>
            </TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create({
    commentBox:{
        width: DimensionTheme.width(356),
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: DimensionTheme.width(15),
        borderBottomWidth: 1,
        borderBottomColor: colors.borderpurple,
        paddingStart: DimensionTheme.width(8),
        marginTop: DimensionTheme.width(15),
    },
    imgBtn:{
        width: DimensionTheme.width(35),
        height: DimensionTheme.width(35),
        marginEnd: DimensionTheme.width(9),
        borderRadius: DimensionTheme.width(17.5),
        borderWidth: DimensionTheme.width(0.7),
        borderColor: colors.borderGray,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowRadius: DimensionTheme.width(4),
        shadowOpacity: 0.3,
        elevation: 4,
        backgroundColor: 'white',
    },
    img:{
        width: DimensionTheme.width(35),
        height: DimensionTheme.width(35),
        borderRadius: DimensionTheme.width(17.5),
    },
    text1:{
        fontSize: DimensionTheme.fontSize(14),
        color: 'black',
    },
    text2:{
        fontSize: DimensionTheme.fontSize(10),
        color: colors.graydark2,
    },
    report:{
        paddingStart: DimensionTheme.width(7)
    },
});

export default Comment;
