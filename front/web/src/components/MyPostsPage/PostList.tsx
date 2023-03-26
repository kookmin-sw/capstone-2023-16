import React from 'react';
import postList from './dummy/postList.json';
import PostCard from '../commons/PostCard';
import styled from 'styled-components';

type PostListProps = {
  deviceType: string;
};

const PostList = ({ deviceType }: PostListProps) => {

  return <PostListContainer deviceType={deviceType} >
    {postList.map(p => <PostCardWrapper key={p.node.id}>
      <PostCard title={p.node.title} content={p.node.content} date={p.node.createdAt} deviceType={deviceType} />
    </PostCardWrapper>
    )}
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

const PostCardWrapper = styled.div`
  width: 100%;
  &:hover{
    cursor: pointer;
  }
  &:active{
    cursor: default;
  }
`