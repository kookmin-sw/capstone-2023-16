import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {DimensionTheme} from '../common/shared';

const ContentBlock = ({
  paid,
  author_nickname,
  author_id,
  lowtier,
}: {
  paid: boolean;
  author_nickname: string;
  author_id: string;
  lowtier: boolean;
}) => {
  return (
    <View style={style.CardGrayBox}>
      <Text style={style.BoldText}>{paid ? 'PAIDCONTENT' : 'MEMBERSHIP'}</Text>
      <Text style={style.text}>
        {paid
          ? '결제 시 콘텐츠를 열람하실 수 있습니다.'
          : lowtier
          ? '멤버쉽 티어가 낮아 열람하실 수 없습니다.'
          : `${author_nickname}님의 멤버쉽에 가입해야 열람하실 수 있습니다.`}
      </Text>
      {paid ? (
        <View style={style.buttonsView}>
          <TouchableOpacity style={style.buttonStyle}>
            <Text style={style.textInBtn}>결제</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.buttonStyle}>
            <Text style={style.textInBtn}>멤버쉽 가입</Text>
          </TouchableOpacity>
        </View>
      ) : lowtier ? (
        <></>
      ) : (
        <View style={style.buttonsView}>
          <TouchableOpacity style={style.buttonStyle}>
            <Text style={style.textInBtn}>멤버쉽 가입</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  CardGrayBox: {
    width: DimensionTheme.width(345),
    borderRadius: DimensionTheme.width(15),
    shadowOffset: {width: 0, height: DimensionTheme.width(2)},
    shadowColor: '#000000',
    shadowOpacity: 0.34,
    shadowRadius: DimensionTheme.width(1),
    paddingTop: DimensionTheme.width(16),
    paddingBottom: DimensionTheme.width(16),
    marginBottom: DimensionTheme.width(28),
    paddingEnd: DimensionTheme.width(34),
    paddingStart: DimensionTheme.width(20),
    elevation: 5,
    backgroundColor: 'white',
  },
  BoldText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: DimensionTheme.fontSize(20),
    marginBottom: DimensionTheme.width(2),
  },
  text: {
    color: 'black',
    fontSize: DimensionTheme.fontSize(14),
    marginBottom: DimensionTheme.width(15),
  },
  buttonsView: {
    width: DimensionTheme.width(291),
    alignItems: 'flex-end',
  },
  buttonStyle: {
    backgroundColor: '#D38CFF',
    width: 'auto',
    paddingEnd: DimensionTheme.width(12),
    paddingStart: DimensionTheme.width(12),
    paddingTop: DimensionTheme.width(9),
    paddingBottom: DimensionTheme.width(10),
  },
  textInBtn: {
    fontSize: DimensionTheme.fontSize(15),
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ContentBlock;
