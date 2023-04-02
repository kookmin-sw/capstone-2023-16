import React, {FC} from 'react';
import {Image} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';

import {imagePath} from '../../../utils/imagePath';
import TextButton from '../Buttons/TextButton';
import {colors} from '../colors';
import {DimensionTheme} from '../shared';
import RegularText from '../Texts/RegularText';

const BottomSheetContentContainer = styled.View``;

const TopSection = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const TopItem = styled.TouchableOpacity`
  width: ${DimensionTheme.width(121)};
  align-items: center;
`;

const VerticalLine = styled.View`
  width: 1px;
  background-color: ${colors.borderGray};
`;

const HorizontalLine = styled.View`
  height: 1px;
  background-color: ${colors.borderGray};
  margin-bottom: ${DimensionTheme.height(14)};
  margin-top: ${DimensionTheme.height(14)};
`;

const BottomSection = styled.View``;
export const BottomSheetContent: FC = () => {
  return (
    <BottomSheetContentContainer>
      <TopSection>
        {/* 신고하기 */}
        <TopItem>
          <Image
            source={imagePath.reportIcon}
            style={{
              width: DimensionTheme.width(29),
              height: DimensionTheme.height(29),
            }}
          />
          <RegularText>신고</RegularText>
        </TopItem>
        <VerticalLine />
        {/* 공유하기 */}
        <TopItem>
          <Image
            source={imagePath.shareIcon}
            style={{
              width: DimensionTheme.width(29),
              height: DimensionTheme.height(29),
            }}
          />
          <RegularText>공유</RegularText>
        </TopItem>
        <VerticalLine />
        {/* 차단하기 */}
        <TopItem>
          <Image
            source={imagePath.cancel}
            style={{
              width: DimensionTheme.width(29),
              height: DimensionTheme.height(29),
            }}
          />
          <RegularText>차단</RegularText>
        </TopItem>
      </TopSection>
      <HorizontalLine />
      <BottomSection>
        <TextButton
          textStyles={{
            color: colors.black,
            fontSize: DimensionTheme.fontSize(20),
          }}
          onPress={() => {}}>
          팔로잉 취소
        </TextButton>
        <HorizontalLine />
        <TextButton
          textStyles={{
            color: colors.black,
            fontSize: DimensionTheme.fontSize(20),
          }}
          onPress={() => {}}>
          프로필 보기
        </TextButton>
      </BottomSection>
    </BottomSheetContentContainer>
  );
};
