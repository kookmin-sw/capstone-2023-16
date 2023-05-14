import React from 'react';
import Badge from './Badge';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import TagApiClient from '../../api/Tag';
import CategoryApiClient from '../../api/Category';

type BadgeListType = {
  type: string
}
const BadgeList = ({type}: BadgeListType) => {
  const deviceType = useDeviceType();
  const { data:taglist } = TagApiClient.tagAllGet();
  const { data:categorylist } = CategoryApiClient.categoryAllGet();

  
  return <Container deviceType={deviceType}>
    {type === "tag" ?
      taglist?.getAllTags?.edges?.map((d: any) => <Badge id={d.node.id} body={d.node.body} key={d.node.id} />)
    : categorylist?.getAllCategories?.edges?.map((d: any) => <Badge id={d.node.id} body={d.node.body} key={d.node.id} />)
    }
  </Container>
};

export default BadgeList;

const Container = styled.div < { deviceType: string }>`
  width: 100%;
  height: 80%;
  margin: 10px 0;
  padding: 0 0.7vw 2vw;
  display: flex;  
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-y: auto;
  `