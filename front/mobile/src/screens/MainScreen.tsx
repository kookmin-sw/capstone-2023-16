/* eslint-disable prettier/prettier */
import React, { FC, useState } from 'react';
import { SafeAreaView, ScrollView, Image, StyleSheet, View, ImageBackground } from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';

import { colors } from '../components/common/colors';
import TopButton from '../components/Main/TopButton';
import { DimensionTheme } from '../components/common/shared';
import FeedCategory from '../components/Main/FeedCategory';
import FeedCard from '../components/common/Cards/FeedCard';
import { NavigationData } from '../navigation/AuthNavigator';

const HeaderBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-right: ${DimensionTheme.width(9)}px;
    height: ${DimensionTheme.width(60)}px;
`;

// const LibraryTool = styled.View`
//     width: 100%;
//     align-items: center;
//     height: ${DimensionTheme.height(792)};
//     border-top-left-radius: ${DimensionTheme.width(40)};
//     border-top-right-radius: ${DimensionTheme.width(40)};
//     padding-top: ${DimensionTheme.height(39)};
//     border-width: 2;
//     border-color: ${colors.gray};
//     background-color: white;
// `;

// const LibraryToolShadow = styled(LibraryTool)`
//     padding-top: ${DimensionTheme.height(39)};
// `

const CategoryScroll = styled.ScrollView`
    display: flex;
    flex-direction: row;
    width: ${DimensionTheme.width(333)};
    padding-bottom: ${DimensionTheme.width(5)};
    margin-bottom: ${DimensionTheme.height(18)};
`;

type Props = NavigationData<'Main'>;

const MainScreen : FC<Props> = ({navigation}) => {
    const [feedChoice1, setFeedChoice1] = useState(true);
    const [feedChoice2, setFeedChoice2] = useState(false);
    const [feedChoice3, setFeedChoice3] = useState(false);
    const example = [
        {
            feed_id: 1,
            title: '반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
            author: '홍현지',
            author_id: '@hongs_0430',
            author_img: String(require('../assets/profileImg.png')),
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
            author_img: String(require('../assets/profileImg.png')),
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
            author_img: String(require('../assets/profileImg.png')),
            content: "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
            like:16,
            bookmark:16,
            comment:3,
            hash_tag:['대학', '조별과제'],
            like_check:true,
            bookmark_check:false,
        },
    ];

    const example2 = [
        {
            feed_id: 1,
            title: '2반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
            author: '홍현지',
            author_id: '@hongs_0430',
            author_img: String(require('../assets/profileImg.png')),
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
            title: '2반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
            author: '홍현지',
            author_id: '@hongs_0430',
            author_img: String(require('../assets/profileImg.png')),
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
            title: '2반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
            author: '홍현지',
            author_id: '@hongs_0430',
            author_img: String(require('../assets/profileImg.png')),
            content: "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
            like:16,
            bookmark:16,
            comment:3,
            hash_tag:['대학', '조별과제'],
            like_check:true,
            bookmark_check:false,
        },
    ];

    const example3 = [
        {
            feed_id: 1,
            title: '3반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
            author: '홍현지',
            author_id: '@hongs_0430',
            author_img: String(require('../assets/profileImg.png')),
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
            title: '3반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
            author: '홍현지',
            author_id: '@hongs_0430',
            author_img: String(require('../assets/profileImg.png')),
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
            title: '3반려동물: 우린 왜 고양이를 까칠하다고 생각할까?',
            author: '홍현지',
            author_id: '@hongs_0430',
            author_img: String(require('../assets/profileImg.png')),
            content: "무관심하고 까칠하다는 이미지는 사라지지 않는 것일까. 어느 정도 사실인 부분도 있을까. 고양이가 '독립적'이라는 인식에도, 반려동물로서의 인기는 사그라들지 않는다.",
            like:16,
            bookmark:16,
            comment:3,
            hash_tag:['대학', '조별과제'],
            like_check:true,
            bookmark_check:false,
        },
    ];

    navigation.reset;

    return (
        <SafeAreaView>
            <ImageBackground style={style.BackgroundView} source={require('../assets/background1.png')}>
                <HeaderBox>
                    <Image style={style.HearderTitle} source={require('../assets/logoText.png')} resizeMode="contain"/>
                    <TopButton width={18} height={18} onPress={() => {navigation.navigate('FilterContent')}} img={String(require('../assets/search-black.png'))}/>
                    <TopButton width={28} height={28} onPress={() => {}} img={String(require('../assets/profileImg.png'))}/>
                </HeaderBox>
                <View style={style.LibraryTool}>
                    <View style={style.LibraryToolShadow}>
                        <CategoryScroll horizontal={true} showsHorizontalScrollIndicator={false}>
                            <FeedCategory onPress={()=>{
                                setFeedChoice1(true);
                                setFeedChoice2(false);
                                setFeedChoice3(false);
                            }} img={''}>추천 피드</FeedCategory>
                            <FeedCategory onPress={()=>{
                                setFeedChoice1(false);
                                setFeedChoice2(true);
                                setFeedChoice3(false);
                            }} img={''}>오늘의 베스트 피드</FeedCategory>
                            <FeedCategory onPress={()=>{
                                setFeedChoice1(false);
                                setFeedChoice2(false);
                                setFeedChoice3(true);
                            }} img={''}>피드 예시3</FeedCategory>
                        </CategoryScroll>
                        <ScrollView style={{width: '100%'}} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                            {
                                feedChoice1 && (example.map((value)=><FeedCard title={value.title} feed_id={value.feed_id} author={value.author} author_id={value.author_id} author_img={value.author_img} content={value.content} like={value.like} bookmark={value.bookmark} comment={value.comment} hash_tag={value.hash_tag} like_check={value.like_check} bookmark_check={value.bookmark_check}/>))
                            }
                            {
                                feedChoice2 && (example2.map((value)=><FeedCard title={value.title} feed_id={value.feed_id} author={value.author} author_id={value.author_id} author_img={value.author_img} content={value.content} like={value.like} bookmark={value.bookmark} comment={value.comment} hash_tag={value.hash_tag} like_check={value.like_check} bookmark_check={value.bookmark_check}/>))
                            }
                            {
                                feedChoice3 && (example3.map((value)=><FeedCard title={value.title} feed_id={value.feed_id} author={value.author} author_id={value.author_id} author_img={value.author_img} content={value.content} like={value.like} bookmark={value.bookmark} comment={value.comment} hash_tag={value.hash_tag} like_check={value.like_check} bookmark_check={value.bookmark_check}/>))
                            }
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
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
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    LibraryTool:{
        width: '100%',
        height: DimensionTheme.height(792),
        borderTopStartRadius: DimensionTheme.width(40),
        borderTopEndRadius: DimensionTheme.width(40),
        backgroundColor: 'white',
    },
    LibraryToolShadow:{
        width: '100%',
        alignItems: 'center',
        height: DimensionTheme.height(792),
        borderTopStartRadius: DimensionTheme.width(40),
        borderTopEndRadius: DimensionTheme.width(40),
        paddingTop: DimensionTheme.height(39),
        overflow: 'hidden',
        shadowOffset: { width: 0, height: DimensionTheme.width(2) },
        shadowColor: 'black',
        shadowRadius: DimensionTheme.width(8),
        shadowOpacity: 0.4,
        elevation: 3,
        borderRadius: DimensionTheme.width(10),
    },
});

export default MainScreen;
