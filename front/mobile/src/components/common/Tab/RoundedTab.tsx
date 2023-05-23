import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import {useNavigation} from '@react-navigation/native';

import * as ButtonTheme from '../theme';
import SmallButton from '../Buttons/SmallButton';
import {DimensionTheme, ScreenWidth} from '../shared';
import {colors} from '../colors';
import {routeProps} from './type';

const RoundedTabContainer = styled.View`
  flex-direction: row;
  algin-items: center;
  min-width: ${DimensionTheme.width(348)};
  max-width: ${DimensionTheme.width(348)};
`;

type RoundedTabProps = {
  tabInfo: routeProps[];
};

export const RoundedTab: FC<RoundedTabProps> = ({tabInfo}) => {
  const navigation = useNavigation();
  return (
    <RoundedTabContainer>
      <SmallButton
        btnStyles={[
          ButtonTheme.whiteBGpurpleSD.btnStyle,
          {
            minWidth: ScreenWidth * 0.2,
            height: 58,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
        textStyles={{fontSize: 12, color: colors.black}}
        onPress={() => {
          navigation.navigate(tabInfo[0].key, {
            data: tabInfo[0].data,
            persona_nick: tabInfo[0].persona_nick,
          });
        }}>
        {tabInfo[0].title}
      </SmallButton>
      <SmallButton
        btnStyles={[
          ButtonTheme.whiteBGpurpleSD.btnStyle,
          {
            minWidth: ScreenWidth * 0.2,
            height: 58,
            borderRadius: 0,
          },
        ]}
        textStyles={{fontSize: 12, color: colors.black}}
        onPress={() => {
          navigation.navigate(tabInfo[1].key, {
            isMine: tabInfo[1].isMine,
            followingList: tabInfo[1].followingList,
            followerList: tabInfo[1].followerList,
            persona_id: tabInfo[1]?.persona_id,
          });
        }}>
        {tabInfo[1].title}
      </SmallButton>
      <SmallButton
        btnStyles={[
          ButtonTheme.whiteBGpurpleSD.btnStyle,
          {
            minWidth: ScreenWidth * 0.2,
            height: 58,
            borderRadius: 0,
          },
        ]}
        textStyles={{fontSize: 12, color: colors.black}}
        onPress={() => {
          navigation.navigate(tabInfo[2].key, {
            data: tabInfo[2].data,
            name: 'history',
          });
        }}>
        {tabInfo[2].title}
      </SmallButton>
      <SmallButton
        btnStyles={[
          ButtonTheme.whiteBGpurpleSD.btnStyle,
          {
            minWidth: ScreenWidth * 0.2,
            height: 58,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        ]}
        textStyles={{fontSize: 12, color: colors.black}}
        onPress={() => {
          navigation.navigate(tabInfo[3].key);
        }}>
        {tabInfo[3].title}
      </SmallButton>
    </RoundedTabContainer>
  );
};
