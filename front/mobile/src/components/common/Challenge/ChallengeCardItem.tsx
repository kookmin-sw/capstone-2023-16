import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import * as ButtonTheme from '../theme';
import {colors} from '../colors';
import {DimensionTheme} from '../shared';
import RegularText from '../Texts/RegularText';
import SmallText from '../Texts/SmallText';
import {CardProps} from './types';
import {Image, View} from 'react-native';
import ImageButton from '../Buttons/ImageButton';
import {imagePath} from '../../../utils/imagePath';
import SmallButton from '../Buttons/SmallButton';
import {useNavigation} from '@react-navigation/native';

const CardContainer = styled.TouchableOpacity`
  width: ${DimensionTheme.width(348)};
  min-height: ${DimensionTheme.width(145)};
  border-radius: 10px;
  background-color: ${colors.white};
  margin-top: ${DimensionTheme.width(14)};
  align-items: flex-start;
  padding: 9px 18px;
`;

const TopSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${DimensionTheme.width(11)};
`;

const HorizontalLine = styled.View`
  height: ${DimensionTheme.width(1)};
  width: ${DimensionTheme.width(332)};
  margin-left: -${DimensionTheme.width(10)};
  margin-top: ${DimensionTheme.width(11)};
  margin-bottom: ${DimensionTheme.width(9)};
  background-color: ${colors.borderGray};
`;

const BottomSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: -${DimensionTheme.width(15)};
  margin-top: ${DimensionTheme.width(16)};
`;

export const ChallengeCardItem: FC<CardProps> = props => {
  const tempNavigation = useNavigation();
  return (
    <CardContainer
      onPress={() => {
        tempNavigation.navigate('ChallengeDetail', props);
      }}
      style={[ButtonTheme.whiteBGblackSD.btnStyle]}>
      <TopSection>
        <View
          style={[
            props.open
              ? ButtonTheme.purpleLightBGblackSD.btnStyle
              : ButtonTheme.whiteBGpurpleSD.btnStyle,
            {
              height: DimensionTheme.width(26),
              minWidth: DimensionTheme.width(54),
              borderRadius: 8,
              marginRight: DimensionTheme.width(190),
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <SmallText textStyle={{color: colors.black}}>
            {props.open ? '모집' : '모집 마감'}
          </SmallText>
        </View>
        {props.open ? null : <Image source={imagePath.lockIcon} />}
        <SmallText textStyle={{color: colors.black}}>
          인원 : {props.current} / {props.max}
        </SmallText>
      </TopSection>
      <RegularText>{props.title}</RegularText>
      <HorizontalLine />
      <SmallText textStyle={{color: colors.black}}>{props.body}</SmallText>
      {props.open ? (
        <BottomSection>
          <ImageButton
            btnStyles={{backgroundColor: 'transparent'}}
            source={imagePath.moreIcon}
            onPress={() => {}}
          />
          <SmallButton
            btnStyles={[
              ButtonTheme.whiteBGpurpleSD.btnStyle,
              {
                width: DimensionTheme.width(74),
                height: DimensionTheme.width(34),
                borderRadius: 8,
                marginLeft: DimensionTheme.width(220),
              },
            ]}
            textStyles={{color: colors.black}}
            onPress={() => {}}>
            {'참가신청'}
          </SmallButton>
        </BottomSection>
      ) : null}
    </CardContainer>
  );
};
