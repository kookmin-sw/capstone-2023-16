/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../components/common/colors';
import {DimensionTheme} from '../components/common/shared';

import DetailHeader from '../components/Detail/DetailHeader';
import ReactBtn from '../components/Detail/ReactBtn';
import CommentInput from '../components/Detail/CommentInput';
import BookmarkBtn from '../components/Detail/BookmarkBtn';
import {FeedProps} from '../components/common/type';
import {NavigationData, ParamList} from '../navigation/AuthNavigator';

type Props = NavigationData<'Detail'>;

const DetailScreen: FC<Props> = (props: any) => {
  const tempNavigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={style.BackGroundView}>
        <View style={style.Header}>
          <TouchableOpacity
            style={style.BackBtn}
            onPress={() => {
              tempNavigation.goBack();
            }}>
            <Image
              style={{
                width: DimensionTheme.width(22),
                height: DimensionTheme.width(22),
              }}
              source={require('../assets/back_btn.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <BookmarkBtn
            onPress={() => {}}
            img={String(require('../assets/heart_purple_fill.png'))}
            width={25}
            height={29}
          />
          <BookmarkBtn
            onPress={() => {}}
            img={String(require('../assets/bookmark_purple_fill.png'))}
            width={18}
            height={22}
          />
        </View>
        <ScrollView style={style.BookPageStyle}>
          <DetailHeader
            feed_id={props.route.params.feed_id}
            title={props.route.params.title}
            author={props.route.params.author}
            author_img={props.route.params.author_img}
          />
          <Text>{props.route.params.content}</Text>
          <View
            style={{
              ...style.RowView,
              marginBottom: DimensionTheme.width(16),
              marginStart: DimensionTheme.width(24),
            }}>
            <ReactBtn
              img={String(require('../assets/heart_purple_fill.png'))}
              onPress={() => {}}
              width={28}
              height={33}
            />
            <ReactBtn
              img={String(require('../assets/bookmark_purple_fill.png'))}
              onPress={() => {}}
              width={17}
              height={21}
            />
            <ReactBtn
              img={String(require('../assets/shared.png'))}
              onPress={() => {}}
              width={26}
              height={26}
            />
          </View>
          <View
            style={{...style.RowView, marginBottom: DimensionTheme.width(10)}}>
            <Text style={style.Text}>좋아요 {props.route.params.like}개</Text>
            <Text style={style.Text}>
              북마크 {props.route.params.bookmark}개
            </Text>
            <Text style={style.Text}>댓글 {props.route.params.comment}개</Text>
          </View>
          <CommentInput />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  BackGroundView: {
    backgroundColor: colors.secondary,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  BookPageStyle: {
    backgroundColor: 'white',
    width: DimensionTheme.width(393),
    minHeight: DimensionTheme.width(802),
    borderTopRightRadius: DimensionTheme.width(40),
  },
  Header: {
    flexDirection: 'row',
    marginStart: DimensionTheme.width(10),
    marginTop: DimensionTheme.width(12),
    height: 'auto',
  },
  BackBtn: {
    marginTop: DimensionTheme.width(4),
    width: DimensionTheme.width(22),
    height: DimensionTheme.width(22),
    marginEnd: DimensionTheme.width(232),
  },
  Text: {
    width: DimensionTheme.width(345),
    margin: DimensionTheme.width(24),
    marginBottom: DimensionTheme.width(33),
    fontSize: DimensionTheme.fontSize(14),
  },
  RowView: {
    display: 'flex',
    flexDirection: 'row',
  },
  ReactText: {
    fontSize: DimensionTheme.fontSize(12),
    marginEnd: DimensionTheme.width(8),
  },
});

export default DetailScreen;
