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

  useEffect(() => {
    // const fetchStatisticsData = async () => {
    //   try {
    //     const response = await getOwnReadPostStatistics(persona.id, {
    //       datetimeBetween: {
    //         endDatetime: '2023-05-11T15:20:27.999983',
    //         startDatetime: '2023-04-11T15:20:27.999955',
    //       },
    //     });
    //     console.log('stat', response);
    //   } catch (error) {
    //     console.log('error on stat : ', error);
    //   }
    // };
    console.log('current persona_id : ', persona.id);
    const fetchPulicData = async () => {
      try {
        const response = await getPublicPersona(route.params.id);
        console.log('pulbic persona : ');
        setData(response);
        console.log(data);
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
      fetchMyData();
    } else {
      fetchPulicData();
    }
  }, [persona.id, persona.nickname, route.params.id, route.params.isMine]);

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
                {data ? data.introduction : null}
              </SmallText>
            </ProfileDescription>
          </ProfileSection>
          <TabSection>
            <RoundedTab
              tabInfo={
                route.params.isMine
                  ? [
                      {title: 'MY CONTENT', key: 'MyContent'},
                      {
                        title: 'FOLLOW',
                        key: 'Follow',
                        isMine: true,
                        followingList: data?.followingPersonas,
                        followerList: data?.followerPersonas,
                      },
                      {title: 'HISTORY', key: 'History'},
                      {title: 'PERSONA', key: 'Persona'},
                    ]
                  : [
                      {title: 'CONTENT', key: 'MyContent'},
                      {
                        title: 'FOLLOW',
                        key: 'Follow',
                        isMine: false,
                        followingList: data?.followingPersonas,
                        followerList: data?.followerPersonas,
                      },
                      {title: 'MEMBERSHIP', key: 'History'},
                      {title: 'DONATE', key: 'Persona'},
                    ]
              }
            />
          </TabSection>
          <ScrollSection>
            <IntersetTagSection>
              <TagCard
                tagTitle={`${data && data.nickname}님이 선호하는 태그`}
                tags={data && data?.preferredTags.edges}
              />
            </IntersetTagSection>
            <StatisticsSection>
              <StatisticsCard
                statisticsTitle={`${
                  data && data.nickname
                }님이 읽은 일일 피드 수`}>
                {/* <CustomLineChart />  */}
              </StatisticsCard>
            </StatisticsSection>
          </ScrollSection>
        </RoundSection>
      </MyPageContainer>
    </BackgroundSection>
  );
};
