/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, ScrollView, Image, StyleSheet, View } from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';

import { colors } from '../components/common/colors';
import TopButton from '../components/Main/TopButton';
import { DimensionTheme } from '../components/common/shared';
import FeedCategory from '../components/Main/FeedCategory';
import FeedCard from '../components/common/Cards/FeedCard';

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

const MainScreen = () => {
    const example = [
        {
            feed_id: 1,
            title: '반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
            author: '홍현지',
            author_id: '@hongs_0430',
            author_img: String(require('../assets/imgs/profileImg.png')),
            content: "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
            like:16,
            bookmark:16,
            comment:3,
            hash_tag:['대학', '조별과제'],
            like_check:true,
            bookmark_check:false,
        },
        {
            feed_id: 2,
            title: '반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
            author: '홍현지',
            author_id: '@hongs_0430',
            author_img: String(require('../assets/imgs/profileImg.png')),
            content: "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
            like:16,
            bookmark:16,
            comment:3,
            hash_tag:['대학', '조별과제'],
            like_check:true,
            bookmark_check:false,
        },
        {
            feed_id: 3,
            title: '반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
            author: '홍현지',
            author_id: '@hongs_0430',
            author_img: String(require('../assets/imgs/profileImg.png')),
            content: "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
            like:16,
            bookmark:16,
            comment:3,
            hash_tag:['대학', '조별과제'],
            like_check:true,
            bookmark_check:false,
        },
    ];

    return (
        <SafeAreaView>
            <View style={style.BackgroundView}>
                <HeaderBox>
                    <Image style={style.HearderTitle} source={require('../assets/imgs/logoText.png')} resizeMode="contain"/>
                    <TopButton onPress={()=>{}} img={String(require('../assets/imgs/search-black.png'))}/>
                    <TopButton onPress={() => {}} img={String(require('../assets/imgs/profileImg.png'))}/>
                </HeaderBox>
                <LibraryTool>
                    <CategoryScroll horizontal={true}>
                        <FeedCategory onPress={()=>{}} img={''}>추천 피드</FeedCategory>
                        <FeedCategory onPress={()=>{}} img={''}>오늘의 베스트 피드</FeedCategory>
                    </CategoryScroll>
                    <ScrollView>
                        {
                            example.map((value)=><FeedCard title={value.title} feed_id={value.feed_id} author={value.author} author_id={value.author_id} author_img={value.author_img} content={value.content} like={value.like} bookmark={value.bookmark} comment={value.comment} hash_tag={value.hash_tag} like_check={value.like_check} bookmark_check={value.bookmark_check}/>)
                        }
                    </ScrollView>
                </LibraryTool>
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    HeaderBox:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: DimensionTheme.width(9),
        height: DimensionTheme.height(60),
    },
    HearderTitle:{
        width: DimensionTheme.width(163),
        height: DimensionTheme.height(47),
        marginLeft: DimensionTheme.width(115),
        marginRight: DimensionTheme.width(30),
    },
    BackgroundView:{
        backgroundColor: colors.secondary,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
});

export default MainScreen;
