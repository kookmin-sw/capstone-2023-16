import React, {useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import * as ButtonTheme from '../../components/common/theme';

import SmallButton from '../../components/common/Buttons/SmallButton';
import {Container, DimensionTheme} from '../../components/common/shared';
import {TagCard} from '../../components/common/Cards/TagCard';

import {personalTagData} from '../../constants/tag';
import {StatisticsCard} from '../../components/common/Cards/StatisticsCard';
const StatisticsSection = styled(Container)`
  justify-content: flex-start;
`;

const StatisticsTypeSection = styled.View`
  flex-direction: row;
`;

export const StatisticsScreen = () => {
  const [type, setType] = useState(0);
  return (
    <StatisticsSection>
      {/* READER or CREATOR 선택 버튼 */}
      <StatisticsTypeSection>
        <SmallButton
          btnStyles={[
            type === 0
              ? ButtonTheme.purpleBG.btnStyle
              : ButtonTheme.whiteBG.btnStyle,
            ,
            {
              width: DimensionTheme.width(90),
              height: DimensionTheme.width(32),
              marginRight: DimensionTheme.width(47),
              borderRadius: 10,
            },
          ]}
          textStyles={[
            type === 0
              ? ButtonTheme.purpleBG.textStyle
              : ButtonTheme.whiteBG.textStyle,
          ]}
          onPress={() => {
            setType(0);
          }}>
          READER
        </SmallButton>
        <SmallButton
          btnStyles={[
            type === 1
              ? ButtonTheme.purpleBG.btnStyle
              : ButtonTheme.whiteBG.btnStyle,
            ,
            {
              width: DimensionTheme.width(90),
              height: DimensionTheme.width(32),
              borderRadius: 10,
            },
          ]}
          textStyles={[
            type === 1
              ? ButtonTheme.purpleBG.textStyle
              : ButtonTheme.whiteBG.textStyle,
          ]}
          onPress={() => {
            setType(1);
          }}>
          CREATOR
        </SmallButton>
      </StatisticsTypeSection>
      {/* type === 0 ? READER : CREATOR */}
      {type === 0 ? (
        <>
          <TagCard
            viewStyles={{marginTop: 40}}
            tagTitle="홍현지님이 관심있는 태그"
            tags={personalTagData}
          />
          <StatisticsCard
            viewStyles={{marginTop: 30}}
            statisticsTitle="홍현지님이 읽은 일일 피드 수"
          />
          <StatisticsCard
            viewStyles={{marginTop: 30}}
            statisticsTitle="홍현지님이 읽은 일일 피드 수"
          />
        </>
      ) : null}
    </StatisticsSection>
  );
};
