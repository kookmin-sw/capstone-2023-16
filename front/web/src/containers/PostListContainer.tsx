import React from 'react';
import { getCookie } from '../utils/cookieUtils';
import PostList from '../components/MyPostsPage/PostList';

const PostListContainer = () => {
  const persona_id:string = getCookie('persona_id');
  return <PostList persona_id={persona_id} />;
};

export default PostListContainer;