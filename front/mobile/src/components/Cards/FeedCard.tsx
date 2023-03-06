import React, {useState} from "react";
import styled from "styled-components/native";
import { DimensionTheme } from "../shared";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "../colors";

import ProfileImg from '../../assets/imgs/profileImg.png';
import LikeEmpty from '../../assets/imgs/heart-empty.png';
import LikeFill from '../../assets/imgs/heart-filled.png';
import BookmarkEmpty from '../../assets/imgs/bookmark-empty.png';
import BookmarkFill from '../../assets/imgs/bookmark-filled.png';
import Comment from '../../assets/imgs/comment.png';
import MoreImg from '../../assets/imgs/more-image.png';

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

const CardGrayBox = styled.TouchableOpacity`
    width: ${DimensionTheme.width(332)};
    border-radius: ${DimensionTheme.width(15)};
    border: none;
    shadow-offset: {width: 0, height: ${DimensionTheme.height(2)}};
    shadow-color: #000000;
    shadow-opacity:0.34;
    shadow-radius: ${DimensionTheme.width(10)};
    padding-top: ${DimensionTheme.height(16)};
    padding-bottom: ${DimensionTheme.height(11)};
    margin-bottom: ${DimensionTheme.height(28)};
`;

const CardHeader = styled.Text`
    padding-left: ${DimensionTheme.width(14)};
    padding-bottom: ${DimensionTheme.height(10)};
    padding-right: ${DimensionTheme.width(14)};
    width: ${DimensionTheme.width(304)};
    font-size: ${DimensionTheme.fontSize(16)};
    color: black;
    border-width: 0;
    border-bottom: 1;
    border-color: ${colors.graydark};
`;

const ProfileBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: ${DimensionTheme.height(10)};
    margin-bottom: ${DimensionTheme.height(10)};
`

const ProfileImage = styled.Image`
    width: ${DimensionTheme.width(40)};
    height: ${DimensionTheme.height(40)};
    border-radius: ${DimensionTheme.width(20)};
    border-width: 1;
    border-color: #c1c1c1;
    margin-right: ${DimensionTheme.width(10)};
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

const ReactionImage = styled.Image`
    margin-right: ${DimensionTheme.width(2)};
    width: ${DimensionTheme.width(18)};
    height: ${DimensionTheme.height(18)};
`

const ReactionText = styled.Text`
    font-size: ${DimensionTheme.fontSize(10)};
    margin-right: ${DimensionTheme.width(8)};
`

const FeedCard = (props :feedCardProps) =>{
    const [like, setLike] = useState(props.like_check);
    const [bookmark, setBookmark] = useState(props.bookmark_check);

    return(
        <CardGrayBox>
            <CardHeader>{props.title}</CardHeader>
            <View style={{marginStart: DimensionTheme.width(14)}}>
                <ProfileBox>
                    <ProfileImage source={((props.author_img)!=="")?require(props.author_img!):require(ProfileImg)}/>
                    <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                        <Text style={{fontSize: DimensionTheme.fontSize(13), fontWeight: '600'}}>{props.author}</Text>
                        <Text style={{fontSize: DimensionTheme.fontSize(10), marginTop: DimensionTheme.height(2)}}>{props.author_id}</Text>
                    </View>
                </ProfileBox>
                <Text style={{fontSize: DimensionTheme.fontSize(12), marginStart:DimensionTheme.width(14), width:DimensionTheme.width(307), textAlign:'justify'}}>{props.content}</Text>
                <HashTagBox>
                    {
                        props.hash_tag?.map(tag => <HashTag>#{tag}</HashTag>)
                    }
                </HashTagBox>
                <BottomBox>
                    <View>
                        <TouchableOpacity onPress={()=>{
                            if(like){
                                props.like -= 1;
                                setLike(false);
                            }else{
                                props.like += 1;
                                setLike(true);
                            }
                        }}>
                            <ReactionImage source={(like)?require(LikeFill):require(LikeEmpty)}/>
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
                            <ReactionImage source={(bookmark)?require(BookmarkFill):require(BookmarkEmpty)}/>
                        </TouchableOpacity>
                        <ReactionText>{props.bookmark}</ReactionText>
                        <ReactionImage source={require(Comment)}/>
                        <ReactionText>{props.comment}</ReactionText>
                    </View>
                    <TouchableOpacity>
                        <ReactionImage source={require(MoreImg)}/>
                    </TouchableOpacity>
                </BottomBox>
            </View>
        </CardGrayBox>
    );
};

export default FeedCard;
