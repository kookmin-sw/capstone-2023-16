/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';

import { colors } from '../components/common/colors';
import { DimensionTheme } from '../components/common/shared';

import DetailHeader from '../components/Detail/DetailHeader';

interface DetailProps {
    feed_id: number;
    title: string;
    author: string;
    author_id: string;
    author_img: string;
    content: string;
    like: number;
    bookmark: number;
    comment: number;
    hash_tag: string[];
    like_check: boolean;
    bookmark_check: boolean;
};

const DetailScreen = (props:DetailProps) => {
    return (
        <SafeAreaView>
            <View style={style.BackGroundView}>
                <ScrollView style={style.BookPageStyle}>
                    <DetailHeader feed_id={props.feed_id} title={props.title} author={props.author} author_img={props.author_img}/>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    BackGroundView:{
        backgroundColor: colors.secondary,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    BookPageStyle:{
        backgroundColor: 'white',
        width:'100%',
        minHeight: DimensionTheme.height(802),
        borderTopEndRadius: DimensionTheme.width(40),
    }
});

export default DetailScreen;
