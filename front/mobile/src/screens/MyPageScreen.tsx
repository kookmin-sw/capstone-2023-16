import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import * as ButtonTheme from '../components/common/theme';
import SmallButton from '../components/common/Buttons/SmallButton';
import {colors} from '../components/common/colors';
import ProfileImage from '../components/common/Images/ProfileImage';
import {Container} from '../components/common/shared';
import SmallText from '../components/common/Texts/SmallText';
import {imagePath} from '../utils/imagePath';

const MyPageContainer = styled(Container)`
  flex: 1;
  align-items: center;
  width: 100%;
`;

const HeaderSection = styled.View`
  background-color: ${colors.white};
  flex: 1;
  width: 100%;
  height: 150px;
`;

const RoundSection = styled.View`
  position: absolute;
  left: 0px;
  top: 150px;
  flex: 6;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  width: 100%;
  background-color: ${colors.white};
`;

const ProfileSection = styled.View`
  align-items: center;
`;

const ProfileDescription = styled.View`
  margin: 25px;
`;

const TabSection = styled.View`
  flex-direction: row;
  margin: 30px;
`;

export const MyPageScreen: FC = () => {
  return (
    <MyPageContainer>
      <HeaderSection>
        <RoundSection>
          <ProfileSection>
            <ProfileImage source={imagePath.avatar} />
            <ProfileDescription>
              <SmallText>
                이거 한 60자 정도 되게 하는 게 좋겠지 18px에 60자면 두줄정도
                되나? 세줄인가 두줄인듯 ㅇ 아니다 좀 길게 하는 게 좋을 듯 음음
                크리에이터 입장에서 보면 긴 게 훨씬 낫지 그럼 한 5줄 꽉 채우면
                몇자지? 그냥 텍스트박스 크기 제한 없이 auto로 하는 게 좋나
              </SmallText>
            </ProfileDescription>
          </ProfileSection>
          <TabSection>
            <SmallButton
              btnStyles={[
                ButtonTheme.whiteBGpurpleSD.btnStyle,
                {
                  height: 58,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ]}
              textStyles={{fontSize: 12, color: colors.black}}
              onPress={() => {}}>
              FOLLOWER
            </SmallButton>
            <SmallButton
              btnStyles={[
                ButtonTheme.whiteBGpurpleSD.btnStyle,
                {
                  height: 58,
                  borderRadius: 0,
                },
              ]}
              textStyles={{fontSize: 12, color: colors.black}}
              onPress={() => {}}>
              FOLLOWING
            </SmallButton>
            <SmallButton
              btnStyles={[
                ButtonTheme.whiteBGpurpleSD.btnStyle,
                {
                  height: 58,
                  borderRadius: 0,
                },
              ]}
              textStyles={{fontSize: 12, color: colors.black}}
              onPress={() => {}}>
              HISTORY
            </SmallButton>
            <SmallButton
              btnStyles={[
                ButtonTheme.whiteBGpurpleSD.btnStyle,
                {
                  height: 58,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              ]}
              textStyles={{fontSize: 12, color: colors.black}}
              onPress={() => {}}>
              PERSONA
            </SmallButton>
          </TabSection>
        </RoundSection>
      </HeaderSection>
    </MyPageContainer>
  );
};
