import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';

import * as ButtonTheme from '../components/common/theme';
import RegularButton from '../components/common/Buttons/RegularButton';
import {DimensionTheme} from '../components/common/shared';
import {imagePath} from '../utils/imagePath';
import {colors} from '../components/common/colors';
import {NavigationData} from '../navigation/AuthNavigator';

const WelcomeSection = styled.View`
  align-items: center;
`;

const BottomSection = styled.View`
  position: absolute;
  top: 75%;
`;

type Props = NavigationData<'Welcome'>;
export const WelcomeScreen: FC<Props> = ({navigation}) => {
  return (
    <WelcomeSection>
      <ImageBackground
        source={imagePath.welcome}
        style={{width: '100%', height: '100%'}}
      />
      <BottomSection>
        <RegularButton
          btnStyles={[
            ButtonTheme.whiteBGpurpleSD.btnStyle,
            {
              width: DimensionTheme.width(336),
              marginBottom: DimensionTheme.width(21),
            },
          ]}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          SIGN IN
        </RegularButton>
        <RegularButton
          btnStyles={[
            ButtonTheme.purpleBGSD.btnStyle,
            {width: DimensionTheme.width(336)},
          ]}
          textStyles={{color: colors.white}}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          SIGN UP
        </RegularButton>
      </BottomSection>
    </WelcomeSection>
  );
};
