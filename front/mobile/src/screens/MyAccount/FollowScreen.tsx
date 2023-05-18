import React, {FC, useEffect, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import {Container, DimensionTheme} from '../../components/common/shared';
import {routeProps} from '../../components/common/Tab/type';
import {Header} from '../../components/common/Header/Header';
import {NavigationData} from '../../navigation/AppNavigator';
import {Tab} from '../../components/common/Tab/Tab';
import {FollowingScreen} from './FollowingScreen';
import {FollowerScreen} from './FollowerScreen';
import SmallButton from '../../components/common/Buttons/SmallButton';
import * as ButtonTheme from '../../components/common/theme';
import {colors} from '../../components/common/colors';

const FolloweContainer = styled(Container)`
  align-items: flex-start;
`;

const HeaderSection = styled.View`
  margin-top: ${DimensionTheme.width(15)};
  margin-left: ${DimensionTheme.width(11)};
  flex-direction: row;
`;

type Props = NavigationData<'Follow'>;

export const FollowScreen: FC<Props> = ({navigation, route}) => {
  const [routes] = useState<routeProps[]>([
    {key: 'following', title: 'FOLLOWING'},
    {key: 'follower', title: 'FOLLOWER'},
  ]);

  const [followingList, SetFollowingList] = useState([]);
  const [followerList, SetFollowerList] = useState([]);

  const props = route;

  useEffect(() => {
    SetFollowerList([]);
    SetFollowerList([]);
    console.log('###followList');
    console.log(props.params);

    props.params?.followingList?.edges.map(item => {
      SetFollowingList(prev => [...prev, item.node]);
    });
    props.params?.followerList?.edges.map(item => {
      SetFollowerList(prev => [...prev, item.node]);
    });
  }, []);

  const sceneMaps = ({route}) => {
    switch (route.key) {
      case 'following':
        return <FollowingScreen data={followingList} />;
      case 'follower':
        return <FollowerScreen data={followerList} />;
      default:
        return null;
    }
  };

  return (
    <FolloweContainer>
      <HeaderSection>
        <Header navigation={navigation} />
        {route.params.isMine ? null : (
          <SmallButton
            btnStyles={[
              ButtonTheme.purpleBGSD.btnStyle,
              {
                height: DimensionTheme.width(30),
                width: DimensionTheme.width(55),
                borderRadius: 10,
                marginTop: DimensionTheme.width(7),
                marginLeft: DimensionTheme.width(280),
              },
            ]}
            textStyles={{color: colors.black}}
            onPress={() => {}}>
            팔로우
          </SmallButton>
        )}
      </HeaderSection>
      {/* <SmallButton onPress={() => {}}>팔로우</SmallButton> */}
      <Tab routes={routes} sceneMap={sceneMaps} />
    </FolloweContainer>
  );
};
