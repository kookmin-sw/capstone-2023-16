import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import WHcal from '../../utils/WHcal';

const MainLayout = ({children}: React.PropsWithChildren) => {
  const deviceType = useDeviceType();
  
  return <LayoutContainer widthType={deviceType}>
    <div>PERSONA</div>
    <div>{children}</div>
  </LayoutContainer>
};

export default MainLayout;

const LayoutContainer = styled.div<{ widthType?: string }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  & > div:nth-child(1){
    position: relative;
    top: ${(props) => { return WHcal(props.widthType!, 53) }};
    left: ${(props) => { return WHcal(props.widthType!, 53) }};
    font-size: ${(props) => {return WHcal(props.widthType!, 36)}};
    font-weight: 900;
  }
  & > div:nth-child(2){
    width: auto;
    margin: ${(props) => {return WHcal(props.widthType!, 78)}} ${(props) => {return WHcal(props.widthType!, 53)}};
  }
`;
