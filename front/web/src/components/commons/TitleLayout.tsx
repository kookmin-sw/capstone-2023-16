import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

const TitleLayout = ({children}: React.PropsWithChildren) => {
  const deviceType = useDeviceType();
  
  return<LayoutBackground>
      <LayoutWrapper> 
        <LayoutContainer deviceType={deviceType}>
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
`;

const LayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(116.37deg, rgba(211, 140, 255, 0.9) 0%, rgba(113, 242, 234, 0.729) 99.35%);  
  left: 0px;
  top: 0px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const LayoutContainer = styled.div<{ deviceType?: string }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div:nth-child(1){
    align-self: start;
    margin: ${(props) => { return props.deviceType === 'desktop' ? '48px 0 35px 55px': props.deviceType === 'tablet'? '44px 0 35px 42px': '21px 0 25px 21px'}};
    font-size: ${(props) => {return props.deviceType==='mobile'? '24px' : '36px'}};
    font-weight: 900;
  }
  & > div:nth-child(2){
    flex: 15;
    width: 100%;
    background-color: #fefefe;
  }
`;
