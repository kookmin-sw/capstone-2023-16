import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled  from 'styled-components';
import ContentLayout from '../components/commons/ContentLayout';
import PersonaCard from '../components/commons/PersonaCard';
import PostWritingSetting from '../components/PostWriting/PostWritingSetting';
import CategorySelector from '../components/PostWriting/CategorySelector';
import PostTitle from '../components/PostWriting/PostTitle';
import TextEditor from '../components/PostWriting/TextEditor';
import useDeviceType from '../hooks/useDeviceType';
import { RootState } from '../redux/store';
import PostApiClient from '../api/Post';
import TagInputBox from '../components/PostWriting/TagInputBox';
import { useDispatch } from 'react-redux';
import { reset } from '../redux/slices/newPostSlice';
import { useAuth } from '../context/AuthContext';
import { throttle } from '../utils/performUtils';

const PostWritingPage = () => {
  const [submitFlag, setSubmitFlag] = useState(false);
  const newPost = useSelector((state: RootState) => state.newPost);
  const dispatch = useDispatch();
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  const context = useAuth();
 
  useEffect(() => {
    if (submitFlag) {
      throttle(() => {
        if ((newPost.title !== "") && (newPost.length >= 20)) {
          if (!newPost.category || newPost.category.id === "default") {
            alert("카테고리 선택은 필수입니다.");
          } else {
            const newPostInput: any = { ...newPost };
            delete newPostInput.length;
            PostApiClient.postCreate(newPostInput)
              .then(() => {
                dispatch(reset());
                navigate('/post');
              })
              .catch(e => console.log(e));
          }
        }
      });
    }
    setSubmitFlag(false);
  }, [submitFlag, newPost]);

  const onSubmit = useCallback(() => setSubmitFlag(prev => true), []);

  return <>
    <PersonaCardWrapper deviceType={deviceType} onClick={() => navigate('/personas')}>
      <PersonaCard nickname={context?.persona?.nickname!} deviceType={deviceType} />
    </PersonaCardWrapper>
    <ContentLayout>
      <Header deviceType={deviceType}>
        <CategorySelector />
        <PostWritingSetting onSubmit={onSubmit} />
      </Header>
      <PostTitle submitFlag={submitFlag} />
      <TextEditor submitFlag={submitFlag} />
      <TagInputBox submitFlag={submitFlag} />
      <EmptyBox />
    </ContentLayout>
  </>
};

export default PostWritingPage;

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

const Header = styled.div < { deviceType: string }>`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.deviceType === 'desktop' ? 'row' : 'column'};
  justify-content: space-between;
  margin-bottom: ${(props) => props.deviceType === 'desktop' ? '22px' : (props.deviceType === 'tablet') ? '43px' : '10px'};
  row-gap: ${props => props.deviceType === 'mobile' ? '10px' : '26px'};
}`;

const EmptyBox = styled.div`
  width: 100%;
  height: 10px;
`