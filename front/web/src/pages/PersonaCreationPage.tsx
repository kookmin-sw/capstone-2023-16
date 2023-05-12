import React from 'react';
import ContentLayout from '../components/commons/ContentLayout';
import PersonaCreationContainer from '../containers/PersonaCreation/PersonaCreationContainer';
import styled from 'styled-components';
import useDeviceType from '../hooks/useDeviceType';

const PersonaCreationPage = () => {
  const deviceType = useDeviceType();
  return <ContentLayout>
    <Header deviceType={deviceType} >페르소나 생성</Header>
    <PersonaCreationContainer />
  </ContentLayout>
}

export default PersonaCreationPage;


const Header = styled.h2<{ deviceType: string }>`
    align-self: start;
    font-size: ${(props) => (props.deviceType === 'desktop') ? '32px' : (props.deviceType === 'tablet') ? '28px': '16px'};
    font-weight: 700;
    margin-bottom: 30px;
`;