/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
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
                <Image style={style.img} source={(props.user_img !== null || props.user_img !== '') ? (props.user_img) : require('../../assets/imgs/profileImg.png')}/>
            </TouchableOpacity>
            <View style={{flexDirection:'column', width:DimensionTheme.width(270)}}>
                <TouchableOpacity style={{marginBottom: DimensionTheme.width(4)}}>
                    <Text style={style.text1}>{props.nickname}</Text>
                </TouchableOpacity>
                <Text style={style.text1}>{props.comment}</Text>
                <Text style={{...style.text2, marginTop:DimensionTheme.width(1)}}>{props.date}</Text>
            </View>
            <TouchableOpacity>
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
    },
    img:{
        width: DimensionTheme.width(35),
        height: DimensionTheme.height(35),
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
