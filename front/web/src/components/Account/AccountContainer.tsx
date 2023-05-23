import {PropsWithChildren} from 'react';
import styled, {css} from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import { GrayShadowBox } from '../commons/GrayShadowBox';

const AccountContainer = ({ children }: PropsWithChildren) => {
  const deviceType = useDeviceType();
  return <AccountContainerWrapper deviceType={deviceType}>
      <InnerContainer deviceType={deviceType} >{children}</InnerContainer>
  </AccountContainerWrapper>
};

export default AccountContainer;

const AccountContainerWrapper = styled.div<{ deviceType: string }>`
  ${(props) => { if (props.deviceType === 'mobile') return 'width: 100%'}};
  display: flex;
  background-color: transparent !important;
  flex-direction: column;
  justify-content: center;
  ${(props) => {
  return props.deviceType === 'desktop' ?
    css`
      align-self: end;
      align-items: end;
      padding-right: 5%;
    `:
    css`
      align-items: center;
    `
  }}
`

const InnerContainer = styled(GrayShadowBox) <{ deviceType: string }>`
  width: 100%;
  height: ${(props) => { return props.deviceType !== 'mobile'? '780px' : '100%'}};
  display: flex;
  padding: ${(props) => { return props.deviceType !== 'mobile' ? '79px' : '21px' }};
  padding-top: ${(props) => { return props.deviceType !== 'mobile' ? '55px' : '40px' }};
  background-color: #fefefe;
  border-radius: ${(props) => { return props.deviceType !== 'mobile' ? '50px' : '20px' }};;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  box-sizing: border-box;
`