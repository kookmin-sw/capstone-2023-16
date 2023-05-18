import React, { useState } from 'react';
import ContentLayout from '../components/commons/ContentLayout';
import ModelGroup from '../components/Revenue/ModelGroup';

const RevenuePage = () => {
  const [model, setModel] = useState();
  return <ContentLayout>
    <ModelGroup />
  </ContentLayout>
};

export default RevenuePage;