/* eslint-disable prettier/prettier */
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import {DimensionTheme} from '../components/common/shared';

import DetailHeader from '../components/Detail/DetailHeader';
import ReactBtn from '../components/Detail/ReactBtn';
import BookmarkBtn from '../components/Detail/BookmarkBtn';
import {NavigationData} from '../navigation/AppNavigator';

import {useLazyLoadQuery, useMutation} from 'react-relay';
import {detail_getPostQuery} from '../graphQL/Post/DetailPost';
import {PostLikeMutation} from '../graphQL/Post/__generated__/PostLikeMutation.graphql';
import {Post_likeMutation} from '../graphQL/Post/PostLike';
import {PersonaLBGetquery} from '../graphQL/Post/PersonaLBGet';
import {useAppSelector} from '../redux/hooks';
import {selectPersona} from '../redux/slices/userSlice';
import {PostBookmarkMutation} from '../graphQL/Post/__generated__/PostBookmarkMutation.graphql';
import {Post_bookmarkMutation} from '../graphQL/Post/PostBookmark';
import {Alert} from 'react-native';
import CommentContent from '../components/Detail/CommentContent';
import { isBookmark, isLike } from '../LBCheck';
// import { BottomSheet } from '../components/common/BottomSheet/BottomSheet';
import HTMLView from 'react-native-htmlview';

type Props = NavigationData<'DetailContent'>;

const DetailScreen: FC<Props> = ({route, navigation}: Props) => {
  const feed_id: string = route.params as unknown as string;
  console.log(`post_id: ${feed_id}`);
  const persona = useAppSelector(selectPersona);

  const [render, setRender] = useState(false);

  const data = useLazyLoadQuery(
    detail_getPostQuery,
    {id: feed_id},
    {fetchPolicy: 'network-only'},
  );

  const personaData = useLazyLoadQuery(
    PersonaLBGetquery,
    {id: persona.id},
    {fetchPolicy: 'store-or-network'},
  );

  console.log('DetailPost:', data);
  console.log('PersonaData:', personaData.getPublicPersona.bookmarks);

  const [like, setLike] = useState(data.getPost.likeCnt);
  const [likeCheck, setLikeCheck] = useState(
    isLike(personaData.getPublicPersona.likedPosts, feed_id),
  );
  const [bookmark, setBookmark] = useState(data.getPost.bookmarkCnt);
  const [bookmarkCheck, setBookmarkCheck] = useState(
    isBookmark(personaData.getPublicPersona.bookmarks, feed_id),
  );
  const [commentCount, setCommentCount] = useState(data.getPost.commentCnt);
  const [commitLike, isInFlightLike] =
    useMutation<PostLikeMutation>(Post_likeMutation);
  const [commitBookmark, isInFlightlike] = useMutation<PostBookmarkMutation>(
    Post_bookmarkMutation,
  );

  

  return (
    <SafeAreaView>
      <ImageBackground
        style={style.BackGroundView}
        source={require('../assets/background2.png')}>
        <View style={style.Header}>
          <TouchableOpacity
            style={style.BackBtn}
            onPress={() => {
              navigation.pop;
            }}>
            <Image
              style={{
                width: DimensionTheme.width(22),
                height: DimensionTheme.width(22),
              }}
              source={require('../assets/back_btn.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <BookmarkBtn
            onPress={() => {
              if (!likeCheck) {
                commitLike({
                  variables: {
                    postId: feed_id,
                  },
                  onCompleted(likedata) {
                    if (likedata.postLikeToggle === true) {
                      setLikeCheck(true);
                      setLike(like + 1);
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
                    postId: feed_id,
                  },
                  onCompleted(likedata) {
                    if (likedata.postLikeToggle === false) {
                      setLikeCheck(false);
                      setLike(like - 1);
                    }
                  },
                  onError(error) {
                    console.log(`@likeToggle error: ${error}`);
                    Alert.alert('오류가 발생했습니다. 다시 시도해주세요.');
                  },
                });
              }
            }}
            img={
              likeCheck
                ? String(require('../assets/heart_purple_fill.png'))
                : String(require('../assets/heart_purple_empty.png'))
            }
            width={25}
            height={29}
          />
          <BookmarkBtn
            onPress={() => {
              if (!bookmarkCheck) {
                commitBookmark({
                  variables: {
                    postId: feed_id,
                  },
                  onCompleted(bookmarkdata) {
                    if (bookmarkdata.postBookmarkToggle === true) {
                      setBookmarkCheck(true);
                      setBookmark(like + 1);
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
                    postId: feed_id,
                  },
                  onCompleted(bookmarkdata) {
                    if (!bookmarkdata.postBookmarkToggle) {
                      setBookmarkCheck(false);
                      setBookmark(like - 1);
                    }
                  },
                  onError(error) {
                    console.log(`@likeToggle error: ${error}`);
                    Alert.alert('오류가 발생했습니다. 다시 시도해주세요.');
                  },
                });
              }
            }}
            img={
              bookmarkCheck
                ? String(require('../assets/bookmark_purple_fill.png'))
                : String(require('../assets/bookmark_purple_empty.png'))
            }
            width={18}
            height={22}
          />
        </View>
        <View style={style.BookPageStyle}>
          <View
            style={{
              width: '100%',
              height: DimensionTheme.height(22),
              backgroundColor: '(0,0,0,1)',
            }}
          />
          <ScrollView
            style={style.ScrollStyle}
            showsVerticalScrollIndicator={false}>
            <DetailHeader
              feed_id={data.getPost.id}
              title={data.getPost.title}
              author={data.getPost.author.nickname}
              author_id={data.getPost.author.id}
              author_img={String(require('../assets/profileImg.png'))}
            />
            <Text style={style.Text}>{data.getPost.content}</Text>
            <View
              style={{
                ...style.RowView,
                marginBottom: DimensionTheme.width(16),
                marginStart: DimensionTheme.width(24),
              }}>
              <ReactBtn
                img={
                  likeCheck
                    ? String(require('../assets/heart_purple_fill.png'))
                    : String(require('../assets/heart_purple_empty.png'))
                }
                onPress={() => {
                  if (!likeCheck) {
                    commitLike({
                      variables: {
                        postId: feed_id,
                      },
                      onCompleted(likedata) {
                        if (likedata.postLikeToggle) {
                          setLikeCheck(true);
                          setLike(like + 1);
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
                        postId: feed_id,
                      },
                      onCompleted(likedata) {
                        if (!likedata.postLikeToggle) {
                          setLikeCheck(false);
                          setLike(like - 1);
                        }
                      },
                      onError(error) {
                        console.log(`@likeToggle error: ${error}`);
                        Alert.alert('오류가 발생했습니다. 다시 시도해주세요.');
                      },
                    });
                  }
                }}
                width={28}
                height={33}
              />
              <ReactBtn
                img={
                  bookmarkCheck
                    ? String(require('../assets/bookmark_purple_fill.png'))
                    : String(require('../assets/bookmark_purple_empty.png'))
                }
                onPress={() => {
                  if (!bookmarkCheck) {
                    commitBookmark({
                      variables: {
                        postId: feed_id,
                      },
                      onCompleted(bookmarkdata) {
                        if (bookmarkdata.postBookmarkToggle) {
                          setBookmarkCheck(true);
                          setBookmark(like + 1);
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
                        postId: feed_id,
                      },
                      onCompleted(bookmarkdata) {
                        if (!bookmarkdata.postBookmarkToggle) {
                          setBookmarkCheck(false);
                          setBookmark(like - 1);
                        }
                      },
                      onError(error) {
                        console.log(`@likeToggle error: ${error}`);
                        Alert.alert('오류가 발생했습니다. 다시 시도해주세요.');
                      },
                    });
                  }
                }}
                width={17}
                height={21}
              />
              <ReactBtn
                img={String(require('../assets/shared.png'))}
                onPress={() => {
                  Alert.alert('아직 구현되지 않은 기능입니다.');
                }}
                width={26}
                height={26}
              />
            </View>
            <View
              style={{
                ...style.RowView,
                marginBottom: DimensionTheme.width(10),
                marginStart: DimensionTheme.width(24),
              }}>
              <Text style={style.ReactText}>좋아요 {like}개</Text>
              <Text style={style.ReactText}>북마크 {bookmark}개</Text>
              <Text style={style.ReactText}>댓글 {commentCount}개</Text>
            </View>
            <CommentContent
              feed_id={feed_id}
              render={setRender}
              state={render}
            />
            <View style={{height: DimensionTheme.width(100)}} />
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  BackGroundView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  BookPageStyle: {
    backgroundColor: 'white',
    width: DimensionTheme.width(393),
    borderTopRightRadius: DimensionTheme.width(40),
    height: DimensionTheme.height(802),
    shadowOffset: {width: 0, height: DimensionTheme.width(-1)},
    shadowColor: '#8C43EA',
    shadowRadius: DimensionTheme.width(11),
    shadowOpacity: 0.14,
    elevation: 8,
  },
  ScrollStyle: {
    width: DimensionTheme.width(393),
    backgroundColor: '(0,0,0,1)',
    minHeight: DimensionTheme.height(780),
    borderTopRightRadius: DimensionTheme.width(40),
  },
  Header: {
    flexDirection: 'row',
    marginStart: DimensionTheme.width(10),
    marginTop: DimensionTheme.width(12),
    height: 'auto',
  },
  BackBtn: {
    marginTop: DimensionTheme.width(4),
    width: DimensionTheme.width(22),
    height: DimensionTheme.width(22),
    marginEnd: DimensionTheme.width(232),
  },
  Text: {
    width: DimensionTheme.width(345),
    margin: DimensionTheme.width(24),
    marginBottom: DimensionTheme.width(33),
    fontSize: DimensionTheme.fontSize(14),
    color: 'black',
  },
  RowView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ReactText: {
    fontSize: DimensionTheme.fontSize(12),
    marginEnd: DimensionTheme.width(8),
    color: 'black',
  },
});

export default DetailScreen;
