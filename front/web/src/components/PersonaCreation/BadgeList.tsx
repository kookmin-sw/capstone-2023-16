import React, { useEffect, useRef } from 'react';
import Badge from './Badge';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import TagApiClient from '../../api/Tag';
import CategoryApiClient from '../../api/Category';
import { useDispatch } from 'react-redux';
import { enter } from '../../redux/slices/newPersonaSlice';

const AVERAGE_LOAD = 20;

type BadgeListType = {
  type: string
}
const BadgeList = ({type}: BadgeListType) => {
  const deviceType = useDeviceType();
  const { data:taglist, loadNext:tagLoadNext, hasNext:tagHasNext } = TagApiClient.tagAllGet();
  const { data: categorylist, loadNext:categoryLoadNext, hasNext:categoryHasNext } = CategoryApiClient.categoryAllGet();
  const dispatch = useDispatch();
  //const [checkedTags, setCheckedTags] = useState<any[]>([]);
  let checkedTags = useRef<any[]>([]);
  let checkedCatgories = useRef<any[]>([]);

  const onChecked = (e: any) => {
    const { id, name, checked, value } = e.currentTarget;
    if (name === 'tag') {
      if (checked) checkedTags.current = [...checkedTags.current, value];
      else checkedTags.current = checkedTags.current.filter(v => v !== value);
      dispatch(enter({ key: 'preferredTagBodies', value: checkedTags.current }));
    } else {
        if (checked) checkedCatgories.current = [...checkedCatgories.current, {id}];
        else checkedCatgories.current = checkedCatgories.current.filter(i => i.id !== id);
        dispatch(enter({ key: 'preferredCategories', value: checkedCatgories.current })); 
    }
  }

  return <Container deviceType={deviceType}>
    {type === "tag" ?
      taglist?.getAllTags?.edges?.map(
        (d: any) =>
          <Badge
            id={d.node.id}
            body={d.node.body}
            key={d.node.id}
            name='tag'
            onChecked={onChecked} />)
      : categorylist?.getAllCategories?.edges?.map(
        (d: any) =>
          <Badge
            id={d.node.id}
            body={d.node.body}
            key={d.node.id}
            name='category'
            onChecked={onChecked} />)
    }
    {type === "tag" ? tagHasNext && <LoadMoreButton className='field__container' onClick={() => tagLoadNext(AVERAGE_LOAD)}>load</LoadMoreButton> :
      categoryHasNext&&<LoadMoreButton className='field__container' onClick={() => categoryLoadNext(AVERAGE_LOAD)}>load</LoadMoreButton>
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
  overflow-y: scroll;
  `;

const LoadMoreButton = styled.button`
  margin: 12px;
  &:hover {
    background-color: #F1DBFF;
    cursor: pointer;
  }
  &:active {
    cursor: default;
  }
`