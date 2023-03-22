import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Image} from 'react-native';

import * as ButtonTheme from '../../components/common/theme';
import SmallButton from '../../components/common/Buttons/SmallButton';
import {colors} from '../../components/common/colors';
import {
  Container,
  DimensionTheme,
  ScreenWidth,
} from '../../components/common/shared';
import SmallText from '../../components/common/Texts/SmallText';
import {imagePath} from '../../utils/imagePath';
import {personalTagData} from '../../constants/tag';
import {NavigationData} from '../../navigation/AuthNavigator';

const MyPageContainer = styled(Container)`
  flex: 1;
  align-items: center;
  width: 100%;
`;

const HeaderSection = styled.ImageBackground`
  flex: 1;
  width: 100%;
`;

const RoundSection = styled.ScrollView`
  flex: 1;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;

  background-color: ${colors.white};
  padding: 20px;
`;

const ProfileSection = styled.View`
  align-items: center;
`;

const ProfileImage = styled.Image`
  border-radius: 100px;
  border: 1px solid ${colors.purple};
  z-index: 9;
  margin-left: ${ScreenWidth * 0.4}px;
  margin-top: ${DimensionTheme.height(110)};
  margin-bottom: -${DimensionTheme.height(30)};
  width: ${DimensionTheme.width(74)};
  height: ${DimensionTheme.height(74)};
  padding: 25px;
  align-items: center;
  justify-contents: center;
`;

const ProfileDescription = styled.View`
  flex: 1;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const TabSection = styled.View`
  flex: 1;
  flex-direction: row;
  algin-items: center;
  width: 100%;
`;

const IntersetTagSection = styled.View`
  flex: 1;
  margin-top: 30px;
  hegiht: 127px;
  border-radius: 20px;
  padding: 10px;
`;

const TagChipSection = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-contents: space-between;
  flex-wrap: wrap;
`;

const StatisticsSection = styled.View`
  flex: 3;
`;

const FeedStaticSection = styled.View`
  padding: 10px;
  margin-top: 30px;
  hegiht: 167px;
  border-radius: 20px;
`;

type Props = NavigationData<'MyPage'>;

export const MyPageScreen: FC<Props> = ({navigation}) => {
  return (
    <MyPageContainer>
      <HeaderSection source={imagePath.background}>
        <ProfileImage source={imagePath.avatar} />
        <RoundSection
          showsVerticalScrollIndicator={false}
          style={[ButtonTheme.whiteBGpurpleSD.btnStyle]}>
          <ProfileSection>
            <SmallText textStyle={{marginTop: 30, marginBottom: -20}}>
              CREATOR
            </SmallText>
            <ProfileDescription>
              <SmallText textStyle={{color: colors.black}}>
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
                  minWidth: ScreenWidth * 0.23,
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
                  minWidth: ScreenWidth * 0.25,
                  height: 58,
                  borderRadius: 0,
                },
              ]}
              textStyles={{fontSize: 12, color: colors.black}}
              onPress={() => {
                navigation.navigate('Following');
              }}>
              FOLLOWING
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
              onPress={() => {}}>
              HISTORY
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
              onPress={() => {}}>
              PERSONA
            </SmallButton>
          </TabSection>
          <IntersetTagSection style={[ButtonTheme.whiteBGpurpleSD.btnStyle]}>
            <SmallText
              textStyle={{
                fontSize: 14,
                fontWeight: '700',
                color: colors.black,
              }}>
              홍현지님이 관심있는 태그
            </SmallText>
            <TagChipSection>
              {personalTagData.map((value: {title: string; flag: boolean}) => {
                return (
                  <SmallButton
                    btnStyles={[
                      ButtonTheme.whiteBGpurpleSD.btnStyle,
                      {
                        height: 30,
                        minWidth: DimensionTheme.width(26),
                        paddingTop: 1,
                        paddingBottom: 2,
                        borderRadius: 8,
                        marginBottom: 15,
                        marginLeft: 10,
                      },
                    ]}
                    textStyles={{
                      color: colors.black,
                      fontSize: DimensionTheme.fontSize(12),
                    }}
                    onPress={() => {}}>
                    #{value.title}
                  </SmallButton>
                );
              })}
            </TagChipSection>
          </IntersetTagSection>
          <StatisticsSection>
            <FeedStaticSection style={[ButtonTheme.whiteBGpurpleSD.btnStyle]}>
              <SmallText
                textStyle={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: colors.black,
                }}>
                홍현지님이 읽은 일일 피드 수
              </SmallText>
              <Image source={imagePath.sampleStat} />
            </FeedStaticSection>
            <FeedStaticSection style={[ButtonTheme.whiteBGpurpleSD.btnStyle]}>
              <SmallText
                textStyle={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: colors.black,
                }}>
                홍현지님이 읽은 일일 피드 수
              </SmallText>
              <Image source={imagePath.sampleStat} />
            </FeedStaticSection>
          </StatisticsSection>
        </RoundSection>
      </HeaderSection>
    </MyPageContainer>
  );
};
