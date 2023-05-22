import React, {FC} from 'react';
import {Image} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';

import {imagePath} from '../../../utils/imagePath';
import TextButton from '../Buttons/TextButton';
import {colors} from '../colors';
import {DimensionTheme} from '../shared';
import RegularText from '../Texts/RegularText';

const BottomSheetContentContainer = styled.View`
  width: ${DimensionTheme.width(355)};
`;

const TopSection = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const HorizontalLine = styled.View`
  height: 1px;
  background-color: ${colors.borderGray};
  margin-bottom: ${DimensionTheme.height(14)};
  margin-top: ${DimensionTheme.height(14)};
`;

const BottomSection = styled.View``;
export const BottomSheetPersona: FC = () => {
  return (
    <BottomSheetContentContainer>
      <TopSection>
        <RegularText>홍현지 페르소나</RegularText>
      </TopSection>
      <HorizontalLine />
      <BottomSection>
        <TextButton
          textStyles={{
            color: colors.black,
            fontSize: DimensionTheme.fontSize(20),
          }}
          onPress={() => {}}>
          페르소나 삭제하기
        </TextButton>
        <HorizontalLine />
        <TextButton
          textStyles={{
            color: colors.black,
            fontSize: DimensionTheme.fontSize(20),
          }}
          onPress={() => {}}>
          페르소나 비공개 설정
        </TextButton>
      </BottomSection>
    </BottomSheetContentContainer>
  );
};
