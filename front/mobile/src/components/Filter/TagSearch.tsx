/* eslint-disable prettier/prettier */
import React, { SetStateAction, useState, Dispatch, useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { DimensionTheme } from '../common/shared';
import { colors } from '../common/colors';

import {useLazyLoadQuery} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';

import { tagCategoryItem } from '../common/type';
import Tags from './Tags';

interface TagSearchProps{
    // searchTagState: Dispatch<SetStateAction<boolean>>;
    // searchEvent: Dispatch<SetStateAction<boolean>>;
    tagList: Array<string>;
    setTagList: Dispatch<SetStateAction<Array<string>>>;
    setSearchEvent: Dispatch<SetStateAction<boolean>>;
}

const getAllTagQuery = graphql`
  query TagSearchQuery($tagSearch: String!) {
    getAllTags(
        sortingOpt: {}, 
        bodyFilter: {mode:CONTAINS ,token: $tagSearch}
    ) {
      edges {
        node {
          id
          body
        }
      }
    }
  }
`;


const TagSearch = (props:TagSearchProps) => {
    // const [render, setRender] = useState(true);
    const [search, setSearch] = useState('');
    // const [allTags, setALLTags] = useState(props);

    const tagSearch = (search.length > 1 && search.charAt(0) === '#') ? search.substring(1) : '';

    const tagData = useLazyLoadQuery(
        getAllTagQuery,
        {tagSearch},
        {fetchPolicy: 'store-or-network'},
    );

    var tagList : Array<tagCategoryItem> = [];

    // console.log(tagData.getALLTags.edges[0].node);
    useEffect(() => {
        console.log('Search', Object.values(tagData.getAllTags.edges));
        tagData.getAllTags.edges.map((value: any, index?:number) => {
            var tmp : tagCategoryItem = {
                id: value.node.id,
                text: value.node.body,
                state: false,
            };
            tagList.push(tmp);
        })
        console.log('tagList', tagList);
    }, [tagData, search]);


    return (
        <View style={style.SearchSection}>
                <TextInput style={style.TextInput} placeholder="태그를 검색해주세요." placeholderTextColor={colors.graydark2} onChangeText={(text)=>{
                    setSearch(text);
                }}/>
        <Tags list={tagList} setTagList={props.setTagList} tagList={props.tagList} setSearchEvent={props.setSearchEvent}/>
        {/* <View style={style.SearchTypes}>
            {
                allTags.map((value: tagItem, index?:number) => {
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
                                backgroundColor: (value.state) ? colors.categorypurple : 'white',
                            }}
                            textStyles={{color: colors.black, fontSize:DimensionTheme.fontSize(14)}}
                            onPress={()=>{
                                searchTypeList[index!].state = !searchTypeList[index!].state;
                                setSearchTypeList(searchTypeList);
                                setRender(!render);
                            }}
                        >
                            {value.node.body}
                        </SmallButton>
                    )
                })
            }
        </View> */}
        </View>
    );
};

const style = StyleSheet.create({
    SearchSection:{
        width: '100%',
        paddingStart: DimensionTheme.width(30),
        paddingEnd: DimensionTheme.width(30),
    },
    SearchBox:{
        display: 'flex',
        flexDirection: 'row',
        height: DimensionTheme.width(43),
        justifyContent: 'space-between',
        marginBottom: DimensionTheme.width(13),
        width: '100%',
        paddingStart: DimensionTheme.width(30),
        paddingEnd: DimensionTheme.width(30),
    },
    TextInput:{
        width: DimensionTheme.width(280),
        height: DimensionTheme.width(43),
        fontSize: DimensionTheme.fontSize(14),
        paddingStart: DimensionTheme.width(18),
        alignItems: 'center',
        color: 'black',
        overflow: 'hidden',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 2,
        borderRadius: DimensionTheme.width(10),
    },
    SearchBtn:{
        width: DimensionTheme.width(43),
        height: DimensionTheme.width(43),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        backgroundColor: colors.primary,
        borderRadius: DimensionTheme.width(10),
    },
    SearchBtnImg:{
        width: DimensionTheme.width(23),
        height: DimensionTheme.width(22.63),
    },
    SearchTypes:{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: DimensionTheme.width(17),
    },
});

export default TagSearch;
