import React, { FC } from "react";
import styled from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";

import { colors } from "../components/common/colors";
import {
  Container,
  ScreenHeight,
  StatusBarHeight,
} from "../components/common/shared";
import * as ButtonTheme from "../components/common/Buttons/theme";

import KeyboardAvoidingViewContainer from "../components/common/Containers/KeyboardAvoidingViewContainer";
import StyledTextInput from "../components/common/Inputs/StyledTextInput";
import RegularButton from "../components/common/Buttons/RegularButton";
import TextButton from "../components/common/Buttons/TextButton";
import CheckBox from "../components/common/Buttons/CheckBox";
import SmallText from "../components/common/Texts/SmallText";

import { NavigationData } from "../navigation/AuthNavigator";

const LoginContainer = styled(Container)`
  background-color: ${colors.white};
  width: 100%;
  padding-top: ${StatusBarHeight + 200}px;
  flex: 1;
  justify-content: space-between;
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

type Props = NavigationData<"Login">;

export const LoginScreen: FC<Props> = ({ navigation }) => {
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
                    color: colors.black,
                    marginBottom: 7,
                    fontWeight: "700",
                  }}
                  label="아이디"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                />
                <StyledTextInput
                  labelStyle={{
                    color: colors.black,
                    marginBottom: 7,
                    fontWeight: "700",
                  }}
                  label="비밀번호"
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
                  <SmallText textStyle={{ color: colors.black }}> / </SmallText>
                  <TextButton
                    textStyles={{ color: colors.black }}
                    onPress={() => {}}
                  >
                    비밀번호 찾기
                  </TextButton>
                </FindSection>
                <SignupSection>
                  <SmallText textStyle={{ color: colors.black }}>
                    PERSONA가 처음이신가요?
                  </SmallText>
                  <TextButton
                    textStyles={{ color: colors.black, marginLeft: 12 }}
                    onPress={() => {
                      navigation.navigate("Signup");
                    }}
                  >
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
                  textStyles={ButtonTheme.whiteBGpurpleSD.textStyle}
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
