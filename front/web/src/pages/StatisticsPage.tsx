import React from 'react';
import ContentLayout from '../components/commons/ContentLayout';
import styled from 'styled-components';
import useDeviceType from '../hooks/useDeviceType';
import StatisticsGroup from '../components/Statistics/StaticsGroup';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const StatisticsPage = () => {
  const deviceType = useDeviceType();
  const { persona } = useSelector((state: RootState) => state.auth);
  let location = useLocation();

  return <ContentLayout>
    <Header deviceType={deviceType}>통계</Header>
    <StatisticsGroup id={persona.id||location.state.id} />
  </ContentLayout>
};

export default StatisticsPage;

const Header = styled.h2<{deviceType:string}>`
  width: 100%;
  height: auto;
  display: flex;
  font-size: ${(props) => (props.deviceType === 'desktop') ? '32px' : (props.deviceType === 'tablet') ? '28px': '16px'};
  font-weight: 700;
`