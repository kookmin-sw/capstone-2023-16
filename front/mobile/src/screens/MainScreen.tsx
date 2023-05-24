import React, {FC, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  RefreshControl,
  Text,
} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';

import TopButton from '../components/Main/TopButton';
import {DimensionTheme} from '../components/common/shared';
import FeedCategory from '../components/Main/FeedCategory';
import FeedCard from '../components/common/Cards/FeedCard';
import {NavigationData} from '../navigation/AppNavigator';
import {imagePath} from '../utils/imagePath';

import {useLazyLoadQuery, usePaginationFragment} from 'react-relay';
import PostLikePaginationFragment from '../graphQL/Main/PostLikePaginationFragment';
import PostLikeListGetQuery from '../graphQL/Main/PostLikeListGetQuery';

import {selectPersona, setPersona} from '../redux/slices/userSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getInitPersona} from '../relay/Persona/getInitPersona';
import {storeData} from '../asyncstorage';
import PostSeeListGetQuery from '../graphQL/Main/PostSeeListGetQuery';
import PostSeePaginationFragment from '../graphQL/Main/PostSeePaginationFragment';
import PostIdListGetQuery from '../graphQL/Main/PostIdListGetQuery';
import PostIdPaginationFragment from '../graphQL/Main/PostIdPaginationFragment';

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

type Props = NavigationData<'Main'>;

const MainScreen: FC<Props> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const persona = useAppSelector(selectPersona);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (persona.id === '') {
      const fetchData = async () => {
        try {
          const response = await getInitPersona();
          console.log('cur : ', response[0].node);
          if (response.length === 0) navigation.navigate('BaseInfo');
          storeData('persona_id', response[0].node.id);
          dispatch(
            setPersona({
              id: response[0].node.id,
              nickname: response[0].node.nickname,
            }),
          );
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
    storeData('persona_id', persona.id);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const tmpLikeData = useLazyLoadQuery(
    PostLikeListGetQuery,
    {},
    {fetchPolicy: 'network-only'},
  );
  const tmpLikeAPI = usePaginationFragment<any, any>(
    PostLikePaginationFragment,
    tmpLikeData,
  );
  const likeSortdata = tmpLikeAPI.data;

  // const tmpSeeData = useLazyLoadQuery(
  //   PostSeeListGetQuery,
  //   {},
  //   {fetchPolicy: 'network-only'},
  // );

  // const tmpSeeAPI = usePaginationFragment<any, any>(
  //   PostSeePaginationFragment,
  //   tmpSeeData,
  // );
  // const SeeSortdata = tmpSeeAPI.data;

  const tmpIdData = useLazyLoadQuery(
    PostIdListGetQuery,
    {},
    {fetchPolicy: 'network-only'},
  );

  const tmpIdAPI = usePaginationFragment<any, any>(
    PostIdPaginationFragment,
    tmpIdData,
  );
  const IdSortdata = tmpIdAPI.data;

  useEffect(() => {
    console.log('main:', likeSortdata.getPublicPosts.edges);
  }, [likeSortdata]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh_like = React.useCallback(() => {
    setRefreshing(true);
    tmpLikeAPI.refetch({}, {fetchPolicy: 'network-only'});
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [tmpLikeAPI]);

  const onRefresh_id = React.useCallback(() => {
    setRefreshing(true);
    tmpIdAPI.refetch({}, {fetchPolicy: 'network-only'});
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [tmpIdAPI]);

  const [likeSort, setLikeSort] = useState(true);
  // const [seeSort, setSeeSort] = useState(false);
  const [idSort, setIdSort] = useState(false);

  const likeEnd = () => {
    if (
      !likeSortdata.getPublicPosts.pageInfo.hasNextPage ||
      tmpLikeAPI.isLoadingNext
    ) {
      return;
    }

    tmpLikeAPI.loadNext(10);
  };

  const idEnd = () => {
    if (
      !IdSortdata.getPublicPosts.pageInfo.hasNextPage ||
      tmpIdAPI.isLoadingNext
    ) {
      return;
    }

    tmpIdAPI.loadNext(10); 
  };

  navigation.reset;

  if (isLoading) {
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
              onPress={() => {}}
              img={require('../assets/search-black.png')}
            />
            <TopButton
              width={28}
              height={28}
              onPress={() => {}}
              img={require('../assets/profileImg.png')}
            />
          </HeaderBox>
          <View style={style.LibraryTool}>
            <View style={style.LibraryToolShadow}>
              <Text>...Loading...</Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

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
              navigation.navigate('MyPage', {
                isMine: true,
                nickname: persona.nickname,
                id: persona.id,
              });
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
                  setLikeSort(true);
                  // setSeeSort(false);
                  setIdSort(false);
                }}
                img={''}>
                좋아요피드
              </FeedCategory>
              {/* <FeedCategory
                onPress={() => {
                  setLikeSort(false);
                  setSeeSort(true);
                  setIdSort(false);
                }}
                img={''}>
                조회많은 피드
              </FeedCategory> */}
              <FeedCategory
                onPress={() => {
                  setLikeSort(false);
                  // setSeeSort(false);
                  setIdSort(true);
                }}
                img={''}>
                추천피드
              </FeedCategory>
            </CategoryScroll>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={likeSort ? onRefresh_like : onRefresh_id}
                />
              }
              onScrollEndDrag={likeSort ? likeEnd : idEnd}
              style={{width: '100%'}}
              contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
              showsVerticalScrollIndicator={false}>
              {likeSort &&
                likeSortdata.getPublicPosts.edges.map(
                  (value: any, index?: number) => (
                    <FeedCard
                      key={index}
                      title={value.node.title}
                      feed_id={value.node.id}
                      author={value.node.author.nickname}
                      author_id={value.node.author.id}
                      author_img={String(imagePath.avatar)}
                      content={value.node.contentPreview}
                      like={value.node.likeCnt}
                      bookmark={value.node.bookmarkCnt}
                      comment={value.node.commentCnt}
                      hash_tag={value.node.tags.edges}
                    />
                  ),
                )}
              {/* {
                  seeSort &&
                  SeeSortdata.getPublicPosts.edges.map((value: any, index?: number) => (
                    <FeedCard
                      key={index}
                      title={value.node.title}
                      feed_id={value.node.id}
                      author={value.node.author.nickname}
                      author_id={value.node.author.id}
                      author_img={String(imagePath.avatar)}
                      content={value.node.contentPreview}
                      like={value.node.likeCnt}
                      bookmark={value.node.bookmarkCnt}
                      comment={value.node.commentCnt}
                      hash_tag={value.node.tags.edges}
                    />
                  ))
                } */}
              {idSort &&
                IdSortdata.getPublicPosts.edges.map(
                  (value: any, index?: number) => (
                    <FeedCard
                      key={index}
                      title={value.node.title}
                      feed_id={value.node.id}
                      author={value.node.author.nickname}
                      author_id={value.node.author.id}
                      author_img={String(imagePath.avatar)}
                      content={value.node.contentPreview}
                      like={value.node.likeCnt}
                      bookmark={value.node.bookmarkCnt}
                      comment={value.node.commentCnt}
                      hash_tag={value.node.tags.edges}
                    />
                  ),
                )}
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
