import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import AccountApiClient from '../../api/Account';
import { redirect } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const BackgroundLayout = ({ children }: React.PropsWithChildren) => {
  const deviceType = useDeviceType();
  const context = useAuth();

  const onClick = () => {
    const answer = window.confirm('로그아웃 하시겠습니까?');
    console.log(answer);
    if (answer) {
      AccountApiClient.logoutPost()
        .then((res: any) => {
          context.logout();
          redirect('/')
        })
    }
  }
  
  return<Background>
      <ColoredLayout> 
        <Layout deviceType={deviceType}>
        <Header deviceType={deviceType}>
          <span>POSTONA</span>
          {context.loginState && <span onClick={onClick}>로그아웃</span>}
        </Header>
          <ContentLayout id='content__box' deviceType={deviceType}>
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
`;

const Header = styled.section<{ deviceType: string }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: ${(props) => { return props.deviceType === 'desktop' ? '48px': props.deviceType === 'tablet'? '42px': '21px'}};
  font-size: ${(props) => {return props.deviceType==='mobile'? '24px' : '36px'}};
  font-weight: 900; 
  & span:nth-child(2){
    display: flex;
    margin: 0 ${(props) => { return props.deviceType === 'mobile' ? '10px' : '15px' }};
    padding: 2px ${(props) => { return props.deviceType === 'mobile' ? '2px' : '5px' }};
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    font-size: ${(props) => { return props.deviceType === 'mobile' ? '10px' : '18px' }};
    justify-content: center;
    align-items: center;
    &:hover{
      cursor: pointer;
  }
`

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