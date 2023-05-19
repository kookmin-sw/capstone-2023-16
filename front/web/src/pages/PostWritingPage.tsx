import React, { useEffect, useState } from 'react';
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

const PostWritingPage = () => {
  const [submitFlag, setSubmitFlag] = useState(false);
  const persona = useSelector((state: RootState) => state.persona);
  const newPost = useSelector((state: RootState) => state.newPost);
  const deviceType = useDeviceType();
  const navigate = useNavigate();
 
  useEffect(() => {
    if (submitFlag) {
      if ((newPost.title !== "") && (newPost.length >= 20)) console.log(newPost);
    }
    setSubmitFlag(false);
   }, [submitFlag])

  return <>
    <PersonaCardWrapper deviceType={deviceType} onClick={() => navigate('/personas')}>
      <PersonaCard {...persona} deviceType={deviceType} />
    </PersonaCardWrapper>
    <ContentLayout>
      <Header deviceType={deviceType}>
        <CategorySelector submitFlag={submitFlag} />
        <PostWritingSetting setSubmitFlag={setSubmitFlag} />
      </Header>
      <PostTitle submitFlag={submitFlag} />
      <TextEditor submitFlag={submitFlag} />
      <button onClick={()=>setSubmitFlag(true)}>Log editor content</button>
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
}`