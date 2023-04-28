import React, {FC, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {SceneMap} from 'react-native-tab-view';

import {LikeScreen} from './LikeScreen';
import {Container, DimensionTheme} from '../../components/common/shared';
import {StatisticsScreen} from './StatisticsScreen';
import {routeProps, sceneMapProps} from '../../components/common/Tab/type';
import {Header} from '../../components/common/Header/Header';
import RegularText from '../../components/common/Texts/RegularText';
import {NavigationData} from '../../navigation/AppNavigator';
import {Tab} from '../../components/common/Tab/Tab';

const HistoryContainer = styled(Container)`
  align-items: flex-start;
`;

const HeaderSection = styled.View`
  margin-top: ${DimensionTheme.width(15)};
  margin-left: ${DimensionTheme.width(11)};
`;

type Props = NavigationData<'History'>;

export const MyHistoryScreen: FC<Props> = ({navigation}) => {
  const [routes] = useState<routeProps[]>([
    {key: 'like', title: 'LIKE'},
    {key: 'bookmark', title: 'BOOKMARK'},
    {key: 'recent', title: 'RECENT'},
    {key: 'statistics', title: 'STATISTICS'},
  ]);

  const sceneMaps = SceneMap<sceneMapProps>({
    like: LikeScreen,
    bookmark: LikeScreen,
    recent: LikeScreen,
    statistics: StatisticsScreen,
  });

  return (
    <HistoryContainer>
      <HeaderSection>
        <Header navigation={navigation} />
        <RegularText textStyle={{marginLeft: DimensionTheme.width(20)}}>
          MY HISTORY
        </RegularText>
      </HeaderSection>
      <Tab routes={routes} sceneMap={sceneMaps} />
    </HistoryContainer>
  );
};
