import React, {FC} from 'react';
import {ImageBackground} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';
import {Container} from '../components/common/shared';
import {imagePath} from '../utils/imagePath';

const WelcomeSection = styled(Container)``;
export const WelcomeScreen: FC = () => {
  return (
    <WelcomeSection>
      <ImageBackground source={imagePath.welcome} />
    </WelcomeSection>
  );
};
