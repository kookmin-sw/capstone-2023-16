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

//@ts-ignore
import {graphql} from 'babel-plugin-relay/macro';
import {useMutation} from 'react-relay';
import {useAppSelector} from '../../redux/hooks';
import {selectPersona} from '../../redux/slices/userSlice';

const FolloweContainer = styled(Container)`
  align-items: flex-start;
`;

const HeaderSection = styled.View`
  margin-top: ${DimensionTheme.width(15)};
  margin-left: ${DimensionTheme.width(11)};
  flex-direction: row;
`;

type Props = NavigationData<'Follow'>;
const PersonaFollow = graphql`
  mutation FollowScreenMutation(
    $personaFollowInput: PersonaFollowToggleInput!
  ) {
    personaFollowToggle(personaFollowInput: $personaFollowInput) {
      ... on PersonaFollowToggleOutput {
        followed
        followeePersona
      }
      ... on SelfFollowError {
        message
      }
    }
  }
`;

export const FollowScreen: FC<Props> = ({navigation, route}) => {
  const persona = useAppSelector(selectPersona);
  const [commit, isInFlight] = useMutation(PersonaFollow);
  const [routes] = useState<routeProps[]>([
    {key: 'following', title: 'FOLLOWING'},
    {key: 'follower', title: 'FOLLOWER'},
  ]);
  const [followState, setFollowState] = useState(false);

  const [followingList, SetFollowingList] = useState([]);
  const [followerList, SetFollowerList] = useState([]);

  const props = route;

  const personaFollowInput = {
    followeePersona: props.params.persona_id,
  };

  useEffect(() => {
    SetFollowerList([]);
    SetFollowerList([]);
    console.log('###followList');
    console.log(props.params.edges);

    props.params?.followingList?.edges.map(item => {
      SetFollowingList(prev => [...prev, item.node]);
    });
    props.params?.followerList?.edges.map(item => {
      SetFollowerList(prev => [...prev, item.node]);
      if (item.node.id === persona.id) {
        setFollowState(true);
      }
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
              followState
                ? ButtonTheme.purpleBGSD.btnStyle
                : ButtonTheme.whiteBG.btnStyle,
              {
                height: DimensionTheme.width(30),
                width: DimensionTheme.width(55),
                borderRadius: 10,
                marginTop: DimensionTheme.width(7),
                marginLeft: DimensionTheme.width(280),
              },
            ]}
            textStyles={{color: colors.black}}
            onPress={() => {
              console.log('onclikc');
              console.log(personaFollowInput);
              commit({
                variables: {personaFollowInput},
                onCompleted(data) {
                  console.log('foo');
                  console.log(data);
                  if (data.personaFollowToggle.followed) {
                    setFollowState(true);
                    SetFollowerList(prev => [
                      ...prev,
                      {id: persona.id, nickname: persona.nickname},
                    ]);
                  } else {
                    setFollowState(false);
                  }
                },
                onError(error) {
                  console.log(commit.toString());
                  console.log('@persona follow error : ', error);
                },
              });
            }}>
            {followState ? '팔로잉' : '팔로우'}
          </SmallButton>
        )}
      </HeaderSection>
      {/* <SmallButton onPress={() => {}}>팔로우</SmallButton> */}
      <Tab routes={routes} sceneMap={sceneMaps} />
    </FolloweContainer>
  );
};
