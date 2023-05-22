/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {colors} from '../common/colors';
import {DimensionTheme} from '../common/shared';

interface HearderProps {
  feed_id: number;
  title: string;
  author_id: string;
  author_img: string;
  author: string;
}

const DetailHearder = (props: HearderProps) => {
  console.log(props);
  const navigation = useNavigation();
  return (
    <View style={style.HeaderBox}>
      <View style={{flexDirection: 'row'}}>
        <Text style={style.Title}>{props.title}</Text>
        <TouchableOpacity style={style.MoreBtn}>
          <Image
            style={style.MoreBtnImg}
            source={require('../../assets/more-image.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={style.ProfileBox}
        onPress={() =>
          navigation.navigate('MyPage', {
            isMine: false,
            nickname: props.author,
            id: props.author_id,
          })
        }>
        <View style={style.ProfileImgView}>
          <Image
            style={style.ProfileImg}
            source={
              props.author_img !== null || props.author_img !== ''
                ? props.author_img
                : require('../../assets/profileImg.png')
            }
            resizeMode="contain"
          />
        </View>
        <Text style={style.Nickname}>{props.author}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  HeaderBox: {
    width: '100%',
    // marginTop: DimensionTheme.height(22),
    paddingStart: DimensionTheme.width(24),
    paddingEnd: DimensionTheme.width(24),
    paddingBottom: DimensionTheme.height(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderBottomColor: colors.borderGray,
    borderBottomWidth: 1,
  },
  Title: {
    width: DimensionTheme.width(310),
    marginEnd: DimensionTheme.width(15),
    fontSize: DimensionTheme.fontSize(20),
    fontWeight: '800',
    color: 'black',
  },
  MoreBtn: {
    marginTop: DimensionTheme.width(4),
    width: DimensionTheme.width(20),
    height: DimensionTheme.width(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  MoreBtnImg: {
    width: DimensionTheme.width(14),
    height: DimensionTheme.width(14),
  },
  ProfileBox: {
    marginTop: DimensionTheme.height(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProfileImg: {
    width: DimensionTheme.width(35),
    height: DimensionTheme.width(35),
    borderRadius: DimensionTheme.width(17.5),
  },
  ProfileImgView: {
    width: DimensionTheme.width(35),
    height: DimensionTheme.width(35),
    marginEnd: DimensionTheme.width(10),
    borderRadius: DimensionTheme.width(17.5),
    borderWidth: DimensionTheme.width(0.7),
    borderColor: colors.borderGray,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: DimensionTheme.width(4),
    shadowOpacity: 0.3,
    elevation: 4,
    backgroundColor: 'white',
  },
  Nickname: {
    width: DimensionTheme.width(300),
    fontSize: DimensionTheme.fontSize(14),
    color: 'black',
  },
});

export default DetailHearder;
