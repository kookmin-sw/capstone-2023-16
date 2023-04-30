/* eslint-disable prettier/prettier */
import React, {FC, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import SmallButton from '../components/common/Buttons/SmallButton';
import {colors} from '../components/common/colors';
import {DimensionTheme} from '../components/common/shared';
import {whiteBGpurpleSD} from '../components/common/theme';
import FoldFilter from '../components/Filter/FoldFilter';
import Search from '../components/Filter/Search';
import {tagData} from '../constants/tag';
import {NavigationData} from '../navigation/AppNavigator';
import FeedCard from '../components/common/Cards/FeedCard';
import CategorySelect from '../components/Filter/CategorySelect';

type Props = NavigationData<'FilterContent'>;

const FilterScreen: FC<Props> = ({navigation}) => {
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
  const [searchState, setSearchState] = useState(true);
  const [categoryState, setCategoryState] = useState(false);
  const [contentState, setContentState] = useState(false);
  const [search, setSearch] = useState([]);
  const [tagSearch, setTagSearch] = useState(false);
  const [category, setCategory] = useState(tagData);
  const [render, setRender] = useState(true);
  const [content, setContent] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState([
    {
      type: '제목만',
      state: true,
    },
    {
      type: '제목+내용',
      state: false,
    },
    {
      type: '내용',
      state: false,
    },
    {
      type: '작성자',
      state: false,
    },
  ]);
  const [searchEvent, setSearchEvent] = useState(false);

  if (searchEvent) {
    // search했을 때 이벤트
    // 일단 서치 버튼 눌렀을 때만 서치 이벤트 발동하도록 제작
  }

  return (
    <SafeAreaView style={{backgroundColor: 'white', minHeight: '100%'}}>
      <ScrollView style={style.Container}>
        <View style={style.Header}>
          <TouchableOpacity
            style={style.BackBtn}
            onPress={() => {
              navigation.pop();
            }}>
            <Image
              style={style.BackBtnImg}
              source={require('../assets/back_btn.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Image
            style={style.HeadetText}
            source={require('../assets/filter_header.png')}
            resizeMode="contain"
          />
        </View>
        <FoldFilter
          text="SEARCH"
          state={searchState}
          onPress={() => {
            setSearchState(!searchState);
          }}
        />
        {searchState && (
          <Search
            searchText={setSearchText}
            searchEvent={setSearchEvent}
            searchTagState={setTagSearch}
            searchType={setSearchType}
          />
        )}
        <FoldFilter
          text="CATEGORY"
          state={categoryState}
          onPress={() => {
            setCategoryState(!categoryState);
          }}
          type="category"
        />
        {categoryState && <CategorySelect categoryEvent={setCategory} />}
        <FoldFilter
          text="CONTENT"
          state={contentState}
          onPress={() => {
            setContentState(!contentState);
          }}
        />
        {contentState && (
          <View style={{marginStart: DimensionTheme.width(30)}}>
            {example.map((value, index) => (
              <FeedCard
                key={index}
                title={value.title}
                feed_id={value.feed_id}
                author={value.author}
                author_id={value.author_id}
                author_img={value.author_img}
                content={value.content}
                like={value.like}
                bookmark={value.bookmark}
                comment={value.comment}
                hash_tag={value.hash_tag}
                like_check={value.like_check}
                bookmark_check={value.bookmark_check}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  Header: {
    height: DimensionTheme.width(58),
    display: 'flex',
    flexDirection: 'row',
  },
  Container: {
    display: 'flex',
    flexDirection: 'column',
  },
  BackBtn: {
    width: DimensionTheme.width(22),
    height: DimensionTheme.width(22),
    marginStart: DimensionTheme.width(10),
    marginTop: DimensionTheme.width(16),
  },
  BackBtnImg: {
    width: DimensionTheme.width(22),
    height: DimensionTheme.width(22),
  },
  HeadetText: {
    width: DimensionTheme.width(66),
    height: DimensionTheme.width(24),
    marginTop: DimensionTheme.width(19),
    marginStart: DimensionTheme.width(130),
  },
});

export default FilterScreen;
