import React, { useEffect, useState } from 'react';
import ContentLayout from '../components/commons/ContentLayout';
import ModelGroup from '../components/Revenue/ModelGroup';
import ApexChart from '../components/Charts/AreaChart';
import styled from 'styled-components';
import useDeviceType from '../hooks/useDeviceType';
import dummySeries1 from '../components/Revenue/dummy/dummySeries1';
import dummySeries2 from '../components/Revenue/dummy/dummySeries2';
import dummySeries3 from '../components/Revenue/dummy/dummySeries3';
import dummySeries4 from '../components/Revenue/dummy/dummySeries4';

const RevenuePage = () => {
  const deviceType = useDeviceType();
  const [model, setModel] = useState('TOTAL');

  // get statistics api

  return <ContentLayout>
    <Header deviceType={deviceType}>수익 관리</Header>
    <ModelGroup setModel={setModel} />
    <ApexChart
      data={(model === "TOTAL") ? dummySeries1 :
        (model === "MEMBERSHIP") ? dummySeries2 :
        (model === "DONATION") ? dummySeries3: dummySeries4} />
  </ContentLayout>
};

export default RevenuePage;

const Header = styled.h2<{deviceType:string}>`
  width: 100%;
  height: auto;
  display: flex;
  font-size: ${(props) => (props.deviceType === 'desktop') ? '32px' : (props.deviceType === 'tablet') ? '28px': '16px'};
  font-weight: 700;
`