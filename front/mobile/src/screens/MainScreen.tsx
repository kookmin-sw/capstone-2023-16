/* eslint-disable prettier/prettier */
import React, {FC, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';

import TopButton from '../components/Main/TopButton';
import {DimensionTheme} from '../components/common/shared';
import {imagePath} from '../utils/imagePath';
import FeedCategory from '../components/Main/FeedCategory';
import FeedCard from '../components/common/Cards/FeedCard';
import {NavigationData} from '../navigation/AppNavigator';

import {useLazyLoadQuery} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import {MainScreenQuery$data} from './__generated__/MainScreenQuery.graphql';

const HeaderBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: ${DimensionTheme.width(9)}px;
  height: ${DimensionTheme.width(60)}px;
`;

const CategoryScroll = styled.ScrollView`
  display: flex;
  flex-direction: row;
  width: ${DimensionTheme.width(333)};
  padding-bottom: ${DimensionTheme.width(5)};
  margin-bottom: ${DimensionTheme.height(18)};
`;

const getPublicPostsQuery = graphql`
  query MainScreenQuery {
    getPublicPosts(sortingOpt: {}) {
      edges {
        node {
          id
          contentPreview
          createdAt
          tags {
            edges {
              node {
                body
                id
              }
            }
          }
          title
          author {
            nickname
            id
          }
        }
      }
    }
  }
`;

type Props = NavigationData<'Main'>;

const MainScreen: FC<Props> = ({navigation}) => {
  const data: MainScreenQuery$data = useLazyLoadQuery(
    getPublicPostsQuery,
    {},
    {fetchPolicy: 'store-or-network'},
  );

  useEffect(() => {
    console.log('##main');
    console.log(data.getPublicPosts.edges[0]);
  }, [data]);

  const [feedChoice1, setFeedChoice1] = useState(true);
  const [feedChoice2, setFeedChoice2] = useState(false);
  const [feedChoice3, setFeedChoice3] = useState(false);
  // const example = [
  //   {
  //     feed_id: 1,
  //     title: '반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
  //     author: '홍현지',
  //     author_id: '@hongs_0430',
  //     author_img: String(require('../assets/profileImg.png')),
  //     content:
  //       "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
  //     like: 16,
  //     bookmark: 16,
  //     comment: 3,
  //     hash_tag: ['대학', '조별과제'],
  //     like_check: true,
  //     bookmark_check: false,
  //   },
  //   {
  //     feed_id: 2,
  //     title: '반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
  //     author: '홍현지',
  //     author_id: '@hongs_0430',
  //     author_img: String(require('../assets/profileImg.png')),
  //     content:
  //       "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
  //     like: 16,
  //     bookmark: 16,
  //     comment: 3,
  //     hash_tag: ['대학', '조별과제'],
  //     like_check: true,
  //     bookmark_check: false,
  //   },
  //   {
  //     feed_id: 3,
  //     title: '반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
  //     author: '홍현지',
  //     author_id: '@hongs_0430',
  //     author_img: String(require('../assets/profileImg.png')),
  //     content:
  //       "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
  //     like: 16,
  //     bookmark: 16,
  //     comment: 3,
  //     hash_tag: ['대학', '조별과제'],
  //     like_check: true,
  //     bookmark_check: false,
  //   },
  // ];

  // const example2 = [
  //   {
  //     feed_id: 1,
  //     title: '2반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
  //     author: '홍현지',
  //     author_id: '@hongs_0430',
  //     author_img: String(require('../assets/profileImg.png')),
  //     content:
  //       "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
  //     like: 16,
  //     bookmark: 16,
  //     comment: 3,
  //     hash_tag: ['대학', '조별과제'],
  //     like_check: true,
  //     bookmark_check: false,
  //   },
  //   {
  //     feed_id: 2,
  //     title: '2반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
  //     author: '홍현지',
  //     author_id: '@hongs_0430',
  //     author_img: String(require('../assets/profileImg.png')),
  //     content:
  //       "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
  //     like: 16,
  //     bookmark: 16,
  //     comment: 3,
  //     hash_tag: ['대학', '조별과제'],
  //     like_check: true,
  //     bookmark_check: false,
  //   },
  //   {
  //     feed_id: 3,
  //     title: '2반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
  //     author: '홍현지',
  //     author_id: '@hongs_0430',
  //     author_img: String(require('../assets/profileImg.png')),
  //     content:
  //       "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
  //     like: 16,
  //     bookmark: 16,
  //     comment: 3,
  //     hash_tag: ['대학', '조별과제'],
  //     like_check: true,
  //     bookmark_check: false,
  //   },
  // ];

  // const example3 = [
  //   {
  //     feed_id: 1,
  //     title: '3반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
  //     author: '홍현지',
  //     author_id: '@hongs_0430',
  //     author_img: String(require('../assets/profileImg.png')),
  //     content:
  //       "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
  //     like: 16,
  //     bookmark: 16,
  //     comment: 3,
  //     hash_tag: ['대학', '조별과제'],
  //     like_check: true,
  //     bookmark_check: false,
  //   },
  //   {
  //     feed_id: 2,
  //     title: '3반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
  //     author: '홍현지',
  //     author_id: '@hongs_0430',
  //     author_img: String(require('../assets/profileImg.png')),
  //     content:
  //       "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
  //     like: 16,
  //     bookmark: 16,
  //     comment: 3,
  //     hash_tag: ['대학', '조별과제'],
  //     like_check: true,
  //     bookmark_check: false,
  //   },
  //   {
  //     feed_id: 3,
  //     title: '3반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
  //     author: '홍현지',
  //     author_id: '@hongs_0430',
  //     author_img: String(require('../assets/profileImg.png')),
  //     content:
  //       "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
  //     like: 16,
  //     bookmark: 16,
  //     comment: 3,
  //     hash_tag: ['대학', '조별과제'],
  //     like_check: true,
  //     bookmark_check: false,
  //   },
  // ];

  navigation.reset;

  return (
    <SafeAreaView>
      <ImageBackground
        style={style.BackgroundView}
        source={require('../assets/background1.png')}>
        <HeaderBox>
          <Image
            style={style.HearderTitle}
            source={require('../assets/logoText.png')}
            resizeMode="contain"
          />
          <TopButton
            width={18}
            height={18}
            onPress={() => {
              navigation.navigate('FilterContent');
            }}
            img={String(require('../assets/search-black.png'))}
          />
          <TopButton
            width={28}
            height={28}
            onPress={() => {
              navigation.navigate('MyPage');
            }}
            img={String(require('../assets/profileImg.png'))}
          />
        </HeaderBox>
        <View style={style.LibraryTool}>
          <View style={style.LibraryToolShadow}>
            <CategoryScroll
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <FeedCategory
                onPress={() => {
                  setFeedChoice1(true);
                  setFeedChoice2(false);
                  setFeedChoice3(false);
                }}
                img={''}>
                추천 피드
              </FeedCategory>
              <FeedCategory
                onPress={() => {
                  setFeedChoice1(false);
                  setFeedChoice2(true);
                  setFeedChoice3(false);
                }}
                img={''}>
                오늘의 베스트 피드
              </FeedCategory>
              <FeedCategory
                onPress={() => {
                  setFeedChoice1(false);
                  setFeedChoice2(false);
                  setFeedChoice3(true);
                }}
                img={''}>
                피드 예시3
              </FeedCategory>
            </CategoryScroll>
            <ScrollView
              style={{width: '100%'}}
              contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
              showsVerticalScrollIndicator={false}>
              {feedChoice1 &&
                data.getPublicPosts.edges.map(value => (
                  <FeedCard
                    key={value.node.id}
                    title={value.node.title}
                    feed_id={value.node.id}
                    author={value.node.author.nickname}
                    author_id={value.node.author.id}
                    author_img={imagePath.avatar}
                    content={value.node.contentPreview}
                    like={1}
                    bookmark={2}
                    comment={3}
                    hash_tag={['대학', '조별과제']}
                    like_check={true}
                    bookmark_check={false}
                  />
                ))}
              {feedChoice2 &&
                data.getPublicPosts.edges.map(value => (
                  <FeedCard
                    key={value.node.id}
                    title={value.node.title}
                    feed_id={value.node.id}
                    author={value.node.author.nickname}
                    author_id={value.node.author.id}
                    author_img={imagePath.avatar}
                    content={value.node.contentPreview}
                    like={2}
                    bookmark={3}
                    comment={4}
                    hash_tag={['IT', '조별과제']}
                    like_check={false}
                    bookmark_check={true}
                  />
                ))}
              {feedChoice3 &&
                data.getPublicPosts.edges.map(value => (
                  <FeedCard
                    key={value.node.id}
                    title={value.node.title}
                    feed_id={value.node.id}
                    author={value.node.author.nickname}
                    author_id={value.node.author.id}
                    author_img={imagePath.avatar}
                    content={value.node.contentPreview}
                    like={3}
                    bookmark={4}
                    comment={5}
                    hash_tag={['직장', '조별과제']}
                    like_check={true}
                    bookmark_check={false}
                  />
                ))}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  HeaderBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: DimensionTheme.width(9),
    height: DimensionTheme.height(60),
  },
  HearderTitle: {
    width: DimensionTheme.width(163),
    height: DimensionTheme.height(47),
    marginLeft: DimensionTheme.width(115),
    marginRight: DimensionTheme.width(30),
  },
  BackgroundView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  LibraryTool: {
    width: '100%',
    height: DimensionTheme.height(792),
    borderTopStartRadius: DimensionTheme.width(40),
    borderTopEndRadius: DimensionTheme.width(40),
    backgroundColor: 'white',
  },
  LibraryToolShadow: {
    width: '100%',
    alignItems: 'center',
    height: DimensionTheme.height(792),
    borderTopStartRadius: DimensionTheme.width(40),
    borderTopEndRadius: DimensionTheme.width(40),
    paddingTop: DimensionTheme.height(39),
    overflow: 'hidden',
    shadowOffset: {width: 0, height: DimensionTheme.width(2)},
    shadowColor: 'black',
    shadowRadius: DimensionTheme.width(8),
    shadowOpacity: 0.4,
    elevation: 3,
    borderRadius: DimensionTheme.width(10),
  },
});

export default MainScreen;
