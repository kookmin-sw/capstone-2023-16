import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import WHcal from '../../utils/WHcal';
import { GrayShadowBox } from '../commons/GrayShadowBox';

type ContainerLayoutProps = {
  children: React.ReactNode,
};

const ContainerLayout = ({ children }: ContainerLayoutProps) => {
  const deviceType = useDeviceType();
  return <ContainerWrapper widthType={deviceType} >{children}</ContainerWrapper>
};

export default ContainerLayout;

interface ContainerWrapperProps {
  widthType: string,
}
  
const ContainerWrapper = styled(GrayShadowBox) <ContainerWrapperProps>`
  height: auto;
  display: flex;
  width: ${(props) => { return props.widthType==='min' ?  '50%' : WHcal(props.widthType!, 400) }};
  position: absolute;
  padding: ${(props) => { return WHcal(props.widthType!, 65) }} ${(props) => { return WHcal(props.widthType!, 71) }};
  border-radius: ${(props) => { return WHcal(props.widthType!, 50); }};
  top: 40%;
  left: 50%;
  transform: ${(props)=> props.widthType !== 'big'? 'translate(-60%, -50%)': 'translate(10%, -50%)'};
  flex-direction: column;
  align-items: start;
`