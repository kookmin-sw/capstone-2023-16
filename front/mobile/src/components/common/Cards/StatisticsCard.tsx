import React, {FC} from 'react';
import {ViewStyle} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';

import {colors} from '../colors';
import {DimensionTheme} from '../shared';
import * as ButtonTheme from '../../common/theme';
import SmallText from '../Texts/SmallText';
import {StyleProp} from 'react-native';

const StatisticsContainer = styled.View`
  border-radius: 20px;
  padding: 10px;
  max-width: ${DimensionTheme.width(348)};
  max-height: ${DimensionTheme.width(210)};
`;

const StatisticsTitle = styled.View``;

const StatisticsSection = styled.View``;

type StatisticsCardProps = {
  statisticsTitle: string;
  viewStyles?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export const StatisticsCard: FC<StatisticsCardProps> = props => {
  return (
    <StatisticsContainer
      style={[ButtonTheme.whiteBGpurpleSD.btnStyle, props.viewStyles]}>
      <StatisticsTitle>
        <SmallText
          textStyle={{
            fontSize: 14,
            fontWeight: '700',
            color: colors.black,
          }}>
          {props.statisticsTitle}
        </SmallText>
      </StatisticsTitle>
      <StatisticsSection>{props.children}</StatisticsSection>
    </StatisticsContainer>
  );
};
