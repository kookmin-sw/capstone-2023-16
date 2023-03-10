import React, { FC } from "react";
import styled from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";

import { colors } from "../components/colors";
import { Container, ScreenHeight, StatusBarHeight } from "../components/shared";

import KeyboardAvoidingViewContainer from "../components/Containers/KeyboardAvoidingViewContainer";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import RegularButton from "../components/Buttons/RegularButton";
import TextButton from "../components/Buttons/TextButton";
import CheckBox from "../components/Buttons/CheckBox";
import SmallText from "../components/Texts/SmallText";

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
  align-items: center;
`;

const SignupSection = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
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
                  label="????????? ??????"
                  labelStyle={{ color: colors.black }}
                />
              </InputSection>
              <BottomSection>
                <FindSection>
                  <TextButton
                    textStyles={{ color: colors.black }}
                    onPress={() => {}}
                  >
                    ????????? ??????
                  </TextButton>
                  <SmallText textStyle={{ color: colors.black }}> / </SmallText>
                  <TextButton
                    textStyles={{ color: colors.black }}
                    onPress={() => {}}
                  >
                    ???????????? ??????
                  </TextButton>
                </FindSection>
                <SignupSection>
                  <SmallText textStyle={{ color: colors.black }}>
                    PERSONA??? ???????????????????
                  </SmallText>
                  <TextButton
                    textStyles={{ color: colors.black, marginLeft: 12 }}
                    onPress={() => {}}
                  >
                    ????????????
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
