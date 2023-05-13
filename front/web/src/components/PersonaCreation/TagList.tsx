import React, { Suspense } from 'react';
import TagCard from './TagCard';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import LoadingSpinner from '../../pages/LoadingSpinnerPage';
import TagApiClient from '../../api/TagAndCategory';

type TaglistType = {

};

const TagList = () => {
  const deviceType = useDeviceType();
  const { data, hasNext, loadNext, isLoadingNext } = TagApiClient.tagAllGet();

  return <Container deviceType={deviceType}>
          {data?.getAllTags&&data?.getAllTags?.edges?.map((d: any) => <TagCard id={d.node.id} body={d.node.body} key={d.node.id} />)}
  </Container>
};

export default TagList;

const Container = styled.div < { deviceType: string }>`
  width: 100%;
  height: 80%;
  margin: 10px 0;
  padding: 0 0 2vw 0;
  display: flex;  
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-y: auto;
  `