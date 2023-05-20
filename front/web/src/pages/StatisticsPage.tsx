import React from 'react';
import ContentLayout from '../components/commons/ContentLayout';
import styled from 'styled-components';
import useDeviceType from '../hooks/useDeviceType';
import StatisticsGroup from '../components/Statistics/StaticsGroup';

const StatisticsPage = () => {
  const deviceType = useDeviceType();

  return <ContentLayout>
    <Header deviceType={deviceType}>통계</Header>
    <StatisticsGroup />
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