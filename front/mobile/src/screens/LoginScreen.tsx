import React, {FC, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Alert} from 'react-native';

import {Formik} from 'formik';

import {colors} from '../components/common/colors';
import {
  Container,
  DimensionTheme,
  ScreenHeight,
} from '../components/common/shared';
import * as ButtonTheme from '../components/common/theme';

import KeyboardAvoidingViewContainer from '../components/common/Containers/KeyboardAvoidingViewContainer';
import StyledTextInput from '../components/common/Inputs/StyledTextInput';
import RegularButton from '../components/common/Buttons/RegularButton';
import TextButton from '../components/common/Buttons/TextButton';
import CheckBox from '../components/common/CheckBox/CheckBox';
import SmallText from '../components/common/Texts/SmallText';

import {NavigationData} from '../navigation/AuthNavigator';

//@ts-ignore
import {graphql} from 'babel-plugin-relay/macro';
import {LoginScreenMutation} from './__generated__/LoginScreenMutation.graphql';

import {useAppDispatch} from '../redux/hooks';
// import { useMutation } from 'react-relay';
import {commitMutation, useLazyLoadQuery, useMutation} from 'react-relay';
// import {LoginScreenMutation} from './__generated__/LoginScreenMutation.graphql';
import {login} from '../redux/slices/userSlice';

import {CookieSetting} from '../graphQL/CookieSetting/CookieSetting';
// import {GetPersonaQuery} from '../graphQL/CookieSetting/__generated__/GetPersonaQuery.graphql';
import getOwnPersonasQuery from '../graphQL/CookieSetting/GetPersona';
import LoginEnvironment from '../LoginEnvironment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginContainer = styled(Container)`
  width: 100%;
  flex: 1;
`;

const FormikSection = styled.View`
  margin-top: ${ScreenHeight * 0.3}px;
`;

const InputSection = styled.View`
  width: 100%;
  flex: 1;

  min-height: ${ScreenHeight * 0.7}px;
  align-items: flex-start;
`;

const BottomSection = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  position: absolute;
  top: ${ScreenHeight * 0.4}px;
  align-items: center;
`;

const FindSection = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const SignupSection = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const loginMutation = graphql`
  mutation LoginScreenMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on User {
        id
        username
        email
      }
      ... on AnonymousOnlyError {
        message
      }
      ... on WrongCertInfoError {
        message
      }
    }
  }
`;

type Props = NavigationData<'Login'>;

export const LoginScreen: FC<Props> = ({navigation}) => {
  const [autoLogin, setAutoLogin] = useState(false);

  const dispatch = useAppDispatch();

  const [commit, isInFlight] = useMutation<LoginScreenMutation>(loginMutation);

  AsyncStorage.removeItem('persona_id');

  return (
    <LoginContainer>
      <KeyboardAvoidingViewContainer>
        <Formik
          initialValues={{username: '', password: ''}}
          onSubmit={({username, password}) => {
            console.log(username, password);
            commit({
              variables: {
                username,
                password,
              },
              onCompleted(data) {
                console.log('@login success');
                console.log(data.login);
                dispatch(login(data.login));
                console.log(`data ? : ${JSON.stringify(data)}`);
              },
              onError(error) {
                console.log('@login error:');
                console.log(error);
                console.log(error.message);
                Alert.alert('존재하지 않는 계정입니다.');
              },
              async updater() {},
            });
          }}>
          {({values, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
            <FormikSection>
              <InputSection>
                <StyledTextInput
                  labelStyle={{
                    color: colors.black,
                    marginBottom: 7,
                    fontWeight: '700',
                  }}
                  label="아이디"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  keyboardType="email-address"
                />
                <StyledTextInput
                  labelStyle={{
                    color: colors.black,
                    marginBottom: 7,
                    fontWeight: '700',
                  }}
                  label="비밀번호"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  isPassword={true}
                />
                <CheckBox
                  onPress={() => setAutoLogin(!autoLogin)}
                  isChecked={autoLogin}
                  label="로그인 유지"
                  labelStyle={{color: colors.black}}
                />
              </InputSection>
              <BottomSection>
                <FindSection>
                  <TextButton
                    textStyles={{color: colors.black}}
                    onPress={() => {
                      navigation.navigate('Main');
                    }}>
                    아이디 찾기
                  </TextButton>
                  <SmallText textStyle={{color: colors.black}}> / </SmallText>
                  <TextButton
                    textStyles={{color: colors.black}}
                    onPress={() => {
                      navigation.navigate('TestSetting');
                    }}>
                    비밀번호 찾기
                  </TextButton>
                </FindSection>
                <SignupSection>
                  <SmallText textStyle={{color: colors.black}}>
                    PERSONA가 처음이신가요?
                  </SmallText>
                  <TextButton
                    textStyles={{color: colors.black, marginLeft: 12}}
                    onPress={() => {
                      navigation.navigate('Signup');
                    }}>
                    회원가입
                  </TextButton>
                </SignupSection>
                <RegularButton
                  btnStyles={[
                    ButtonTheme.whiteBGpurpleSD.btnStyle,
                    {
                      height: 55,
                    },
                  ]}
                  textStyles={[
                    ButtonTheme.whiteBGpurpleSD.textStyle,
                    {fontSize: DimensionTheme.fontSize(24), fontWeight: '700'},
                  ]}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  SIGN IN
                </RegularButton>
              </BottomSection>
            </FormikSection>
          )}
        </Formik>
      </KeyboardAvoidingViewContainer>
    </LoginContainer>
  );
};
