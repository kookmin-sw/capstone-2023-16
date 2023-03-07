import React, { FC, useState } from "react";
import styled from "styled-components/native";

import { Formik } from "formik";
import * as Yup from "yup";

import RegularButton from "../components/common/Buttons/RegularButton";
import SmallButton from "../components/common/Buttons/SmallButton";
import { colors } from "../components/common/colors";
import * as ButtonTheme from "../components/common/Buttons/theme";
import KeyboardAvoidingViewContainer from "../components/common/Containers/KeyboardAvoidingViewContainer";
import StyledTextInput from "../components/common/Inputs/StyledTextInput";
import {
  Container,
  ScreenHeight,
  ScreenWidth,
  StatusBarHeight,
} from "../components/common/shared";

import { NavigationData } from "../navigation/AuthNavigator";
import CheckBox from "../components/common/Buttons/CheckBox";
import SmallText from "../components/common/Texts/SmallText";
import Modal from "../components/common/Modal/Modal";
import { ScrollView, View } from "react-native";
import RegularText from "../components/common/Texts/RegularText";
import { termsAndConditions } from "../constants/terms";

const SignupContainer = styled(Container)`
  background-color: ${colors.white};
  width: 100%;
  padding-top: ${StatusBarHeight + 30}px;
  flex: 1;
  justify-content: space-between;
`;

const InputSection = styled.View`
  width: 100%;
  flex: 1;
  align-items: left;
`;

const IdSection = styled.View`
  flex-direction: row;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const PasswordSection = styled.View``;

const ExtraInfoSection = styled.View`
  margin-top: 10px;
`;

const GenderInfoSection = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const RadioButtonSection = styled.View`
  flex-direction: row;
  margin-left: 50px;
`;

const TermsSection = styled.View`
  margin-top: 20px;
`;

const ModalContentSection = styled.View``;

const BottomSection = styled.View`
  width: 100%;
  flex: 1;
  position: absolute;
  top: ${ScreenHeight * 0.65}px;
  justify-contnet: flex-end;
`;

type Props = NavigationData<"Signup">;

const SignupScreen: FC<Props> = () => {
  // 이용약관 모달
  const [show, setShow] = useState(false);

  // 이용약관 동의
  const [agree, setAgree] = useState(false);

  // 성별
  const [isMale, setIsMale] = useState(true);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("유효하지 않은 이메일입니다.")
      .required("이메일 정보는 필수입니다."),
    password: Yup.string()
      .required("비밀번호 정보는 필수입니다.")
      .min(8, "비밀번호는 8자 이상입니다."),
    passwordConfirm: Yup.string()
      .required("비밀번호 확인은 필수입니다.")
      .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다"),
  });

  return (
    <SignupContainer>
      <KeyboardAvoidingViewContainer>
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={({ email, password }) => {
            alert(`email:${email} password:${password}`);
          }}
        >
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
                    viewStyle={{
                      width: ScreenWidth - 120,
                      minWidth: ScreenWidth - 120,
                    }}
                    labelStyle={{
                      color: colors.black,
                      marginBottom: 7,
                      fontWeight: "700",
                    }}
                    label="아이디"
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                  />
                  <SmallButton
                    btnStyles={{
                      padding: 5,
                      marginTop: errors.email ? -20 : 10,
                      backgroundColor: values.email
                        ? colors.primary
                        : colors.gray,
                    }}
                    textStyles={{ color: colors.white, fontWeight: "700" }}
                    onPress={() => {}}
                  >
                    중복확인
                  </SmallButton>
                </IdSection>
                <PasswordSection>
                  <StyledTextInput
                    labelStyle={{
                      color: colors.black,
                      marginBottom: 7,
                      fontWeight: "700",
                    }}
                    label="비밀번호"
                    value={values.password}
                    error={errors.password}
                    touched={touched.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    isPassword={true}
                  />
                  <StyledTextInput
                    labelStyle={{
                      color: colors.black,
                      marginBottom: 7,
                      fontWeight: "700",
                    }}
                    label="비밀번호 확인"
                    value={values.passwordConfirm}
                    error={errors.passwordConfirm}
                    touched={touched.passwordConfirm}
                    onChangeText={handleChange("passwordConfirm")}
                    onBlur={handleBlur("passwordConfirm")}
                    isPassword={true}
                  />
                </PasswordSection>
                <ExtraInfoSection>
                  <StyledTextInput
                    labelStyle={{
                      color: colors.black,
                      marginBottom: 7,
                      fontWeight: "700",
                    }}
                    label="생년월일"
                  />
                  <GenderInfoSection>
                    <SmallText
                      textStyle={{
                        color: colors.black,
                        marginBottom: 7,
                        fontWeight: "700",
                      }}
                    >
                      성별
                    </SmallText>
                    <RadioButtonSection>
                      <CheckBox
                        onPress={() => setIsMale(true)}
                        isChecked={isMale}
                        labelStyle={{ marginRight: 30 }}
                        label={"남"}
                      />
                      <CheckBox
                        onPress={() => setIsMale(false)}
                        isChecked={isMale ? false : true}
                        label={"여"}
                      />
                    </RadioButtonSection>
                  </GenderInfoSection>
                  <TermsSection>
                    <RegularButton
                      btnStyles={{
                        alignItems: "flex-start",
                        shadowColor: colors.black,
                        shadowOpacity: 0.1,
                      }}
                      onPress={() => {
                        setShow(true);
                      }}
                    >
                      <CheckBox
                        onPress={() => setAgree(!agree)}
                        isChecked={agree}
                        labelStyle={{
                          color: colors.black,
                          fontWeight: "700",
                          marginLeft: 10,
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
                    handleSubmit();
                  }}
                >
                  다음
                </RegularButton>
              </BottomSection>
            </>
          )}
        </Formik>
      </KeyboardAvoidingViewContainer>
      <Modal show={show}>
        <View>
          <RegularText textStyle={{ marginBottom: 20 }}>이용약관</RegularText>
          <ScrollView>
            <SmallText>{termsAndConditions}</SmallText>
          </ScrollView>
          <RegularButton
            btnStyles={[
              ButtonTheme.purpleBG.btnStyle,
              {
                width: 250,
                marginLeft: 10,
                marginTop: 10,
              },
            ]}
            textStyles={ButtonTheme.purpleBG.textStyle}
            onPress={() => {
              setShow(false);
            }}
          >
            확인
          </RegularButton>
        </View>
      </Modal>
    </SignupContainer>
  );
};

export default SignupScreen;
