/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import { DimensionTheme } from '../shared';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';

import { colors } from '../colors';

interface feedCardProps {
    feed_id: number,
    title?: string,
    author?: string,
    author_id?: string,
    author_img?: string,
    content?: string,
    like: number,
    bookmark: number,
    comment: number,
    hash_tag?: string[],
    like_check: boolean,
    bookmark_check: boolean,
};

const ProfileBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: ${DimensionTheme.height(10)};
    margin-bottom: ${DimensionTheme.height(10)};
`;

const HashTagBox = styled.View`
    flex-direction: row;
    margin-top: ${DimensionTheme.height(2)};
    width: ${DimensionTheme.width(304)};
    margin-bottom: ${DimensionTheme.height(6)};
`;

const HashTag = styled.Text`
    font-size: ${DimensionTheme.fontSize(12)};
    color: black;
    margin-right: ${DimensionTheme.width(2)};
`;

const BottomBox = styled.View`
    margin-bottom: ${DimensionTheme.height(11)};
    width: ${DimensionTheme.width(306)};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ReactionText = styled.Text`
    font-size: ${DimensionTheme.fontSize(10)};
    margin-right: ${DimensionTheme.width(8)};
`;

const FeedCard = (props :feedCardProps) =>{
    const [like, setLike] = useState(props.like_check);
    const [bookmark, setBookmark] = useState(props.bookmark_check);

    return (
        <TouchableOpacity style={style.CardGrayBox}>
            <Text style={style.CardHeader}>{props.title}</Text>
            <View style={{marginStart: DimensionTheme.width(14)}}>
                <ProfileBox>
                    <Image style={style.ProfileImage} source={props.author_img}/>
                    <View style={{flexDirection:'column', alignItems:'flex-start'}}>
                        <Text style={{fontSize: DimensionTheme.fontSize(13), fontWeight: '600'}}>{props.author}</Text>
                        <Text style={{fontSize: DimensionTheme.fontSize(10), marginTop: DimensionTheme.height(2)}}>{props.author_id}</Text>
                    </View>
                </ProfileBox>
                <Text style={{fontSize: DimensionTheme.fontSize(12), width:DimensionTheme.width(307), textAlign:'justify'}}>{props.content}</Text>
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
                            <Image style={style.ReactionImage} source={(like)?require('../../../assets/imgs/heart-filled.png'):require('../../../assets/imgs/heart-empty.png')} />
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
                            <Image style={style.ReactionImage} source={(bookmark)?require('../../../assets/imgs/bookmark-filled.png'):require('../../../assets/imgs/heart-empty.png')}/>
                        </TouchableOpacity>
                        <ReactionText>{props.bookmark}</ReactionText>
                        <Image style={style.ReactionImage} source={require('../../../assets/imgs/comment.png')}/>
                        <ReactionText>{props.comment}</ReactionText>
                    </View>
                    <TouchableOpacity>
                        <Image style={style.ReactionImage} source={require('../../../assets/imgs/more-image.png')} resizeMode="contain"/>
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
        borderWidth:1,
        shadowOffset: {width: 0, height: DimensionTheme.height(2)},
        shadowColor: '#000000',
        shadowOpacity: 0.34,
        shadowRadius: DimensionTheme.width(1),
        paddingTop: DimensionTheme.height(16),
        paddingBottom: DimensionTheme.height(11),
        marginBottom: DimensionTheme.height(28),
    },
    CardHeader:{
        paddingLeft: DimensionTheme.width(14),
        paddingBottom: DimensionTheme.height(10),
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
        height: DimensionTheme.height(18),
    },
});

export default FeedCard;
