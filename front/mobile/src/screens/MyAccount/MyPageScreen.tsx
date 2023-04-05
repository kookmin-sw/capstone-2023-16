import React, {FC, useEffect} from 'react';
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

import {useLazyLoadQuery} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import {TagCard} from '../../components/common/Cards/TagCard';
import {StatisticsCard} from '../../components/common/Cards/StatisticsCard';

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
  justify-content: center;
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
`;

const IntersetTagSection = styled.View`
  margin-top: 30px;
`;

const StatisticsSection = styled.View`
  margin-top: 30px;
`;

const FeedStaticSection = styled.View`
  padding: 10px;
  margin-top: 30px;
  hegiht: 167px;
  border-radius: 20px;
`;

const getOwnPersonaQuery = graphql`
  query MyPageScreenQuery($nickname: String!) {
    getOwnPersonas(
      nicknameFilter: {token: $nickname}
      sortingOpt: {sortBy: ID}
    ) {
      edges {
        node {
          introduction
          id
          isCertified
          isPublic
          nickname
          preferredCategories {
            edges {
              node {
                body
                id
              }
            }
          }
        }
      }
    }
  }
`;

type Props = NavigationData<'MyPage'>;

export const MyPageScreen: FC<Props> = ({navigation}) => {
  const nickname = 'testpersona';
  const data = useLazyLoadQuery(
    getOwnPersonaQuery,
    {nickname},
    {fetchPolicy: 'store-or-network'},
  );

  useEffect(() => {
    console.log('###mypage');
    console.log(data.getOwnPersonas.edges[0].node);
  }, [data]);

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
                {data.getOwnPersonas.edges[0].node.introduction}
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
              onPress={() => {
                navigation.navigate('Follower');
              }}>
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
              onPress={() => {
                navigation.navigate('Persona');
              }}>
              PERSONA
            </SmallButton>
          </TabSection>
          <ScrollSection>
            <RepresentingTagSection>
              <TagCard
                tagTitle={`${data.getOwnPersonas.edges[0].node.nickname}님을 소개하는 태그`}
                tags={personalTagData}
              />
            </RepresentingTagSection>
            <IntersetTagSection>
              <TagCard
                tagTitle={`${data.getOwnPersonas.edges[0].node.nickname}님이 관심있는 태그`}
                tags={personalTagData}
              />
            </IntersetTagSection>
            <StatisticsSection>
              <StatisticsCard
                statisticsTitle={`${data.getOwnPersonas.edges[0].node.nickname}님이 읽은 일일 피드 수`}
              />
            </StatisticsSection>
          </ScrollSection>
        </RoundSection>
      </MyPageContainer>
    </BackgroundSection>
  );
};
