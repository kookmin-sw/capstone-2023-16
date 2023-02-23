import React, { FC } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";

import { colors } from "../components/colors";
import { Container, ScreenHeight, StatusBarHeight } from "../components/shared";

import KeyboardAvoidingViewContainer from "../components/Containers/KeyboardAvoidingViewContainer";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import RegularButton from "../components/Buttons/RegularButton";
import TextButton from "../components/Buttons/TextButton";
import CheckBox from "../components/Buttons/CheckBox";

const LoginContainer = styled(Container)`
  background-color: ${colors.white};
  width: 100%;
  padding-top: ${StatusBarHeight + 200}px;
  flex: 1;
  justify-content" space-between;
`;

const InputSection = styled.View`
  width: 100%;
  flex: 1;
  align-items: left;
`;

const BottomSection = styled.View`
  width: 100%;
  flex: 1;
  position: absolute;
  top: ${ScreenHeight * 0.45}px;
  justify-contnet: flex-end;
`;

const FindSection = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: center;
`;

const SignupSection = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: center;
`;

export const LoginScreen = () => {
  return (
    <LoginContainer>
      <StatusBar />
      <KeyboardAvoidingViewContainer>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={({ email, password }) => {
            alert(`email:${email} password:${password}`);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <InputSection>
                <StyledTextInput
                  labelStyle={{
                    color: `${colors.black}`,
                    marginBottom: 7,
                    fontWeight: "700",
                  }}
                  label="ID"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                />
                <StyledTextInput
                  labelStyle={{
                    color: `${colors.black}`,
                    marginBottom: 7,
                    fontWeight: "700",
                  }}
                  label="PASSWORD"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  isPassword={true}
                />
                <CheckBox
                  label="로그인 유지"
                  labelStyle={{ color: colors.black }}
                />
              </InputSection>
              <BottomSection>
                <FindSection>
                  <TextButton
                    textStyles={{ color: colors.black }}
                    onPress={() => {}}
                  >
                    아이디 찾기
                  </TextButton>
                  <Text> / </Text>
                  <TextButton
                    textStyles={{ color: colors.black }}
                    onPress={() => {}}
                  >
                    비밀번호 찾기
                  </TextButton>
                </FindSection>
                <SignupSection>
                  <Text>PERSONA가 처음이신가요?</Text>
                  <TextButton
                    textStyles={{ color: colors.black, marginLeft: 12 }}
                    onPress={() => {}}
                  >
                    회원가입
                  </TextButton>
                </SignupSection>
                <RegularButton
                  btnStyles={{ height: 55 }}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  SIGN IN
                </RegularButton>
              </BottomSection>
            </>
          )}
        </Formik>
      </KeyboardAvoidingViewContainer>
    </LoginContainer>
  );
};
