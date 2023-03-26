import ContentLayout from '../components/commons/ContentLayout';
import PersonaCard from '../components/commons/PersonaCard';
import PostList from '../components/MyPostsPage/PostList';
import useDeviceType from '../hooks/useDeviceType';
import { useSelector } from 'react-redux';
import { RootState } from './../redux/store';
import styled from 'styled-components';

const MyPostsPage = () => {
  const deviceType = useDeviceType();
  const persona = useSelector((state: RootState) => state.persona);

  return <>
      <PersonaCardWrapper deviceType={deviceType}>
        <PersonaCard {...persona} deviceType={deviceType} />
      </PersonaCardWrapper>
      <ContentLayout>
        <MyPostsPageContainer>
          <MyPostsContainer>
            <MyPostsHeader deviceType={deviceType}>내가 쓴 글 목록</MyPostsHeader>
            <PostList deviceType={deviceType} />
          </MyPostsContainer>
        </MyPostsPageContainer>
        </ContentLayout>
    </>
};

export default MyPostsPage;

const PersonaCardWrapper = styled.section<{ deviceType: string }>`
  width: ${(props) => (props.deviceType === 'mobile') ? '242px' : '369px'};
  margin-left: 6.5%;
  margin-bottom: 16px;
  background-color: #fefefe;
  border-radius: ${(props) => { return (props.deviceType === 'mobile') ? '15px' : '30px' }};
  align-self: start;
  `;

const MyPostsPageContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 0;
`;

const MyPostsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 0;
  overflow-y: hidden;
`;

const MyPostsHeader = styled.h2<{deviceType: string}>`
  font-size: ${(props) => (props.deviceType === 'desktop') ? '32px' : (props.deviceType === 'tablet') ? '28px': '16px'};
  font-weight: 700;
`