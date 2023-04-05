import React, {FC} from 'react';
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

type Props = NavigationData<'Follower'>;

export const FollowerScreen: FC<Props> = ({navigation}) => {
  return (
    <FollowingContainer>
      <TopSection>
        <RegularText textStyle={{marginRight: 9}}>FOLLOWER</RegularText>
        <SmallText
          textStyle={{
            marginTop: Platform.OS === 'ios' ? 7 : 3,
            color: colors.black,
          }}>
          {FollowingData.length}명
        </SmallText>
      </TopSection>
      <SearchInput viewStyle={{marginLeft: 20}} placeholder="팔로워 검색" />
      <FollowingCardSection>
        <CardSection data={FollowingData} />
      </FollowingCardSection>
    </FollowingContainer>
  );
};
