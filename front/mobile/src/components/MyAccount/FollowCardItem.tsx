import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import {DimensionTheme} from '../common/shared';
import * as ButtonTheme from '../common/theme';
import {colors} from '../common/colors';
import {CardProps} from './types';
import SmallText from '../common/Texts/SmallText';
import SmallButton from '../common/Buttons/SmallButton';
import {TouchableOpacity, Image} from 'react-native';
import {imagePath} from '../../utils/imagePath';

const CardContainer = styled.View`
  height: ${DimensionTheme.height(83)};
  width: ${DimensionTheme.width(330)};
  flex-direction: row;
  align-items: center;
  justify-contents: center;
  border-radius: 18px;
  margin-bottom: 15px;
  padding: 17px;
`;

const ProfileImage = styled.Image`
  width: ${DimensionTheme.width(43)};
  height: ${DimensionTheme.height(43)};
  border: 1px solid ${colors.gray};
  border-radius: 18px;
`;

const ProfileInfo = styled.View`
  margin-left: 10px;
`;

const CardItem: FC<CardProps> = props => {
  return (
    <CardContainer style={[ButtonTheme.whiteBGpurpleSD.btnStyle]}>
      <ProfileImage source={props.profile} />
      <ProfileInfo>
        <SmallText
          textStyle={{
            color: colors.black,
            fontSize: DimensionTheme.fontSize(15),
          }}>
          {props.username}
        </SmallText>
        <SmallText>{props.username}</SmallText>
      </ProfileInfo>
      <SmallButton
        btnStyles={[
          ButtonTheme.whiteBGpurpleSD.btnStyle,
          {
            width: DimensionTheme.width(53),
            height: DimensionTheme.height(30),
            marginLeft: DimensionTheme.width(105),
            backgroundColor: props.isFollow ? colors.white : colors.purplelight,
            borderRadius: 8,
          },
        ]}
        textStyles={{
          fontSize: DimensionTheme.fontSize(12),
          color: colors.black,
        }}
        onPress={() => {}}>
        {props.isFollow ? '팔로잉' : '팔로우'}
      </SmallButton>
      <TouchableOpacity style={{marginLeft: DimensionTheme.width(12)}}>
        <Image source={imagePath.moreIcon} />
      </TouchableOpacity>
    </CardContainer>
  );
};

export default CardItem;
