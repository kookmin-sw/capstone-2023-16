import React from 'react';
import postList from './dummy/postList.json';
import PostCard from './PostCard';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useDeviceType from '../../hooks/useDeviceType';

const PostList = () => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();

  return <PostListContainer deviceType={deviceType} >
    {postList.map(p => <PostCardWrapper key={p.node.id} deviceType={deviceType} onClick={() => navigate(p.node.id)} >
        <PostCard deviceType={deviceType} title={p.node.title} content={p.node.content} date={p.node.createdAt} />
      </PostCardWrapper>)}
  </PostListContainer>
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