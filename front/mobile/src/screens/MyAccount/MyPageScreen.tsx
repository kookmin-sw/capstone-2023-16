import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Image, Platform} from 'react-native';

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
import {personalTagData, TagColor} from '../../constants/tag';
import {NavigationData} from '../../navigation/AuthNavigator';
import {ProfileShortDescription} from '../../constants/profile';

const BackgroundSection = styled.ImageBackground`
  flex: 1;
  width: 100%;
  align-items: center;
`;

const MyPageContainer = styled(Container)`
  flex: 1;
  align-items: center;
  width: 100%;
  background-color: transparent;
`;

const RoundSection = styled.View`
  flex: 1;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  background-color: ${colors.white};
  padding: 20px;
  min-height: 100%;
`;

const ProfileSection = styled.View`
  align-items: center;
`;

const ProfileImage = styled.Image`
  border-radius: 100px;
  border: 1px solid ${colors.purple};
  z-index: 2;
  margin-top: ${Platform.OS === 'ios'
    ? DimensionTheme.height(150)
    : DimensionTheme.height(300)};
  margin-bottom: -${DimensionTheme.height(30)};
  width: ${DimensionTheme.width(74)};
  height: ${DimensionTheme.height(74)};
  padding: 25px;
  align-items: center;
  justify-contents: center;
`;

const ProfileDescription = styled.View`
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 30px;
`;

const TabSection = styled.View`
  flex-direction: row;
  algin-items: center;
  margin-top: 20px;
  width: 100%;
`;

const ScrollSection = styled.ScrollView``;

const RepresentingTagSection = styled.View`
  margin-top: 30px;
  border-radius: 20px;
  padding: 10px;
`;

const IntersetTagSection = styled.View`
  margin-top: 30px;
  border-radius: 20px;
  padding: 10px;
`;

const TagChipSection = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-contents: space-between;
  flex-wrap: wrap;
`;

const StatisticsSection = styled.View``;

const FeedStaticSection = styled.View`
  padding: 10px;
  margin-top: 30px;
  hegiht: 167px;
  border-radius: 20px;
`;

type Props = NavigationData<'MyPage'>;

export const MyPageScreen: FC<Props> = ({navigation}) => {
  return (
    <BackgroundSection source={imagePath.background}>
      <MyPageContainer>
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
                {ProfileShortDescription}
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
              onPress={() => {
                navigation.navigate('History');
              }}>
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
          <ScrollSection>
            <RepresentingTagSection
              style={[ButtonTheme.whiteBGpurpleSD.btnStyle]}>
              <SmallText
                textStyle={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: colors.black,
                }}>
                홍현지님을 소개하는 태그
              </SmallText>
              <TagChipSection>
                {personalTagData.map(
                  (value: {title: string; category: string}) => {
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
                            backgroundColor: TagColor[value.category],
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
                  },
                )}
              </TagChipSection>
            </RepresentingTagSection>
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
                {personalTagData.map(
                  (value: {title: string; category: string}) => {
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
                            backgroundColor: TagColor[value.category],
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
                  },
                )}
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
            </StatisticsSection>
          </ScrollSection>
        </RoundSection>
      </MyPageContainer>
    </BackgroundSection>
  );
};
