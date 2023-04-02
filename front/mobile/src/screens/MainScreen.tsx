/* eslint-disable prettier/prettier */
import React, {FC, useEffect} from 'react';
import {SafeAreaView, ScrollView, Image, StyleSheet, View} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';

import {colors} from '../components/common/colors';
import TopButton from '../components/Main/TopButton';
import {DimensionTheme} from '../components/common/shared';
import FeedCategory from '../components/Main/FeedCategory';
import FeedCard from '../components/common/Cards/FeedCard';
import {NavigationData} from '../navigation/AuthNavigator';

import {useLazyLoadQuery} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import {imagePath} from '../utils/imagePath';

const HeaderBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: ${DimensionTheme.width(9)};
  height: ${DimensionTheme.width(60)};
`;

const LibraryTool = styled.View`
  width: 100%;
  align-items: center;
  height: ${DimensionTheme.height(792)};
  border-top-left-radius: ${DimensionTheme.width(40)};
  border-top-right-radius: ${DimensionTheme.width(40)};
  padding-top: ${DimensionTheme.height(39)};
  border-width: 2;
  border-color: ${colors.gray};
  background-color: white;
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
  const data = useLazyLoadQuery(
    getPublicPostsQuery,
    {},
    {fetchPolicy: 'store-or-network'},
  );

  useEffect(() => {
    console.log(data.getPublicPosts.edges[0].node);
  }, [data]);
  const example = [
    {
      feed_id: 1,
      title: '반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
      author: '홍현지',
      author_id: '@hongs_0430',
      author_img: String(require('../assets/profileImg.png')),
      content:
        "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
      like: 16,
      bookmark: 16,
      comment: 3,
      hash_tag: ['대학', '조별과제'],
      like_check: true,
      bookmark_check: false,
    },
    {
      feed_id: 2,
      title: '반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
      author: '홍현지',
      author_id: '@hongs_0430',
      author_img: String(require('../assets/profileImg.png')),
      content:
        "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
      like: 16,
      bookmark: 16,
      comment: 3,
      hash_tag: ['대학', '조별과제'],
      like_check: true,
      bookmark_check: false,
    },
    {
      feed_id: 3,
      title: '반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
      author: '홍현지',
      author_id: '@hongs_0430',
      author_img: String(require('../assets/profileImg.png')),
      content:
        "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
      like: 16,
      bookmark: 16,
      comment: 3,
      hash_tag: ['대학', '조별과제'],
      like_check: true,
      bookmark_check: false,
    },
  ];

  return (
    <SafeAreaView>
      <View style={style.BackgroundView}>
        <HeaderBox>
          <Image
            style={style.HearderTitle}
            source={require('../assets/logoText.png')}
            resizeMode="contain"
          />
          <TopButton
            onPress={() => {}}
            img={String(require('../assets/search-black.png'))}
          />
          <TopButton
            onPress={() => {
              navigation.navigate('MyPage');
            }}
            img={String(require('../assets/profileImg.png'))}
          />
        </HeaderBox>
        <LibraryTool>
          <CategoryScroll horizontal={true}>
            <FeedCategory onPress={() => {}} img={''}>
              추천 피드
            </FeedCategory>
            <FeedCategory onPress={() => {}} img={''}>
              오늘의 베스트 피드
            </FeedCategory>
          </CategoryScroll>
          <ScrollView>
            {data.getPublicPosts.edges.map(value => (
              <FeedCard
                title={value.node.title}
                feed_id={value.node.id}
                author={value.node.author.nickname}
                author_id={value.node.author.id}
                author_img={imagePath.avatar}
                content={value.node.contentPreview}
                like={1}
                bookmark={2}
                comment={1}
                hash_tag={['대학', '조별과제']}
                like_check={true}
                bookmark_check={true}
              />
            ))}
          </ScrollView>
        </LibraryTool>
      </View>
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
    backgroundColor: colors.secondary,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});

export default MainScreen;
