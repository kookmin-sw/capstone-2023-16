import React, {FC, useEffect} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Platform} from 'react-native';

import {Container, DimensionTheme} from '../../components/common/shared';
import RegularText from '../../components/common/Texts/RegularText';
import SmallText from '../../components/common/Texts/SmallText';
import {colors} from '../../components/common/colors';
import {SearchInput} from '../../components/common/Inputs/SearchInput';
import {NavigationData} from '../../navigation/AuthNavigator';
import CardSection from '../../components/MyAccount/FollowCardSection';
import {FollowingData} from '../../constants/follow';

import {graphql} from 'babel-plugin-relay/macro';
import {useLazyLoadQuery} from 'react-relay';

const FollowingContainer = styled(Container)`
  align-items: flex-start;
  margin-top: 30px;
  flex: 1;
`;

const TopSection = styled.View`
  margin-left: ${DimensionTheme.width(33)};
  flex-direction: row;
  justify-content: center;
`;

const FollowingCardSection = styled.View`
  margin-top: 80px;
`;

const getOwnPersonasQuery = graphql`
  query PersonaScreenQuery {
    getOwnPersonas(sortingOpt: {direction: ASC}) {
      edges {
        node {
          id
          nickname
        }
      }
    }
  }
`;

type Props = NavigationData<'Persona'>;

export const PersonaScreen: FC<Props> = ({navigation}) => {
  const data = useLazyLoadQuery(getOwnPersonasQuery, {
    fetchPolicy: 'store-or-network',
  });

  useEffect(() => {
    console.log('###personaList');
    console.log(data.getOwnPersonas.edges);
  }, [data]);

  return (
    <FollowingContainer>
      <TopSection>
        <RegularText textStyle={{marginRight: 9}}>PERSONA</RegularText>
        <SmallText
          textStyle={{
            marginTop: Platform.OS === 'ios' ? 7 : 3,
            color: colors.black,
          }}>
          {data.getOwnPersonas.edges.length}명
        </SmallText>
      </TopSection>
      <SearchInput viewStyle={{marginLeft: 20}} placeholder="페르소나 검색" />
      <FollowingCardSection>
        <CardSection data={FollowingData} />
      </FollowingCardSection>
    </FollowingContainer>
  );
};
