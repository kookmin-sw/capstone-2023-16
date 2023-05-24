/* eslint-disable prettier/prettier */
import React, {SetStateAction, useState, Dispatch, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  View,
} from 'react-native';
import {DimensionTheme} from '../common/shared';
import {colors} from '../common/colors';
import SmallButton from '../common/Buttons/SmallButton';
import {whiteBGpurpleSD} from '../common/theme';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import {useLazyLoadQuery} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import node from './__generated__/SearchQuery.graphql';

import {tagItem} from '../common/type';

interface FoldFilterProps {
  searchText: Dispatch<SetStateAction<string>>;
  searchType: Dispatch<SetStateAction<any>>;
  searchTagState: Dispatch<SetStateAction<boolean>>;
  searchEvent: Dispatch<SetStateAction<boolean>>;
}

// const getAllTagQuery = graphql`
//   query SearchQuery($tagSearch: GlobalID!) {
//     getAllTags(
//         sortingOpt: {},
//         bodyFilter: {mode:CONTAINS ,token: $tagSearch}
//     ) {
//       edges {
//         node {
//           id
//           body
//         }
//       }
//     }
//   }
// `;

const Search = (props: FoldFilterProps) => {
  const [search, setSearch] = useState('');
  const [render, setRender] = useState(true);
  // const [tagSearch, setTagSearch] = useState('');
  const [searchTypeList, setSearchTypeList] = useState([
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

  const tagSearch =
    search.length > 1 && search.charAt(0) === '#' ? search.substring(1) : '';

  const tagData = useLazyLoadQuery(
    getAllTagQuery,
    {tagSearch},
    {fetchPolicy: 'store-or-network'},
  );

  var tagList = [];

  // console.log(tagData.getALLTags.edges[0].node);
  useEffect(() => {
    console.log('Search', Object.values(tagData.getAllTags.edges));
    tagData.getAllTags.edges.map((value: any, index?: number) => {
      var tmp: tagItem = {
        node: value.node,
        state: false,
      };
      tagList.push(tmp);
    });
    console.log('tagList', tagList);
  }, [tagData]);

  return (
    <View style={style.SearchSection}>
      <View style={style.SearchBox}>
        <TextInput
          style={style.TextInput}
          placeholder="#으로 시작하면 태그 검색이 됩니다."
          placeholderTextColor={colors.graydark2}
          onChangeText={text => {
            setSearch(text);
            // setTagSearch(text);
            // if (text.charAt(0) === '#'){
            //     setTagSearch(text.substring(1));
            // } else {
            //     setTagSearch('');
            // }
          }}
        />
        <TouchableOpacity
          style={style.SearchBtn}
          onPress={() => {
            if (search === '') {
              props.searchText(search);
              if (search.includes('#')) {
                props.searchTagState(true);
              } else {
                props.searchTagState(false);
                props.searchType(searchTypeList);
              }
              props.searchEvent(true);
            } else {
              Toast.show({
                type: 'error',
                text1: '검색 사항 없음',
                text2: '검색 사항이 존재하지 않습니다. 다시 입력해주세요.',
              });
            }
          }}>
          <Image
            style={style.SearchBtnImg}
            source={require('../../assets/search-white.png')}
          />
        </TouchableOpacity>
      </View>
      {search.charAt(0) !== '#' && (
        <View style={style.SearchTypes}>
          {searchTypeList.map(
            (value: {type: string; state: boolean}, index?: number) => {
              return (
                <SmallButton
                  key={index}
                  btnStyles={{
                    ...whiteBGpurpleSD.btnStyle,
                    width: 'auto',
                    height: DimensionTheme.width(30),
                    paddingTop: DimensionTheme.width(1),
                    paddingStart: DimensionTheme.width(15),
                    paddingEnd: DimensionTheme.width(15),
                    paddingBottom: DimensionTheme.width(2),
                    borderRadius: DimensionTheme.width(8),
                    marginEnd: DimensionTheme.width(10),
                    backgroundColor: value.state
                      ? colors.categorypurple
                      : 'white',
                  }}
                  textStyles={{
                    color: colors.black,
                    fontSize: DimensionTheme.fontSize(14),
                  }}
                  onPress={() => {
                    searchTypeList[index!].state =
                      !searchTypeList[index!].state;
                    setSearchTypeList(searchTypeList);
                    setRender(!render);
                  }}>
                  {value.type}
                </SmallButton>
              );
            },
          )}
        </View>
      )}
      {search.charAt(0) === '#' && <View />}
    </View>
  );
};

const style = StyleSheet.create({
  SearchSection: {
    width: '100%',
    paddingStart: DimensionTheme.width(30),
    paddingEnd: DimensionTheme.width(30),
  },
  SearchBox: {
    display: 'flex',
    flexDirection: 'row',
    height: DimensionTheme.width(43),
    justifyContent: 'space-between',
    marginBottom: DimensionTheme.width(13),
  },
  TextInput: {
    width: DimensionTheme.width(280),
    height: DimensionTheme.width(43),
    fontSize: DimensionTheme.fontSize(14),
    paddingStart: DimensionTheme.width(18),
    alignItems: 'center',
    color: 'black',
    overflow: 'hidden',
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 2,
    borderRadius: DimensionTheme.width(10),
  },
  SearchBtn: {
    width: DimensionTheme.width(43),
    height: DimensionTheme.width(43),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    backgroundColor: colors.primary,
    borderRadius: DimensionTheme.width(10),
  },
  SearchBtnImg: {
    width: DimensionTheme.width(23),
    height: DimensionTheme.width(22.63),
  },
  SearchTypes: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: DimensionTheme.width(17),
  },
});

export default Search;
