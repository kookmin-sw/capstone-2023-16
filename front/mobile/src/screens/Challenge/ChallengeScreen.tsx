import {NavigationProp} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';
import SmallButton from '../../components/common/Buttons/SmallButton';
import ChallengeCardSection from '../../components/common/Challenge/ChallengeCardSection';
import {colors} from '../../components/common/colors';
import {
  Container,
  DimensionTheme,
  ScreenWidth,
} from '../../components/common/shared';
import RegularText from '../../components/common/Texts/RegularText';
import * as ButtonTheme from '../../components/common/theme';
import {imagePath} from '../../utils/imagePath';
import {
  challengeData,
  challengeDataRecruit,
} from '../../constants/challengeCard';
import {Header} from '../../components/common/Header/Header';

const BackgroundSection = styled.ImageBackground`
  flex: 1;
  width: 100%;
  align-items: center;
`;

const ChallengeContainer = styled(Container)`
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
`;

const TabSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${DimensionTheme.width(20)};
  width: 100%;
`;

const BodySection = styled.View`
  align-items: center;
  margin-right: ${DimensionTheme.width(22)};
`;

type Props = NavigationProp<'Challenge'>;

export const ChallengeScreen: FC<Props> = ({navigation}) => {
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    {key: 'myChallenge', body: <ChallengeCardSection type="myChallenge" />},
    {key: 'all', body: <ChallengeCardSection type="all" />},
    {
      key: 'recruit',
      body: <ChallengeCardSection type="recruit" />,
    },
  ]);

  return (
    <BackgroundSection source={imagePath.background}>
      <ChallengeContainer>
        <Header
          navigation={navigation}
          title={'CHALLENGE'}
          titleStyle={{
            marginLeft: DimensionTheme.width(91),
            marginRight: DimensionTheme.width(123),
          }}
        />
        <TabSection>
          <SmallButton
            btnStyles={[
              ButtonTheme.whiteBGpurpleSD.btnStyle,
              {
                minWidth: ScreenWidth * 0.3,
                height: 58,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            ]}
            textStyles={{fontSize: 12, color: colors.black}}
            onPress={() => {
              setIndex(0);
            }}>
            MY CHALLENGE
          </SmallButton>
          <SmallButton
            btnStyles={[
              ButtonTheme.whiteBGpurpleSD.btnStyle,
              {
                minWidth: ScreenWidth * 0.15,
                height: 58,
                borderRadius: 0,
              },
            ]}
            textStyles={{fontSize: 12, color: colors.black}}
            onPress={() => {
              setIndex(1);
            }}>
            ALL
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
              setIndex(2);
            }}>
            RECRUIT
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
              navigation.navigate('ChallengeCreate');
            }}>
            CREATE
          </SmallButton>
        </TabSection>
        <BodySection>{routes[index].body}</BodySection>
      </ChallengeContainer>
    </BackgroundSection>
  );
};
