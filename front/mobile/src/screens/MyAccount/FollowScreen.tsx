import React, {FC, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {SceneMap} from 'react-native-tab-view';

import {Container, DimensionTheme} from '../../components/common/shared';
import {routeProps, sceneMapProps} from '../../components/common/Tab/type';
import {Header} from '../../components/common/Header/Header';
import {NavigationData} from '../../navigation/AppNavigator';
import {Tab} from '../../components/common/Tab/Tab';
import {FollowingScreen} from './FollowingScreen';
import {FollowerScreen} from './FollowerScreen';

const FolloweContainer = styled(Container)`
  align-items: flex-start;
`;

const HeaderSection = styled.View`
  margin-top: ${DimensionTheme.width(15)};
  margin-left: ${DimensionTheme.width(11)};
`;

type Props = NavigationData<'Follow'>;

export const FollowScreen: FC<Props> = ({navigation}) => {
  const [routes] = useState<routeProps[]>([
    {key: 'following', title: 'FOLLOWING'},
    {key: 'follower', title: 'FOLLOWER'},
  ]);

  const sceneMaps = SceneMap({
    following: FollowingScreen,
    follower: FollowerScreen,
  });

  return (
    <FolloweContainer>
      <HeaderSection>
        <Header navigation={navigation} />
      </HeaderSection>
      <Tab routes={routes} sceneMap={sceneMaps} />
    </FolloweContainer>
  );
};
