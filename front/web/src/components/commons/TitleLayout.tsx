import React from 'react';
import styled, { css } from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import WHcal from '../../utils/WHcal';

const TitleLayout = ({children}: React.PropsWithChildren) => {
  const deviceType = useDeviceType();
  
  return<LayoutBackground>
      <LayoutWrapper> 
        <LayoutContainer widthType={deviceType}>
          <div>PERSONA</div>
          {children}
        </LayoutContainer>
      </LayoutWrapper>
    </LayoutBackground>
};

export default TitleLayout;


const LayoutBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #FFFFFF;
`

const LayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(116.37deg, rgba(211, 140, 255, 0.9) 0%, rgba(113, 242, 234, 0.729) 99.35%);  
  left: 0px;
  top: 0px;
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
    width: 100%;
    background-color: #fefefe;
  }
`;
