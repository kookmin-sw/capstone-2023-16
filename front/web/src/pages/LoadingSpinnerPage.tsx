import React from 'react';
import {default as Layout} from '../components/commons/ContentLayout';
import LoadingSpinner from '../components/commons/LoadingSpinner';
import styled from 'styled-components';

const LoadingSpinnerPage = () => {
  return <ContentLayout>
    <LoadingSpinner />
  </ContentLayout>
};

export default LoadingSpinnerPage;

const ContentLayout = styled(Layout)`

  display: flex;
  justify-content: center;
    position: relative;
  top: 100%;
  height: 100%;
`