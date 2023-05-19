import React, { useState } from 'react';
import ContentLayout from '../components/commons/ContentLayout';
import ModelGroup from '../components/Revenue/ModelGroup';
import ApexChart from '../components/Revenue/Chart';

const RevenuePage = () => {
  const [model, setModel] = useState();
  return <ContentLayout>
    <ModelGroup />
    <ApexChart />
  </ContentLayout>
};

export default RevenuePage;