import {PropsWithChildren} from 'react';
import styled, {css} from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import { GrayShadowBox } from '../commons/GrayShadowBox';

const LoginContainer = ({ children }: PropsWithChildren) => {
  const deviceType = useDeviceType();
  return <LoginContainerWrapper deviceType={deviceType}>
    <InnerContainer deviceType={deviceType} >{children}</InnerContainer>
  </LoginContainerWrapper>
};

export default LoginContainer;

const LoginContainerWrapper = styled.div<{ deviceType: string }>`
  display: flex;
  background-color: transparent !important;
  flex-direction: column;
  justify-content: center;
  ${(props) => {
  return props.deviceType === 'desktop' ?
    css`
      align-items: end;
      padding-right: 10%;
    `:
    css`
      align-items: center;
    `
  }}
`

const InnerContainer = styled(GrayShadowBox) <{ deviceType: string }>`
  width: auto;
  height: ${(props) => { return props.deviceType !== 'mobile'? '780px' : '60%'}};
  display: flex;
  padding: ${(props) => { return props.deviceType !== 'mobile' ? '79px' : '21px' }};
  padding-top: ${(props) => { return props.deviceType !== 'mobile' ? '116px' : '40px' }};
  background-color: #fefefe;
  border-radius: 50px;
  flex-direction: column;
  align-items: start;
  box-sizing: border-box;
`