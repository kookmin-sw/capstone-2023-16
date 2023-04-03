/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import { DimensionTheme } from '../shared';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';

import { colors } from '../colors';
import { useNavigation } from '@react-navigation/native';
import { FeedProps } from '../type';

const ProfileBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: ${DimensionTheme.width(10)}px;
    margin-bottom: ${DimensionTheme.width(10)}px;
`;

const HashTagBox = styled.View`
    flex-direction: row;
    margin-top: ${DimensionTheme.width(2)}px;
    width: ${DimensionTheme.width(304)}px;
    margin-bottom: ${DimensionTheme.width(6)}px;
`;

const HashTag = styled.Text`
    font-size: ${DimensionTheme.fontSize(12)}px;
    color: black;
    margin-right: ${DimensionTheme.width(2)}px;
`;

const BottomBox = styled.View`
    margin-bottom: ${DimensionTheme.width(11)}px;
    width: ${DimensionTheme.width(306)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ReactionText = styled.Text`
    font-size: ${DimensionTheme.fontSize(10)}px;
    margin-right: ${DimensionTheme.width(8)}px;
    color: black;
`;

const FeedCard = (props :FeedProps) =>{
    const [like, setLike] = useState(props.like_check);
    const [bookmark, setBookmark] = useState(props.bookmark_check);
    const tempNavigation = useNavigation();
    console.log(props);

    return (
        <TouchableOpacity style={style.CardGrayBox} onPress={()=>{tempNavigation.navigate('DetailContent', props)}}>
            <Text style={style.CardHeader}>{props.title}</Text>
            <View style={{marginStart: DimensionTheme.width(14)}}>
                <ProfileBox>
                    <Image style={style.ProfileImage} source={props.author_img}/>
                    <Text style={{fontSize: DimensionTheme.fontSize(13), fontWeight: '600', color:'black'}}>{props.author}</Text>
                </ProfileBox>
                <Text style={{fontSize: DimensionTheme.fontSize(12), width:DimensionTheme.width(307), textAlign:'justify', color:'black'}}>{props.content}</Text>
                <HashTagBox>
                    {
                        props.hash_tag?.map(tag => <HashTag>#{tag}</HashTag>)
                    }
                </HashTagBox>
                <BottomBox>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{
                            if(like){
                                props.like -= 1;
                                setLike(false);
                            }else{
                                props.like += 1;
                                setLike(true);
                            }
                        }}>
                            <Image style={style.ReactionImage} source={(like)?require('../../../assets/heart-filled.png'):require('../../../assets/heart-empty.png')} resizeMode="contain"/>
                        </TouchableOpacity>
                        <ReactionText>{props.like}</ReactionText>
                        <TouchableOpacity onPress={()=>{
                            if(bookmark){
                                props.bookmark -= 1;
                                setBookmark(false);
                            }else{
                                props.bookmark += 1;
                                setBookmark(true);
                            }
                        }}>
                            <Image style={style.ReactionImage} source={(bookmark)?require('../../../assets/bookmark-filled.png'):require('../../../assets/heart-empty.png')} resizeMode="contain"/>
                        </TouchableOpacity>
                        <ReactionText>{props.bookmark}</ReactionText>
                        <Image style={style.ReactionImage} source={require('../../../assets/comment.png')} resizeMode="contain"/>
                        <ReactionText>{props.comment}</ReactionText>
                    </View>
                    <TouchableOpacity>
                        <Image style={{width:DimensionTheme.width(15), height: DimensionTheme.width(15)}} source={require('../../../assets/more-image.png')} resizeMode="contain"/>
                    </TouchableOpacity>
                </BottomBox>
            </View>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    CardGrayBox:{
        width: DimensionTheme.width(332),
        borderRadius: DimensionTheme.width(15),
        shadowOffset: {width: 0, height: DimensionTheme.width(2)},
        shadowColor: '#000000',
        shadowOpacity: 0.34,
        shadowRadius: DimensionTheme.width(1),
        paddingTop: DimensionTheme.width(16),
        paddingBottom: DimensionTheme.width(11),
        marginBottom: DimensionTheme.width(28),
        elevation:5,
        backgroundColor: 'white',
    },
    CardHeader:{
        paddingLeft: DimensionTheme.width(14),
        paddingBottom: DimensionTheme.width(10),
        paddingRight: DimensionTheme.width(14),
        width: DimensionTheme.width(332),
        fontSize: DimensionTheme.fontSize(16),
        color: 'black',
        borderWidth:0,
        borderBottomWidth: 1,
        borderColor: colors.graydark,
    },
    ProfileImage:{
        width: DimensionTheme.width(40),
        height: DimensionTheme.width(40),
        borderRadius: DimensionTheme.width(20),
        borderWidth: 1,
        borderColor: '#c1c1c1',
        marginRight: DimensionTheme.width(10),
    },
    ReactionImage:{
        marginRight: DimensionTheme.width(2),
        width: DimensionTheme.width(18),
        height: DimensionTheme.width(18),
    },
});

export default FeedCard;
