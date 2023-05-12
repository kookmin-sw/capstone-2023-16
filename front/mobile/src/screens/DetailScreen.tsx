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
import CommentInput from '../components/Detail/CommentInput';
import BookmarkBtn from '../components/Detail/BookmarkBtn';
import {NavigationData} from '../navigation/AppNavigator';
import Comment from '../components/Detail/Comment';

import {useLazyLoadQuery} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';

const getPostQuery = graphql`
  query DetailScreenQuery($id: GlobalID!) {
    getPost(postId: $id) {
      id
      contentPreview
      content
      createdAt
      likeCnt
      paidContent
      requiredMembershipTier
      title
      tags {
        edges {
          node {
            body
          }
        }
      }
      comments {
        id
      }
      category {
        body
      }
      author {
        nickname
        id
      }
    }
  }
`;

type Props = NavigationData<'DetailContent'>;

const DetailScreen: FC<Props> = ({route, navigation}: Props) => {
  const props = route.params;
  const [like, setLike] = useState(props.like);
  const [likeCheck, setLikeCheck] = useState(props.like_check);
  const [bookmark, setBookmark] = useState(props.bookmark);
  const [bookmarkCheck, setBookmarkCheck] = useState(props.bookmark_check);
  const [commentCount, setCommentCount] = useState(props.comment);
  const [render, setRender] = useState(false);

  const CommentExample = [
    {
      id: 0,
      profile_img: String(require('../assets/profileImg.png')),
      nickname: '홍현지',
      comment: '고양이 귀여웡',
      date: '2020.01.01',
    },
    {
      id: 1,
      profile_img: String(require('../assets/profileImg.png')),
      nickname: '홍현지',
      comment: '고양이 귀여웡',
      date: '2020.01.01',
    },
    {
      id: 2,
      profile_img: String(require('../assets/profileImg.png')),
      nickname: '홍현지',
      comment: '고양이 귀여웡',
      date: '2020.01.01',
    },
  ];

  return (
    <SafeAreaView>
      <ImageBackground
        style={style.BackGroundView}
        source={require('../assets/background2.png')}>
        <View style={style.Header}>
          <TouchableOpacity
            style={style.BackBtn}
            onPress={() => {
              navigation.pop();
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
              if (likeCheck) {
                setLikeCheck(false);
                setLike(like - 1);
              } else {
                setLike(like + 1);
                setLikeCheck(true);
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
              if (bookmarkCheck) {
                setBookmarkCheck(false);
                setBookmark(bookmark - 1);
              } else {
                setBookmark(bookmark + 1);
                setBookmarkCheck(true);
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
              feed_id={props.feed_id}
              title={props.title}
              author={props.author}
              author_img={props.author_img}
            />
            <Text style={style.Text}>{props.content}</Text>
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
                  if (likeCheck) {
                    setLikeCheck(false);
                    setLike(like - 1);
                  } else {
                    setLike(like + 1);
                    setLikeCheck(true);
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
                  if (bookmarkCheck) {
                    setBookmarkCheck(false);
                    setBookmark(bookmark - 1);
                  } else {
                    setBookmark(bookmark + 1);
                    setBookmarkCheck(true);
                  }
                }}
                width={17}
                height={21}
              />
              <ReactBtn
                img={String(require('../assets/shared.png'))}
                onPress={() => {}}
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
            <CommentInput state={render} render={setRender} />
            <View
              style={{marginStart: DimensionTheme.width(19), height: 'auto'}}>
              {CommentExample.map((value, index) => {
                return (
                  <Comment
                    key={index}
                    user_id={value.id}
                    user_img={value.profile_img}
                    comment={value.comment}
                    date={value.date}
                    nickname={value.nickname}
                  />
                );
              })}
            </View>
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
