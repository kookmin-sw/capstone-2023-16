import {PropsWithChildren} from 'react';
import styled, {css} from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import WHcal from '../../utils/WHcal';
import { GrayShadowBox } from '../commons/GrayShadowBox';

const LoginContainer = ({ children }: PropsWithChildren) => {
  const deviceType = useDeviceType();
  return <LoginContainerWrapper widthType={deviceType}>
    <InnerContainer widthType={deviceType} >{children}</InnerContainer>
  </LoginContainerWrapper>
};

export default LoginContainer;

const LoginContainerWrapper = styled.div<{ widthType: string }>`
  display: flex;
  flex-direction: column;
  ${(props) => {
  return props.widthType === 'big' ?
    css`
      align-items: end;
      padding-right: ${WHcal(props.widthType!, 100)};
    `:
    css`
      align-items: center;
    `
  }}
`

const InnerContainer = styled(GrayShadowBox) <{ widthType: string }>`
  width: ${(props) => { return props.widthType !== 'min'? WHcal(props.widthType!, 400) : '60%'}};
  height: auto;
  display: flex;
  padding: ${(props) => { return WHcal(props.widthType!, 65) }} ${(props) => { return WHcal(props.widthType!, 71) }};
  border-radius: ${(props) => { return WHcal(props.widthType!, 50); }};
  flex-direction: column;
  align-items: start;
`