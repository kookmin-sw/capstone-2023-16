import React, {FC, useEffect, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Image, Platform, TouchableOpacity} from 'react-native';

import * as ButtonTheme from '../../components/common/theme';
import {colors} from '../../components/common/colors';
import {Container, DimensionTheme} from '../../components/common/shared';
import SmallText from '../../components/common/Texts/SmallText';
import {imagePath} from '../../utils/imagePath';
import {NavigationData} from '../../navigation/AppNavigator';

import {TagCard} from '../../components/common/Cards/TagCard';
import {StatisticsCard} from '../../components/common/Cards/StatisticsCard';
import {useAppSelector} from '../../redux/hooks';
import {selectPersona} from '../../redux/slices/userSlice';
import ImageButton from '../../components/common/Buttons/ImageButton';
import {RoundedTab} from '../../components/common/Tab/RoundedTab';
import {CustomLineChart} from '../../components/common/Charts/CustomLineChart';
import {getPublicPersona} from '../../relay/Persona/getPublicPersona';
import {getOwnPersonas} from '../../relay/Persona/getOwnPersonas';
import {getOwnReadPostStatistics} from '../../relay/Statistics/getOwnReadPostStatistics';
import {CustomPieChart} from '../../components/common/Charts/CustomPieChart';
import {getOwnReadPostStatisticsPerWeekday} from '../../relay/Statistics/getOwnReadPostStatisticsPerWeekday';
import {getFollowingPersonasStatistics} from '../../relay/Statistics/getFollowingPersonasStatistics';
import {getPersonaFollowersStatistics} from '../../relay/Statistics/getPersonaFollowersStatistics';
import {getPersonaPosts} from '../../relay/Persona/getPersonaPosts';
import {CustomProgressChart} from '../../components/common/Charts/CustomProgressChart';
import {CustomBarChart} from '../../components/common/Charts/CustomBarChart';

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
  justfiy-conent: space-between;
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

const IntersetTagSection = styled.View`
  margin-top: 30px;
`;

const StatisticsSection = styled.View`
  margin-top: 30px;
`;

type Props = NavigationData<'MyPage'>;

export const MyPageScreen: FC<Props> = ({navigation, route}) => {
  const persona = useAppSelector(selectPersona);
  const [data, setData] = useState();
  const [lineChartLabel, setLineChartLabel] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [post, setPost] = useState();
  const [stackedBarLegend, setStackedBarLegend] = useState([]);
  const [stackedBarBirth, setStackedBarBirth] = useState([]);
  const [stackedBarGender, setStackedBarGender] = useState([]);
  const [stackedBarJob, setStackedBarJob] = useState([]);

  useEffect(() => {
    const fetchStatisticsFollower = async (personaId: any) => {
      setLineChartData([]);
      setLineChartLabel([]);
      try {
        const response = await getPersonaFollowersStatistics({
          personaId: personaId,
          resultLimit: 20,
        });

        console.log('follower stat : ', response.getPersonaFollowersStatistics);
        let total = 0;
        let tmp = 0;
        response.getPersonaFollowersStatistics.genderScores.map(item => {
          total += item.score;
          if (
            item.label ===
            response.getPersonaFollowersStatistics.genderScores[0].label
          ) {
            tmp += item.score;
          }
        });
        setLineChartLabel(prev => [
          ...prev,
          response.getPersonaFollowersStatistics.genderScores[0].label,
        ]);
        setLineChartData(prev => [...prev, tmp / total]);
        total = 0;
        tmp = 0;
        response.getPersonaFollowersStatistics.jobScores.map(item => {
          total += item.score;
          if (
            item.label ===
            response.getPersonaFollowersStatistics.jobScores[0].label
          ) {
            tmp += item.score;
          }
        });
        setLineChartLabel(prev => [
          ...prev,
          response.getPersonaFollowersStatistics.jobScores[0].label,
        ]);
        setLineChartData(prev => [...prev, tmp / total]);
      } catch (error) {
        console.log('error on follower ; ', error);
      }
    };
    const fetchStatisticsFollowing = async (end: Date) => {
      const start = new Date(end);
      start.setDate(end.getDate() - 31);
      try {
        const response = await getFollowingPersonasStatistics({
          datetimeBetween: {
            endDatetime: end.toISOString().replace('Z', ''),
            startDatetime: start.toISOString().replace('Z', ''),
          },
        });
        // console.log('follwoing stat : ', response);
      } catch (error) {
        console.log('error on following ; ', error);
      }
    };
    const fetchStatisticsReadData = async (end: Date) => {
      const start = new Date(end);
      start.setDate(end.getDate() - 31);
      try {
        const response = await getOwnReadPostStatistics({
          datetimeBetween: {
            endDatetime: end.toISOString().replace('Z', ''),
            startDatetime: start.toISOString().replace('Z', ''),
          },
        });
        console.log('read stat : ', response.getOwnReadPostStatistics);
      } catch (error) {
        console.log('error on readStat ; ', error);
      }
    };
    const fetchStatisticsPerWeekData = async (end: Date) => {
      const start = new Date(end);
      start.setDate(end.getDate() - 8);
      setLineChartData([]);
      setLineChartLabel([]);
      try {
        const response = await getOwnReadPostStatisticsPerWeekday({
          endDatetime: end.toISOString().replace('Z', ''),
          startDatetime: start.toISOString().replace('Z', ''),
        });
        response.getOwnReadPostStatisticsPerWeekday.elements.map(item => {
          setLineChartData(prev => [...prev, parseInt(item.count)]);
          setLineChartLabel(prev => [...prev, item.label]);
        });

        // console.log('stat', response.getOwnReadPostStatisticsPerWeekday);
      } catch (error) {
        console.log('error on stat : ', error);
      }
    };
    console.log('current persona_id : ', persona.id);
    const fetchPublicPersona = async () => {
      try {
        const response = await getPublicPersona(route.params.id);
        // console.log('pulbic persona : ', response);
        setData(response);
      } catch (error) {
        console.error('Error on public persona:', error);
      }
    };
    const fetchPublicData = async (persona_id: any) => {
      try {
        const response = await getPersonaPosts({id: persona_id});
        // console.log('pulbic data : ', response);
        setPost(response);
      } catch (error) {
        console.error('Error on public data:', error);
      }
    };

    const fetchMyData = async () => {
      try {
        const response = await getOwnPersonas(persona.nickname);
        setData(response);
        console.log('my persona : ', response);
      } catch (error) {
        console.log('Error on my data: ', error);
      }
    };

    if (route.params.isMine) {
      console.log('called!');
      const end = new Date();
      end.setDate(end.getDate() + 1);
      fetchMyData();
      fetchStatisticsReadData(end);
      fetchStatisticsPerWeekData(end);
      fetchStatisticsFollowing(end);
      fetchPublicData(persona.id);
    } else {
      fetchPublicPersona();
      fetchStatisticsFollower(route.params.id);
      fetchPublicData(route.params.id);
    }
  }, [persona.id, route.params.isMine]);

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
              {route.params.isMine ? 'READER' : 'CREATOR'}
            </SmallText>
            <ProfileDescription>
              <SmallText textStyle={{color: colors.black}}>
                {data ? data.introduction : null}
              </SmallText>
            </ProfileDescription>
          </ProfileSection>
          <TabSection>
            <RoundedTab
              tabInfo={
                route.params.isMine
                  ? [
                      {
                        title: 'MY CONTENT',
                        key: 'MyContent',
                        persona_nick: persona.nickname,
                        data: {
                          posts: post?.getPublicPosts,
                        },
                      },
                      {
                        title: 'FOLLOW',
                        key: 'Follow',
                        isMine: true,
                        followingList: data?.followingPersonas,
                        followerList: data?.followerPersonas,
                      },
                      {
                        title: 'HISTORY',
                        key: 'History',
                        data: {
                          likedPosts: data?.likedPosts,
                          bookmarks: data?.bookmarks,
                        },
                      },
                      {title: 'PERSONA', key: 'Persona'},
                    ]
                  : [
                      {
                        title: 'CONTENT',
                        key: 'MyContent',
                        data: {
                          posts: post?.getPublicPosts,
                        },
                        persona_nick: route.params.nickname,
                      },
                      {
                        title: 'FOLLOW',
                        key: 'Follow',
                        isMine: false,
                        followingList: data?.followingPersonas,
                        followerList: data?.followerPersonas,
                        persona_id: data?.id,
                      },
                      {title: 'MEMBERSHIP', key: 'Default'},
                      {title: 'DONATE', key: 'Default'},
                    ]
              }
            />
          </TabSection>
          <ScrollSection>
            {data && data.preferredTags.edges.length > 0 ? (
              <IntersetTagSection>
                <TagCard
                  tagTitle={`${data && data.nickname}님이 선호하는 태그`}
                  tags={data && data?.preferredTags.edges}
                />
              </IntersetTagSection>
            ) : null}
            <StatisticsSection>
              {route.params.isMine ? (
                <StatisticsCard
                  statisticsTitle={`${
                    data && data.nickname
                  }님이 요일별 읽은 피드 수`}>
                  {lineChartData.length === 7 && lineChartLabel ? (
                    <CustomLineChart
                      data={lineChartData}
                      label={lineChartLabel}
                    />
                  ) : null}
                </StatisticsCard>
              ) : (
                <StatisticsCard
                  statisticsTitle={`${data && data.nickname}님의 주요 팔로워`}>
                  <CustomProgressChart
                    data={lineChartData}
                    label={lineChartLabel}
                  />
                </StatisticsCard>
              )}
            </StatisticsSection>
            <StatisticsSection>
              {route.params.isMine ? (
                <StatisticsCard
                  statisticsTitle={`${
                    data && data.nickname
                  }님이 분야별 읽은 피드 수`}>
                  <CustomPieChart />
                </StatisticsCard>
              ) : (
                <StatisticsCard
                  statisticsTitle={`${data && data.nickname}님의 팔로워 분포`}>
                  <CustomBarChart />
                </StatisticsCard>
              )}
            </StatisticsSection>
          </ScrollSection>
        </RoundSection>
      </MyPageContainer>
    </BackgroundSection>
  );
};
