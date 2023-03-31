/* eslint-disable prettier/prettier */
import React, {useState, Dispatch, SetStateAction} from 'react';
import { TextInput, StyleSheet, GestureResponderEvent, TouchableOpacity, View, Image } from 'react-native';
import { DimensionTheme } from '../common/shared';
import { colors } from '../common/colors';

interface CommentInputProps{
    user_id: number;
    board_id: number;
    render: Dispatch<SetStateAction<boolean>>;
    state: boolean;
}

const CommentInput = (props:CommentInputProps) => {
    const [comment, setComment] = useState('');

    return (
        <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextInput style={style.InputStyel} placeholder="댓글을 남겨주세요." placeholderTextColor={colors.graytext} value={comment} onChangeText={setComment}/>
            <TouchableOpacity style={style.BtnStyle} onPress={()=>{
                props.render(!props.state);
            }}>
                <Image style={style.ImgStyle} source={require('../../assets/comment_purple.png')} resizeMode='contain'/>
            </TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create({
    InputStyel: {
        marginStart: DimensionTheme.width(24),
        width: DimensionTheme.width(297),
        height: DimensionTheme.width(44),
        paddingStart: DimensionTheme.width(12),
        fontSize: DimensionTheme.fontSize(12),
        color: 'black',
        alignItems: 'center',
        marginEnd: DimensionTheme.width(10),
        borderColor: colors.purple1,
        borderWidth: 1,
        borderRadius: DimensionTheme.width(10),
    },
    BtnStyle: {
        width: DimensionTheme.width(42),
        height: DimensionTheme.width(44),
        borderColor: colors.purple1,
        borderWidth: 1,
        borderRadius: DimensionTheme.width(10),
        alignItems:'center',
        justifyContent: 'center',
    },
    ImgStyle:{
        width: DimensionTheme.width(28),
        height: DimensionTheme.width(23),
    },
});

export default CommentInput;
