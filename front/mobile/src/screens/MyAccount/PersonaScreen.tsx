import React, {FC, useEffect, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Image, Platform, TouchableOpacity} from 'react-native';

import {
  Container,
  DimensionTheme,
  ScreenHeight,
  StatusBarHeight,
} from '../../components/common/shared';
import * as ButtomTheme from '../../components/common/theme';
import RegularText from '../../components/common/Texts/RegularText';
import SmallText from '../../components/common/Texts/SmallText';
import {colors} from '../../components/common/colors';
import {SearchInput} from '../../components/common/Inputs/SearchInput';
import {NavigationData} from '../../navigation/AppNavigator';
import CardSection from '../../components/MyAccount/FollowCardSection';
import {FollowingData} from '../../constants/follow';

import {graphql} from 'babel-plugin-relay/macro';
import {useLazyLoadQuery} from 'react-relay';
import SmallButton from '../../components/common/Buttons/SmallButton';
import ImageButton from '../../components/common/Buttons/ImageButton';
import {imagePath} from '../../utils/imagePath';

const FollowingContainer = styled(Container)`
  align-items: flex-start;
  margin-top: 30px;
  flex: 1;
`;

const HeaderSection = styled.View`
  margin-top: ${DimensionTheme.width(50)};
  flex-direction: row;
  padding: 10px;
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

  const [personas, SetPersonas] = useState([]);

  useEffect(() => {
    SetPersonas([]);
    console.log('###personaList');
    console.log(data.getOwnPersonas.edges);
    data.getOwnPersonas.edges.map(item => {
      SetPersonas(prev => [...prev, item.node]);
    });
  }, [data]);

  return (
    <FollowingContainer>
      <HeaderSection>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}>
          <Image
            style={{
              width: DimensionTheme.width(22),
              height: DimensionTheme.width(22),
            }}
            source={imagePath.backBtn}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <SmallButton
          btnStyles={[
            ButtomTheme.whiteBG.btnStyle,
            {
              width: DimensionTheme.width(42),
              height: DimensionTheme.width(30),
              borderRadius: 8,
              marginRight: 8,
              marginLeft: DimensionTheme.width(247),
            },
          ]}
          textStyles={{color: colors.black}}
          onPress={() => {
            navigation.navigate('BaseInfo');
          }}>
          생성
        </SmallButton>
        <SmallButton
          btnStyles={[
            ButtomTheme.whiteBG.btnStyle,
            {
              width: DimensionTheme.width(42),
              height: DimensionTheme.width(30),
              borderRadius: 8,
            },
          ]}
          textStyles={{color: colors.black}}
          onPress={() => {}}>
          수정
        </SmallButton>
      </HeaderSection>
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
        <CardSection data={personas} />
      </FollowingCardSection>
    </FollowingContainer>
  );
};
