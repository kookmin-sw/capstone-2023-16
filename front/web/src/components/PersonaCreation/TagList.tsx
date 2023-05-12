import React from 'react';
import TagApiClient from '../../api/TagAndCategory';
import TagCard from './TagCard';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

const TagList = () => {
  const { data, hasNext, loadNext, isLoadingNext } = TagApiClient.tagAllGet();
  const deviceType = useDeviceType();

  return <Container deviceType={deviceType}>
    {data?.getAllTags?.edges?.map((d: any) => <TagCard id={d.node.id} body={d.node.body} />)}
  </Container>
};

export default TagList;

const Container = styled.div < { deviceType: string }>`
  max-width: ${(props) => { return props.deviceType === 'desktop' ? '520px' : props.deviceType === 'table' ? '488px' : '305px' }};   
  display: flex;  
  flex-wrap: wrap;
  `