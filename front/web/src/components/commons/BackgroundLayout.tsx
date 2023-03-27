import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

const BackgroundLayout = ({children}: React.PropsWithChildren) => {
  const deviceType = useDeviceType();
  
  return<Background>
      <ColoredLayout> 
        <Layout deviceType={deviceType}>
          <div>PERSONA</div>
          <ContentLayout deviceType={deviceType}>
            {children}
          </ContentLayout>
        </Layout>
      </ColoredLayout>
    </Background>
};

export default BackgroundLayout;

const Background = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #FFFFFF;
`;

const ColoredLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: linear-gradient(116.37deg, rgba(211, 140, 255, 0.9) 0%, rgba(113, 242, 234, 0.729) 99.35%);  
  left: 0px;
  top: 0px;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Layout = styled.div<{ deviceType?: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  & > div:nth-child(1){
    align-self: start;
    margin: ${(props) => { return props.deviceType === 'desktop' ? '48px 0 35px 55px': props.deviceType === 'tablet'? '44px 0 35px 42px': '21px 0 25px 21px'}};
    font-size: ${(props) => {return props.deviceType==='mobile'? '24px' : '36px'}};
    font-weight: 900;
  }
`;

const ContentLayout = styled.section<{ deviceType?: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 ${props => props.deviceType === 'desktop' ? '83px' : props.deviceType === 'tablet' ? '58px' : '20px'};
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  & > div {
    background-color: #fefefe;
  }
`