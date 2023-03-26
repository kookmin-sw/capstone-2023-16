import dummy from './dummy/postList';
import { PostListType } from './dummy/postListType';
import PostCard from '../commons/PostCard';
import styled from 'styled-components';

type PostListProps = {
  deviceType: string;
}
  
const PostList = ({ deviceType }: PostListProps) => {
  // 추후 연동 시에 제거
  const postList: PostListType = JSON.parse(dummy);

  return <PostListContainer deviceType={deviceType} >
    {postList.map(p => <PostCard key={p.node.id} title={p.node.title} content={p.node.content} date={p.node.createdAt} deviceType={deviceType} />)}
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
`
