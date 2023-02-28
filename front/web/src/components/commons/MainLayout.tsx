import React from 'react';
import styled from 'styled-components';
import WHcal from '../../utils/WHcal';

type MainLayoutProps  = {
  widthType?: string,
  children?: React.ReactNode,
};

const MainLayout = (props: MainLayoutProps) => {
  return <LayoutContainer widthType={props.widthType}>
    <div>PERSONA</div>
    <div>{props.children}</div>
  </LayoutContainer>
};

export default MainLayout;

interface LayoutProps{
  widthType?: string;
}

const LayoutContainer = styled.div<LayoutProps>`
  position: absolute;
  & > div:nth-child(1){
    position: relative;
    top: ${(props) => { return WHcal(props.widthType!, 53) }};
    left: ${(props) => { return WHcal(props.widthType!, 53) }};
    font-size: ${(props) => {return WHcal(props.widthType!, 67)}};
    font-weight: 900;    
  }
  & > div:nth-child(2){
    margin: ${(props) => {return WHcal(props.widthType!, 78)}} ${(props) => {return WHcal(props.widthType!, 53)}};
  }
`;