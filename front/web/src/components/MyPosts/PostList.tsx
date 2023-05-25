import React, { useCallback, useEffect, useState } from 'react';
import PostCard from './PostCard';
import styled from 'styled-components';
import {useNavigate } from 'react-router-dom';
import useDeviceType from '../../hooks/useDeviceType';
import PostApiClient from '../../api/Post';
import EmptyMessage from '../commons/EmptyMessage';
import { throttle } from '../../utils/performUtils';

type PostListProps = {
  id: string,
}

const AVERAGE_LOAD = 10;

const PostList = ({id}: PostListProps) => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  const { data: postList, hasNext, isLoadingNext, loadNext, refetch } = PostApiClient.postListGet(id!);
  
  // 스크롤 이벤트 핸들러
  const handleScroll = (e:any) => {
    throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;

      if (scrollTop+10 >= scrollHeight - clientHeight) {
        console.log('실행!')
        if (hasNext&&!isLoadingNext) {
          console.log('handleScroll')
          loadNext(AVERAGE_LOAD);
        }
      }
    })
  };

  const onRefetch = (index: number) => {
    refetch({ first: index-1 }, { fetchPolicy: 'network-only' });
  }

  return postList.getPublicPosts.edges[0] ?
    <PostListContainer deviceType={deviceType} onScroll={handleScroll}>
      {postList?.getPublicPosts?.edges?.map((p: any, i:any) => <PostCardWrapper key={p.node.id} deviceType={deviceType} onClick={() => navigate(`/post/${p.node.id}`)} >
        <PostCard deviceType={deviceType} id={p.node.id} title={p.node.title} content={p.node.content} date={p.node.createdAt} refetch={()=>onRefetch(i)} />
      </PostCardWrapper>)}
  </PostListContainer>: <EmptyMessage type='post' />
};

export default PostList;

const PostListContainer = styled.div<{ deviceType: string }>`
  width: 100%;
  display: grid;
  margin-top: ${(props) => props.deviceType === 'mobile' ? '7px' : '23px'}; 
  padding: 20px 10px 40px; 
  grid-template-columns: ${(props) => { return props.deviceType === 'desktop' ? '45% 45%' : 'none' }};
  place-items: center;
  place-content: space-between center;
  row-gap: ${(props) => { return props.deviceType === 'mobile' ? '25px' : '38px' }};
  column-gap: 47px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const PostCardWrapper = styled.div<{ deviceType: string }>`
  width: 100%;
  min-width: 195px;
  height: ${(props) => { return (props.deviceType === 'mobile') ? '130px' : '255px' }};
  padding-right: 5px;
  &:hover{
    cursor: pointer;
  }
  &:active{
      cursor: default;
  }
`;