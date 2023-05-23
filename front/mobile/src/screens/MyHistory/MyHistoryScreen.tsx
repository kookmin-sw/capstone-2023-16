import React, {FC, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {SceneMap} from 'react-native-tab-view';

import {LikeScreen} from './LikeScreen';
import {Container, DimensionTheme} from '../../components/common/shared';
import {StatisticsScreen} from './StatisticsScreen';
import {routeProps} from '../../components/common/Tab/type';
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

export const MyHistoryScreen: FC<Props> = ({navigation, route}) => {
  const [routes] = useState<routeProps[]>([
    {key: 'like', title: 'LIKE'},
    {key: 'bookmark', title: 'BOOKMARK'},
    {key: 'recent', title: 'RECENT'},
    {key: 'statistics', title: 'STATISTICS'},
  ]);

  const props = route;
  console.log('history', props);

  const sceneMaps = ({route}) => {
    switch (route.key) {
      case 'like':
        return (
          <LikeScreen
            type={route.key}
            data={props.params?.data?.likedPosts}
            name={'history'}
          />
        );
      case 'bookmark':
        return (
          <LikeScreen
            type={route.key}
            data={props.params?.data?.bookmarks}
            name={'history'}
          />
        );
      case 'recent':
        return (
          <LikeScreen
            type={route.key}
            data={props.params?.date?.likedPosts}
            name={'history'}
          />
        );
      case 'statistics':
        return <StatisticsScreen />;
      default:
        return null;
    }
  };

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
