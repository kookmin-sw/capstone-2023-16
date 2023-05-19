import React, {FC, useState} from 'react';
import {SceneMap} from 'react-native-tab-view';
//@ts-ignore
import styled from 'styled-components/native';
import {Header} from '../../components/common/Header/Header';
import {Container, DimensionTheme} from '../../components/common/shared';
import {Tab} from '../../components/common/Tab/Tab';
import {routeProps, sceneMapProps} from '../../components/common/Tab/type';
import RegularText from '../../components/common/Texts/RegularText';
import {NavigationData} from '../../navigation/AppNavigator';
import {LikeScreen} from '../MyHistory/LikeScreen';
import {StatisticsScreen} from '../MyHistory/StatisticsScreen';

import {selectPersona} from '../../redux/slices/userSlice';
import {useAppSelector} from '../../redux/hooks';

const ContentContainer = styled(Container)`
  align-items: flex-start;
`;

const HeaderSection = styled.View`
  margin-top: ${DimensionTheme.width(15)};
  margin-left: ${DimensionTheme.width(11)};
`;

type Props = NavigationData<'MyContent'>;

export const MyContentScreen: FC<Props> = ({navigation}) => {
  const persona = useAppSelector(selectPersona);
  console.log(persona);

  const [routes] = useState<routeProps[]>([
    {key: 'all', title: 'ALL'},
    {key: 'free', title: 'FREE'},
    {key: 'waiterm', title: 'WAITERM'},
    {key: 'membership', title: 'MEMBERSHIP'},
  ]);

  const sceneMaps = SceneMap<sceneMapProps>({
    all: LikeScreen,
    free: LikeScreen,
    waiterm: LikeScreen,
    membership: StatisticsScreen,
  });

  return (
    <ContentContainer>
      <HeaderSection>
        <Header navigation={navigation} />
        <RegularText textStyle={{marginLeft: DimensionTheme.width(20)}}>
          {persona.nickname}님의 CONTENT
        </RegularText>
      </HeaderSection>
      <Tab routes={routes} sceneMap={sceneMaps} />
    </ContentContainer>
  );
};
