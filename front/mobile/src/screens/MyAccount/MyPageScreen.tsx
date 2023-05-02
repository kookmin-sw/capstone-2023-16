import React, {FC, useEffect} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Image, Platform, TouchableOpacity} from 'react-native';

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
import {NavigationData} from '../../navigation/AppNavigator';

import {useLazyLoadQuery} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';
import {TagCard} from '../../components/common/Cards/TagCard';
import {StatisticsCard} from '../../components/common/Cards/StatisticsCard';
import {useAppSelector} from '../../redux/hooks';
import {selectUser, selectPersona} from '../../redux/slices/userSlice';
import ImageButton from '../../components/common/Buttons/ImageButton';
import {RoundedTab} from '../../components/common/Tab/RoundedTab';

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

const HeaderSection = styled.View`
  flex: 1;
  margin-top: ${Platform.OS === 'ios' ? 40 : 10};
  flex-direction: row;
  position: absolute;
  left: 10px;
  top: 5px;
  z-index: 9;
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
  margin-top: 20px;
  margin-left: ${DimensionTheme.width(23)};
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

const getOwnPersonaQuery = graphql`
  query MyPageScreenQuery($nickname: String!, $personaId: GlobalID!) {
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
    getPublicPersona(personaId: $personaId) {
      nickname
      job
      id
      introduction
    }
  }
`;

type Props = NavigationData<'MyPage'>;

export const MyPageScreen: FC<Props> = ({navigation, route}) => {
  const user = useAppSelector(selectUser);
  const persona = useAppSelector(selectPersona);
  const nickname = persona.nickname;
  const personaId = persona.id;

  console.log('persona : ');
  console.log(persona);

  const data = useLazyLoadQuery(
    getOwnPersonaQuery,
    {nickname, personaId},
    {fetchPolicy: 'store-or-network'},
  );

  useEffect(() => {
    console.log(route.params.isMine);
    console.log(route.params.nickname);
    console.log('###mypage');
    console.log(data);
    console.log(`user : ${JSON.stringify(user)}`);
  }, [data]);

  return (
    <BackgroundSection source={imagePath.background}>
      <HeaderSection>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}>
          <Image
            style={{
              width: DimensionTheme.width(22),
              height: DimensionTheme.width(22),
              marginRight: DimensionTheme.width(230),
            }}
            source={imagePath.backBtn}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <ImageButton
          btnStyles={{backgroundColor: 'transparent', marginTop: -10}}
          source={imagePath.shareIcon}
          onPress={() => {
            navigation.navigate('Challenge');
          }}
        />
        <ImageButton
          btnStyles={{backgroundColor: 'transparent', marginTop: -10}}
          source={imagePath.editIcon}
          onPress={() => {}}
        />
        <ImageButton
          btnStyles={{backgroundColor: 'transparent', marginTop: -10}}
          source={imagePath.settingIcon}
          onPress={() => {
            navigation.navigate('Setting');
          }}
        />
      </HeaderSection>
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
                {route.params.isMine
                  ? data.getOwnPersonas.edges[0].node.introduction
                  : data.getPublicPersona.introduction}
              </SmallText>
            </ProfileDescription>
          </ProfileSection>
          <TabSection>
            <RoundedTab
              tabInfo={
                route.params.isMine
                  ? [
                      {title: 'MY CONTENT', key: 'MyContent'},
                      {title: 'FOLLOW', key: 'Follow'},
                      {title: 'HISTORY', key: 'History'},
                      {title: 'PERSONA', key: 'Persona'},
                    ]
                  : [
                      {title: 'CONTENT', key: 'MyContent'},
                      {title: 'FOLLOW', key: 'Follow'},
                      {title: 'MEMBERSHIP', key: 'History'},
                      {title: 'DONATE', key: 'Persona'},
                    ]
              }
            />
          </TabSection>
          <ScrollSection>
            <RepresentingTagSection>
              <TagCard
                tagTitle={`${
                  route.params.isMine
                    ? data.getOwnPersonas.edges[0].node.nickname
                    : data.getPublicPersona.nickname
                }님을 소개하는 태그`}
                tags={personalTagData}
              />
            </RepresentingTagSection>
            <IntersetTagSection>
              <TagCard
                tagTitle={`${
                  route.params.isMine
                    ? data.getOwnPersonas.edges[0].node.nickname
                    : data.getPublicPersona.nickname
                }님이 관심있는 태그`}
                tags={personalTagData}
              />
            </IntersetTagSection>
            <StatisticsSection>
              <StatisticsCard
                statisticsTitle={`${
                  route.params.isMine
                    ? data.getOwnPersonas.edges[0].node.nickname
                    : data.getPublicPersona.nickname
                }님이 읽은 일일 피드 수`}
              />
            </StatisticsSection>
          </ScrollSection>
        </RoundSection>
      </MyPageContainer>
    </BackgroundSection>
  );
};
