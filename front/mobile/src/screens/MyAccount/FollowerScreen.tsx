import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Platform} from 'react-native';

import {Container, DimensionTheme} from '../../components/common/shared';
import RegularText from '../../components/common/Texts/RegularText';
import SmallText from '../../components/common/Texts/SmallText';
import {colors} from '../../components/common/colors';
import {SearchInput} from '../../components/common/Inputs/SearchInput';
import CardSection from '../../components/MyAccount/FollowCardSection';

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

type FollowProps = {
  data: any;
};

export const FollowerScreen: FC<FollowProps> = props => {
  console.log('follow: ', props);
  return (
    <FollowingContainer>
      <TopSection>
        <RegularText textStyle={{marginRight: 9}}>FOLLOWER</RegularText>
        <SmallText
          textStyle={{
            marginTop: Platform.OS === 'ios' ? 7 : 3,
            color: colors.black,
          }}>
          {props.data?.length}명
        </SmallText>
      </TopSection>
      <SearchInput viewStyle={{marginLeft: 20}} placeholder="팔로워 검색" />
      <FollowingCardSection>
        <CardSection data={props.data} />
      </FollowingCardSection>
    </FollowingContainer>
  );
};
