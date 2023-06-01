import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {DimensionTheme} from '../shared';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

import {colors} from '../colors';
import {useNavigation} from '@react-navigation/native';
import {FeedProps} from '../type';
import {selectPersona} from '../../../redux/slices/userSlice';
import {useAppSelector} from '../../../redux/hooks';
import {
  PersonaLBGetquery
} from '../../../graphQL/Post/PersonaLBGet';
import {isBookmark, isLike} from '../../../LBCheck';
import {useLazyLoadQuery, useMutation} from 'react-relay';
import {Post_bookmarkMutation} from '../../../graphQL/Post/PostBookmark';
import {Post_likeMutation} from '../../../graphQL/Post/PostLike';
import {PostBookmarkMutation} from '../../../graphQL/Post/__generated__/PostBookmarkMutation.graphql';
import {PostLikeMutation} from '../../../graphQL/Post/__generated__/PostLikeMutation.graphql';

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

const FeedCard = (props: FeedProps) => {
  // const [like, setLike] = useState(false);
  // const [bookmark, setBookmark] = useState(false);
  const persona = useAppSelector(selectPersona);
  // const fetchData = async () => {
  //     try {
  //         const response = await persona_LBQuery(persona.id);
  //         setLike(isLike(response.likedPosts, props.feed_id));
  //         setBookmark(isBookmark(response.bookmarks, props.feed_id));
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     }
  // };
  const tempNavigation = useNavigation();

  const personaData = useLazyLoadQuery(
    PersonaLBGetquery,
    {id: persona.id},
    {fetchPolicy: 'network-only'},
  );

  const [like, setLike] = useState(
    isLike(personaData.getPublicPersona.likedPosts, props.feed_id),
  );
  const [bookmark, setBookmark] = useState(
    isBookmark(personaData.getPublicPersona.bookmarks, props.feed_id),
  );
  const [commitLike, isInFlightLike] =
    useMutation<PostLikeMutation>(Post_likeMutation);
  const [commitBookmark, isInFlightlike] = useMutation<PostBookmarkMutation>(
    Post_bookmarkMutation,
  );

  return (
    <TouchableOpacity
      style={style.CardGrayBox}
      onPress={() => {
        tempNavigation.navigate('DetailContent', props.feed_id);
      }}>
      <Text style={style.CardHeader}>{props.title}</Text>
      <View style={{marginStart: DimensionTheme.width(14)}}>
        <ProfileBox>
          <Image style={style.ProfileImage} source={props.author_img} />
          <Text
            style={{
              fontSize: DimensionTheme.fontSize(13),
              fontWeight: '600',
              color: 'black',
            }}>
            {props.author}
          </Text>
        </ProfileBox>
        <Text
          style={{
            fontSize: DimensionTheme.fontSize(12),
            width: DimensionTheme.width(307),
            textAlign: 'justify',
            color: 'black',
          }}>
          {props.content}
        </Text>
        <HashTagBox>
          {props.hash_tag?.map((tag: any, index?: number) => (
            <HashTag key={index}>#{tag}</HashTag>
          ))}
        </HashTagBox>
        <BottomBox>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                if (like) {
                  commitLike({
                    variables: {
                      postId: props.feed_id,
                    },
                    onCompleted(likedata) {
                      if (likedata.postLikeToggle === false) {
                        props.like -= 1;
                        setLike(false);
                      }
                    },
                    onError(error) {
                      console.log(`@likeToggle error: ${error}`);
                      Alert.alert('오류가 발생했습니다. 다시 시도해주세요.');
                    },
                  });
                } else {
                  commitLike({
                    variables: {
                      postId: props.feed_id,
                    },
                    onCompleted(likedata) {
                      if (likedata.postLikeToggle === true) {
                        props.like += 1;
                        setLike(true);
                      }
                    },
                    onError(error) {
                      console.log(`@likeToggle error: ${error}`);
                      Alert.alert('오류가 발생했습니다. 다시 시도해주세요.');
                    },
                  });
                }
              }}>
              <Image
                style={style.ReactionImage}
                source={
                  like
                    ? require('../../../assets/heart-filled.png')
                    : require('../../../assets/heart-empty.png')
                }
                resizeMode="contain"
              />
            </TouchableOpacity>
            <ReactionText>{props.like}</ReactionText>
            <TouchableOpacity
              onPress={() => {
                if (bookmark) {
                  commitBookmark({
                    variables: {
                      postId: props.feed_id,
                    },
                    onCompleted(bookmarkdata) {
                      if (!bookmarkdata.postBookmarkToggle) {
                        props.bookmark -= 1;
                        setBookmark(false);
                      }
                    },
                    onError(error) {
                      console.log(`@likeToggle error: ${error}`);
                      Alert.alert('오류가 발생했습니다. 다시 시도해주세요.');
                    },
                  });
                } else {
                  commitBookmark({
                    variables: {
                      postId: props.feed_id,
                    },
                    onCompleted(bookmarkdata) {
                      if (bookmarkdata.postBookmarkToggle === true) {
                        setBookmark(true);
                        props.bookmark += 1;
                      }
                    },
                    onError(error) {
                      console.log(`@likeToggle error: ${error}`);
                      Alert.alert('오류가 발생했습니다. 다시 시도해주세요.');
                    },
                  });
                }
              }}>
              <Image
                style={style.ReactionImage}
                source={
                  bookmark
                    ? require('../../../assets/bookmark-filled.png')
                    : require('../../../assets/bookmark-empty.png')
                }
                resizeMode="contain"
              />
            </TouchableOpacity>
            <ReactionText>{props.bookmark}</ReactionText>
            <Image
              style={style.ReactionImage}
              source={require('../../../assets/comment.png')}
              resizeMode="contain"
            />
            <ReactionText>{props.comment}</ReactionText>
          </View>
          <TouchableOpacity>
            <Image
              style={{
                width: DimensionTheme.width(15),
                height: DimensionTheme.width(15),
              }}
              source={require('../../../assets/more-image.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </BottomBox>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  CardGrayBox: {
    width: DimensionTheme.width(332),
    borderRadius: DimensionTheme.width(15),
    shadowOffset: {width: 0, height: DimensionTheme.width(2)},
    shadowColor: '#000000',
    shadowOpacity: 0.34,
    shadowRadius: DimensionTheme.width(1),
    paddingTop: DimensionTheme.width(16),
    paddingBottom: DimensionTheme.width(11),
    marginBottom: DimensionTheme.width(28),
    elevation: 5,
    backgroundColor: 'white',
  },
  CardHeader: {
    paddingLeft: DimensionTheme.width(14),
    paddingBottom: DimensionTheme.width(10),
    paddingRight: DimensionTheme.width(14),
    width: DimensionTheme.width(332),
    fontSize: DimensionTheme.fontSize(16),
    color: 'black',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: colors.graydark,
  },
  ProfileImage: {
    width: DimensionTheme.width(40),
    height: DimensionTheme.width(40),
    borderRadius: DimensionTheme.width(20),
    borderWidth: 1,
    borderColor: '#c1c1c1',
    marginRight: DimensionTheme.width(10),
  },
  ReactionImage: {
    marginRight: DimensionTheme.width(2),
    width: DimensionTheme.width(18),
    height: DimensionTheme.width(18),
  },
});

export default FeedCard;
