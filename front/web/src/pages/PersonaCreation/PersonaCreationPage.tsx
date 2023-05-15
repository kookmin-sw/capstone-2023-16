import React from 'react';
import ContentLayout from '../../components/commons/ContentLayout';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import { Outlet } from 'react-router-dom';

const PersonaCreationPage = () => {
  const deviceType = useDeviceType();
  return <ContentLayout>
    <Header deviceType={deviceType} >페르소나 생성</Header>
    <Outlet />
  </ContentLayout>
}

export default PersonaCreationPage;


const Header = styled.h2<{ deviceType: string }>`
    align-self: start;
    font-size: ${(props) => (props.deviceType === 'desktop') ? '32px' : (props.deviceType === 'tablet') ? '28px': '24px'};
    font-weight: 700;
    margin:  ${(props) => (props.deviceType === 'mobile') ? '16px 0' : '30px 0'};
`;

