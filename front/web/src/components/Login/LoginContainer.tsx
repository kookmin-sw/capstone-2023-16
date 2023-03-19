import {PropsWithChildren} from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import WHcal from '../../utils/WHcal';
import { GrayShadowBox } from '../commons/GrayShadowBox';

const LoginContainer = ({ children }: PropsWithChildren) => {
  const deviceType = useDeviceType();
  return <ContainerWrapper widthType={deviceType} >{children}</ContainerWrapper>
};

export default LoginContainer;

interface ContainerWrapperProps {
  widthType: string,
}
  
const ContainerWrapper = styled(GrayShadowBox) <ContainerWrapperProps>`
  width: ${(props) => {  return props.widthType === 'big' ? WHcal(props.widthType!, 400) : '60%' ;}};
  height: auto;
  min-width: 200px;
  display: flex;
  margin-bottom: ${(props) => { return WHcal(props.widthType!, 71) }} !important;
  padding: ${(props) => { return WHcal(props.widthType!, 65) }} ${(props) => { return WHcal(props.widthType!, 71) }};
  border-radius: ${(props) => { return WHcal(props.widthType!, 50); }};
  flex-direction: column;
  align-self: ${(props) => { return props.widthType !== 'big' ? 'center' : 'end'; }};
  align-items: start;
`