import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Header} from '../../components/common/Header/Header';
import {Container} from '../../components/common/shared';
import {NavigationData} from '../../navigation/AppNavigator';

const DetailContainer = styled(Container)``;

type Props = NavigationData<'ChallengeDetail'>;

export const ChallengeDetailScreen: FC<Props> = ({navigation}) => {
  return (
    <DetailContainer>
      <Header navigation={navigation} title={'에세이를 사랑하는 사람들'} />
    </DetailContainer>
  );
};
