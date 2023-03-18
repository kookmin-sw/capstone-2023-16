import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import WHcal from '../../utils/WHcal';

const TitleLayout = ({children}: React.PropsWithChildren) => {
  const deviceType = useDeviceType();
  
  return  <LayoutWrapper>
    <LayoutContainer widthType={deviceType}>
      <div>PERSONA</div>
      {children}
    </LayoutContainer>
  </LayoutWrapper>
};

export default TitleLayout;

const LayoutWrapper = styled.div`
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
`
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
    position: relative;
    margin: ${(props) => {return WHcal(props.widthType!, 78)}} ${(props) => {return WHcal(props.widthType!, 53)}};
  }
`;
