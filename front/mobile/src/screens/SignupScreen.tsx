import React, { FC } from "react";
import styled from "styled-components/native";

import { colors } from "../components/colors";
import { Container } from "../components/shared";

import { NavigationData } from "../navigation/AuthNavigator";

const LoginContainer = styled(Container)`
  background-color: ${colors.white};
  width: 100%;
  flex: 1;
  justify-content" space-between;
`;

type Props = NavigationData<"Signup">;

const SignupScreen: FC<Props> = () => {
  return <LoginContainer></LoginContainer>;
};

export default SignupScreen;
