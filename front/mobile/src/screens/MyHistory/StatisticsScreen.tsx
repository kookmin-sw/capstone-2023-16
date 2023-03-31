import React, {useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import * as ButtonTheme from '../../components/common/theme';

import SmallButton from '../../components/common/Buttons/SmallButton';
import {Container, DimensionTheme} from '../../components/common/shared';

const StatisticsSection = styled(Container)``;

const StatisticsTypeSection = styled.View`
  flex-direction: row;
`;

export const StatisticsScreen = () => {
  const [type, setType] = useState(0);
  return (
    <StatisticsSection>
      <StatisticsTypeSection>
        <SmallButton
          btnStyles={[
            type === 0
              ? ButtonTheme.purpleBG.btnStyle
              : ButtonTheme.whiteBG.btnStyle,
            ,
            {
              width: DimensionTheme.width(90),
              height: DimensionTheme.height(32),
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
              height: DimensionTheme.height(32),
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
    </StatisticsSection>
  );
};
