/* eslint-disable prettier/prettier */
import React, {FC, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  RefreshControl
} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';

import TopButton from '../components/Main/TopButton';
import {DimensionTheme} from '../components/common/shared';
import FeedCategory from '../components/Main/FeedCategory';
import FeedCard from '../components/common/Cards/FeedCard';
import {NavigationData} from '../navigation/AppNavigator';

import {useLazyLoadQuery} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import {imagePath} from '../utils/imagePath';

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
  width: ${DimensionTheme.width(333)}px;
  padding-bottom: ${DimensionTheme.width(5)}px;
  margin-bottom: ${DimensionTheme.width(18)}px;
`;

const getPublicPostsQuery = graphql`
  query MainScreenQuery {
    getPublicPosts(sortingOpt: {}) {
      edges {
        node {
          id
          author {
            id
            nickname
          }
          contentPreview
          tags {
            edges {
              node {
                body
              }
            }
          }
          likeCnt
          paidContent
          title
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
    console.log('main:', data.getPublicPosts.edges[0].node);
  }, [data]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const [feedChoice1, setFeedChoice1] = useState(true);
  const [feedChoice2, setFeedChoice2] = useState(false);
  const [feedChoice3, setFeedChoice3] = useState(false);

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
            img={require('../assets/search-black.png')}
          />
          <TopButton
            width={28}
            height={28}
            onPress={() => {
              navigation.navigate('MyPage');
            }}
            img={require('../assets/profileImg.png')}
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
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
              }
              style={{width: '100%'}}
              contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
              showsVerticalScrollIndicator={false}>
              {feedChoice1 &&
                data.getPublicPosts.edges.map((value:any, index?:number) => (
                  <FeedCard
                    key={index}
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
                data.getPublicPosts.edges.map((value:any, index?:number) => (
                  <FeedCard
                    key={index}
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
                data.getPublicPosts.edges.map((value:any, index?:number) => (
                  <FeedCard
                    key={index}
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
