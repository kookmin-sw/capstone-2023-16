import React, {FC, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {ScrollView, View, Alert} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';

import RegularButton from '../components/common/Buttons/RegularButton';
import {colors} from '../components/common/colors';
import * as ButtonTheme from '../components/common/theme';
import KeyboardAvoidingViewContainer from '../components/common/Containers/KeyboardAvoidingViewContainer';
import StyledTextInput from '../components/common/Inputs/StyledTextInput';
import CheckBox from '../components/common/CheckBox/CheckBox';
import SmallText from '../components/common/Texts/SmallText';
import Modal from '../components/common/Modal/Modal';
import RegularText from '../components/common/Texts/RegularText';
import {termsAndConditions} from '../constants/terms';
import {
  Container,
  DimensionTheme,
  ScreenHeight,
} from '../components/common/shared';

import {NavigationData} from '../navigation/AuthNavigator';

// @ts-ignore
import {graphql} from 'babel-plugin-relay/macro';

import {useMutation} from 'react-relay';
import {SignupScreenMutation} from './__generated__/SignupScreenMutation.graphql';
import {Error} from '../relay/type';

import {graphql} from 'babel-plugin-relay/macro';
import {useMutation} from 'react-relay';
import {SignupScreenMutation} from './__generated__/SignupScreenMutation.graphql';

const SignupContainer = styled(Container)`
  width: 100%;
  padding-top: 10px;
  flex: 1;
  justify-content: space-between;
`;

const InputSection = styled.ScrollView``;

const IdSection = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const PasswordSection = styled.View``;

const ExtraInfoSection = styled.View`
  margin-top: 10px;
`;

const TermsSection = styled.View`
  margin-top: 20px;
  height: 60px;
`;

const BottomSection = styled.View`
  width: 100%;
  flex: 1;
  position: absolute;
  margin-top: 20px;
  top: ${ScreenHeight * 0.71}px;
  justify-contnet: flex-end;
`;

// const signupMutation = graphql`
//   mutation SignupScreenMutation(
//     $email: String!
//     $password: String!
//     $username: String!
//   ) {
//     register(email: $email, password: $password, username: $username) {
//       ... on User {
//         id
//         email
//         username
//       }

//       ... on UsernameAlreadyUsedError {
//         violatedFieldName
//         violatedFieldValue
//       }
//       ... on EmailAlreadyUsedError {
//         violatedFieldValue
//         violatedFieldName
//       }
//     }
//   }
// `;

type Props = NavigationData<'Signup'>;

export const SignupScreen: FC<Props> = ({navigation}) => {
  // const [commit, isInFlight] =
  //   useMutation<SignupScreenMutation>(signupMutation);
  // 이용약관 모달
  const [show, setShow] = useState(false);

  // 이용약관 동의
  const [agree, setAgree] = useState(false);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('유효하지 않은 이메일입니다.')
      .required('이메일 정보는 필수입니다.'),
    password: Yup.string()
      .required('비밀번호 정보는 필수입니다.')
      .min(8, '비밀번호는 8자 이상입니다.'),
    passwordConfirm: Yup.string()
      .required('비밀번호 확인은 필수입니다.')
      .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다'),
    username: Yup.string().required('사용자 이름은 필수입니다.'),
  });

  return (
    <SignupContainer>
      <KeyboardAvoidingViewContainer>
        <Formik
          initialValues={{
            email: '',
            password: '',
            passwordConfirm: '',
            username: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={({email, username, password}) => {
            commit({
              variables: {
                email,
                username,
                password,
              },
              onCompleted(data) {
                console.log(data);
                Alert.alert('회원가입 성공!');
                navigation.navigate('Login');
              },
              onError(error) {
                console.log('@sign up error : ');
                error.source.errors[0].extensions.__typename ===
                Error.EmailAlreadyUsedError
                  ? Alert.alert(`${email} 은(는) 이미 사용중인 이메일입니다.`)
                  : Alert.alert(
                      `${username} 은(는)이미 사용중인 아이디입니다.`,
                    );
              },
            });
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <InputSection>
                <IdSection>
                  <StyledTextInput
                    labelStyle={{
                      color: colors.black,
                      marginBottom: 7,
                      fontWeight: '700',
                    }}
                    label="아이디"
                    value={values.username}
                    error={errors.username}
                    touched={touched.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                  />
                </IdSection>
                <PasswordSection>
                  <StyledTextInput
                    labelStyle={{
                      color: colors.black,
                      marginBottom: 7,
                      fontWeight: '700',
                    }}
                    label="비밀번호"
                    value={values.password}
                    error={errors.password}
                    touched={touched.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    isPassword={true}
                  />
                  <StyledTextInput
                    labelStyle={{
                      color: colors.black,
                      marginBottom: 7,
                      fontWeight: '700',
                    }}
                    label="비밀번호 확인"
                    value={values.passwordConfirm}
                    error={errors.passwordConfirm}
                    touched={touched.passwordConfirm}
                    onChangeText={handleChange('passwordConfirm')}
                    onBlur={handleBlur('passwordConfirm')}
                    isPassword={true}
                  />
                </PasswordSection>
                <ExtraInfoSection>
                  <StyledTextInput
                    labelStyle={{
                      color: colors.black,
                      marginBottom: 7,
                      fontWeight: '700',
                    }}
                    label="이메일"
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                  />
                  <TermsSection>
                    <RegularButton
                      btnStyles={[
                        ButtonTheme.whiteBGblackSD.btnStyle,
                        {
                          alignItems: 'flex-start',
                        },
                      ]}
                      onPress={() => {
                        setShow(true);
                      }}>
                      <CheckBox
                        onPress={() => setAgree(!agree)}
                        isChecked={agree}
                        viewStyle={{
                          marginTop: DimensionTheme.height(13),
                          marginLeft: DimensionTheme.width(10),
                        }}
                        labelStyle={{
                          color: colors.black,
                          fontWeight: '700',
                        }}
                        label="이용약관"
                      />
                    </RegularButton>
                  </TermsSection>
                </ExtraInfoSection>
              </InputSection>
              <BottomSection>
                <RegularButton
                  btnStyles={ButtonTheme.whiteBG.btnStyle}
                  onPress={() => {
                    if (agree) {
                      handleSubmit();
                    } else {
                      Alert.alert('약관 동의를 해주세요!');
                    }
                  }}>
                  다음
                </RegularButton>
              </BottomSection>
            </>
          )}
        </Formik>
      </KeyboardAvoidingViewContainer>
      <Modal show={show}>
        <View style={{alignItems: 'center'}}>
          <RegularText textStyle={{marginBottom: 20}}>이용약관</RegularText>
          <ScrollView style={{flexGrow: 1}}>
            <SmallText textStyle={{textAlign: 'justify'}}>
              {termsAndConditions}
            </SmallText>
          </ScrollView>
          <RegularButton
            btnStyles={[
              ButtonTheme.purpleBG.btnStyle,
              {
                width: 250,
                marginTop: 10,
              },
            ]}
            textStyles={ButtonTheme.purpleBG.textStyle}
            onPress={() => {
              setShow(false);
            }}>
            확인
          </RegularButton>
        </View>
      </Modal>
    </SignupContainer>
  );
};
