/* eslint-disable prettier/prettier */
import React, {FC, useEffect, useState} from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { DimensionTheme } from '../components/common/shared';
import FoldFilter from '../components/Filter/FoldFilter';
import Search from '../components/Filter/Search';
import { NavigationData } from '../navigation/AppNavigator';
import FeedCard from '../components/common/Cards/FeedCard';
import CategorySelect from '../components/Filter/CategorySelect';
import TagSearch from '../components/Filter/TagSearch';
import { getAfterFiltering } from '../graphQL/Filter/FilteringPost';
import { imagePath } from '../utils/imagePath';

type Props = NavigationData<'FilterContent'>;


// interface tmpProps{
//   feed_id: string;
//   title: string;
//   author_nickname: string;
//   author_id: string;
//   contentPreview: string;
//   likeCnt: number;
//   bookmarkCnt: number;
//   commentCnt: number;
//   tags: Array<any>;
// }

const FilterScreen : FC<Props> = ({navigation}) => {
    // category는 한개만, tag는 여러개 가능
    const [searchState, setSearchState] = useState(true);
    const [categoryState, setCategoryState] = useState(false);
    const [contentState, setContentState] = useState(false);
    // const [search, setSearch] = useState();
    const [tagState, setTagState] = useState(false);
    const [tagList, setTagList] = useState([]);
    const [category, setCategory] = useState('');
    // const [render, setRender] = useState(true);
    const [content, setContent] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('제목만');
    const [searchEvent, setSearchEvent] = useState(false);
    // var contentList : Array<tmpProps> = [];

    useEffect(() => {
        if (searchEvent){
            const fetchData = async() => {
                try { 
                    const response = await getAfterFiltering({
                        searchAuthor: (searchType === '작성자' && searchText !== '') ? searchText : undefined,
                        searchTitle: (searchType === '제목' && searchText !== '') ? searchText : undefined,
                        searchCategory: (category !== '') ? category : undefined,
                        searchTags: (tagList.length !== 0) ? tagList : undefined,
                    });
                    console.log('filter: ', response);
                    setContent(response);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();

            setSearchEvent(false);
        }
    }, [searchEvent]);

    return (
        <SafeAreaView style={{backgroundColor:'white', minHeight: '100%'}}>
            <ScrollView style={style.Container}>
                <View style={style.Header}>
                    <TouchableOpacity style={style.BackBtn} onPress={()=>{navigation.pop();}}>
                        <Image style={style.BackBtnImg} source={require('../assets/back_btn.png')} resizeMode="contain"/>
                    </TouchableOpacity>
                    <Image style={style.HeadetText} source={require('../assets/filter_header.png')} resizeMode="contain"/>
                </View>
                <FoldFilter text="SEARCH" state={searchState} onPress={()=>{setSearchState(!searchState);}}/>
                {searchState && <Search
                        searchText={setSearchText}
                        searchEvent={setSearchEvent}
                        searchType={setSearchType}
                    />
                }
                <FoldFilter text="TAG" state={tagState} onPress={()=>{setTagState(!tagState);}} />
                {
                    tagState && <TagSearch setTagList={setTagList} tagList={tagList} setSearchEvent={setSearchEvent}/>
                }
                <FoldFilter text="CATEGORY" state={categoryState} onPress={()=>{setCategoryState(!categoryState);}} type="category"/>
                {
                    categoryState && <CategorySelect categoryEvent={setCategory} setSearchEvent={setSearchEvent}/>
                }
                <FoldFilter text="CONTENT" state={contentState} onPress={()=>{setContentState(!contentState);}}/>
                {contentState && <View style={{marginStart:DimensionTheme.width(30)}}>
                        {
                            content.map((value, index)=>(
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
                        }
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    Header:{
        height: DimensionTheme.width(58),
        display: 'flex',
        flexDirection: 'row',
    },
    Container:{
        display: 'flex',
        flexDirection: 'column',
    },
    BackBtn:{
        width: DimensionTheme.width(22),
        height: DimensionTheme.width(22),
        marginStart: DimensionTheme.width(10),
        marginTop: DimensionTheme.width(16),
    },
    BackBtnImg:{
        width: DimensionTheme.width(22),
        height: DimensionTheme.width(22),
    },
    HeadetText:{
        width: DimensionTheme.width(66),
        height: DimensionTheme.width(24),
        marginTop: DimensionTheme.width(19),
        marginStart: DimensionTheme.width(130),
    },
});

export default FilterScreen;
