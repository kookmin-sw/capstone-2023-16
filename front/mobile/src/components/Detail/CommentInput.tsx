/* eslint-disable prettier/prettier */
import React, {useState, Dispatch, SetStateAction} from 'react';
import { TextInput, StyleSheet, GestureResponderEvent, TouchableOpacity, View, Image, Alert } from 'react-native';
import { DimensionTheme } from '../common/shared';
import { colors } from '../common/colors';
import { comments_inputMutation } from '../../graphQL/Post/CommentInput';
import { useMutation } from 'react-relay';
import { CommentInputMutation } from '../../graphQL/Post/__generated__/CommentInputMutation.graphql';

interface CommentInputProps{
    feed_id: string;
    render: Dispatch<SetStateAction<boolean>>;
    state: boolean;
}

const CommentInput = (props:CommentInputProps) => {
    const [comment, setComment] = useState('');
    const [commitCommnet, isInFlightComment] = useMutation<CommentInputMutation>(
        comments_inputMutation,
    );

    return (
        <View style={{display: 'flex', flexDirection: 'row'}}>
            <TextInput style={style.InputStyel} placeholder="댓글을 남겨주세요." placeholderTextColor={colors.graytext} value={comment} onChangeText={setComment}/>
            <TouchableOpacity style={style.BtnStyle} onPress={()=>{
                // props.render(!props.state);
                commitCommnet({
                    variables:{
                        postId:props.feed_id,
                        body:comment,
                    },
                    onCompleted(data){
                        console.log('CommnetInput: success');
                        setComment('');
                        props.render(!props.state);
                    },
                    onError(error){
                        console.log(`@CommentInputError: ${error}`);
                        Alert.alert('오류가 발생했습니다. 다시 시도해주세요.');
                    }
                })
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
