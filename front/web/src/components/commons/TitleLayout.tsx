import React from 'react';
import styled, { css } from 'styled-components';
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
  overflow-y: auto;
`
const LayoutContainer = styled.div<{ widthType?: string }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div:nth-child(1){
    align-self: start;
    margin: ${(props) => { return css`${WHcal(props.widthType!, 48)} 0 ${WHcal(props.widthType!, 35)} ${WHcal(props.widthType!, 55)}` }};
    font-size: ${(props) => {return WHcal(props.widthType!, 36)}};
    font-weight: 900;
  }
  & > div:nth-child(2){
    flex: 15;
    margin: auto ${(props) => {return WHcal(props.widthType!, 70)}};
  }
`;
