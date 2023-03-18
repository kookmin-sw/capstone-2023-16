import React from 'react';
import styled, {css} from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import WHcal from '../../utils/WHcal';
import { GrayShadowBox } from './GrayShadowBox';

type ContainerLayoutProps = {
  alignDirection?: string,
  children: React.ReactNode,
};

const ContainerLayout = ({ alignDirection = 'center', children }: ContainerLayoutProps) => {
  const deviceType = useDeviceType();
  return <ContainerWrapper widthType={deviceType} alignDirection={alignDirection}>{children}</ContainerWrapper>
};

export default ContainerLayout;

interface ContainerWrapperProps {
  widthType: string,
  alignDirection: string,
}
  
const ContainerWrapper = styled(GrayShadowBox) <ContainerWrapperProps>`
  height: auto;
  display: flex;
  width: ${(props) => { return props.alignDirection === 'right' ? WHcal(props.widthType!, 400) : '50%' }};
  position: absolute;
  padding: ${(props) => { return WHcal(props.widthType!, 65) }} ${(props) => { return WHcal(props.widthType!, 71) }};
  border-radius: ${(props) => {
    return props.alignDirection === 'right' ?
    WHcal(props.widthType!, 50) :
      css`${WHcal(props.widthType!, 50)} ${WHcal(props.widthType!, 50)} 0 0`
  }};
  top: 40%;
  left: 50%;
  transform: ${(props)=> props.widthType !== 'big' || props.alignDirection==='center'? 'translate(-60%, -50%)': 'translate(10%, -50%)'};
  flex-direction: column;
  align-items: start;
`