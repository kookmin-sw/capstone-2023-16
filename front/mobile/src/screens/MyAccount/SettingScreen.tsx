import React, {FC} from 'react';
import {StyleProp, TextStyle} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';
import TextButton from '../../components/common/Buttons/TextButton';
import {colors} from '../../components/common/colors';

import {Container, DimensionTheme} from '../../components/common/shared';
import RegularText from '../../components/common/Texts/RegularText';
import * as ButtonTheme from '../../components/common/theme';
import {NavigationData} from '../../navigation/AuthNavigator';

import {graphql} from 'babel-plugin-relay/macro';
import {useMutation} from 'react-relay';

import {useAppDispatch} from '../../redux/hooks';
import {setUser, setIsLoggedIn} from '../../redux/slices/userSlice';

const SettingContainer = styled(Container)``;

const AccountSection = styled.View`
  width: ${DimensionTheme.width(348)};
  height: ${DimensionTheme.height(391)};
  border-radius: 20px;
  align-items: center;
  padding: 18px;
`;

const HorizontalLine = styled.View`
  height: 1px;
  width: ${DimensionTheme.width(310)}
  background-color: ${colors.borderGray};
  margin-top: ${DimensionTheme.height(15)};
  margin-bottom: ${DimensionTheme.height(15)};
`;

const ServiceSection = styled.View``;

const textStyle: StyleProp<TextStyle> = {
  color: colors.black,
  fontWeight: '500',
  fontSize: DimensionTheme.fontSize(16),
};

const logoutMutation = graphql`
  mutation SettingScreenMutation {
    logout
  }
`;

type Props = NavigationData<'Setting'>;
export const SettingScreen: FC<Props> = ({navigation}) => {
  const [commit, isInFlight] = useMutation(logoutMutation);

  const dispatch = useAppDispatch();

  return (
    <SettingContainer>
      <RegularText textStyle={{textAlign: 'left'}}>ACCOUNT</RegularText>
      <AccountSection style={[ButtonTheme.whiteBGpurpleSD.btnStyle]}>
        <TextButton textStyles={textStyle} onPress={() => {}}>
          페르소나 수정
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          페르소나 삭제
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          공식 인증 페르소나 요청
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          본계정 보기
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          본계정 수정
        </TextButton>
        <HorizontalLine />
        <TextButton
          textStyles={textStyle}
          onPress={() => {
            commit({
              variables: {},
              onCompleted(data) {
                console.log('logout!!');
                console.log(data);
                dispatch(setIsLoggedIn(false));
              },
              onError(error) {
                console.log('@logout error:');
                console.log(error);
                console.log(error.message);
              },
              // updater(store) {
              //   const payload = store.getRootField('login');
              //   store.getRoot().setLinkedRecord(payload, 'currentUser');
              // },
            });
          }}>
          본계정 로그아웃
        </TextButton>
        <HorizontalLine />
        <TextButton textStyles={textStyle} onPress={() => {}}>
          본계정 탈퇴
        </TextButton>
      </AccountSection>
      <ServiceSection></ServiceSection>
    </SettingContainer>
  );
};
