import ContentLayout from '../components/commons/ContentLayout';
import PersonaCard from '../components/commons/PersonaCard';
import PostList from '../components/MyPosts/PostList';
import useDeviceType from '../hooks/useDeviceType';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MyPostsSetting from '../components/MyPosts/MyPostsSetting';
import { useAuth } from '../context/AuthContext';

const MyPostsPage = () => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  const context = useAuth();

  return <>
    <PersonaCardWrapper deviceType={deviceType} onClick={() => navigate('/personas')}>
      <PersonaCard nickname={context?.persona?.nickname!} deviceType={deviceType} />
      </PersonaCardWrapper>
      <ContentLayout>
        <MyPostsPageContainer>
        <MyPostsContainer>
          <Header deviceType={deviceType}>
            <MyPostsHeader deviceType={deviceType}>내가 쓴 글 목록</MyPostsHeader>
            <MyPostsSetting id={context?.persona?.id!} nickname={context?.persona?.nickname!} />
          </Header>
            <PostList id={context?.persona?.id!} />
          </MyPostsContainer>
        </MyPostsPageContainer>
      </ContentLayout>
    </>
};

export default MyPostsPage;

const PersonaCardWrapper = styled.section<{ deviceType: string }>`
  width: ${(props) => (props.deviceType === 'mobile') ? '242px' : '369px'};
  margin-left: ${(props) => (props.deviceType === 'desktop') ? '10%' : props.deviceType === 'tablet'? '2.5%' : 'none'};
  margin-bottom: 16px;
  background-color: #fefefe;
  border-radius: ${(props) => { return (props.deviceType === 'mobile') ? '15px' : '30px' }};
  align-self: start;
  &:hover {
    cursor: pointer;
  }
  &:active {
    cursor: default;
  }
`;

const MyPostsPageContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 0;
`;

const Header = styled.div<{deviceType:string}>`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.deviceType === 'desktop' ? 'row' : 'column'};
  justify-content: space-between;
  margin-bottom: ${props => props.deviceType === 'mobile' ? '10px': '12px'};
  row-gap: ${(props) => { return (props.deviceType === 'tablet') ? '26px' : '17px' }};
`

const MyPostsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const MyPostsHeader = styled.h2<{deviceType: string}>`
  font-size: ${(props) => (props.deviceType === 'desktop') ? '32px' : (props.deviceType === 'tablet') ? '28px': '16px'};
  font-weight: 700;
`