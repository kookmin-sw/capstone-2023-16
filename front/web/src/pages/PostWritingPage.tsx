import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ContentLayout from '../components/commons/ContentLayout';
import ButtonGroup from '../components/PostWriting/ButtonGroup';
import CategoryChoice from '../components/PostWriting/CategoryChoice';
import PostTitle from '../components/PostWriting/PostTitle';
import TextEditor from '../components/PostWriting/TextEditor';
import useDeviceType from '../hooks/useDeviceType';

const PostWritingPage = () => {
  const deviceType = useDeviceType();
  const [submitFlag, setSubmitFlag] = useState(false);

  return <>
    <ContentLayout>
      <Header deviceType={deviceType}>
        <CategoryChoice />
        <ButtonGroup setSubmitFlag={setSubmitFlag} />
      </Header>
      <PostTitle submitFlag={submitFlag} />
      <TextEditor submitFlag={submitFlag} />
    </ContentLayout>
  </>
};

export default PostWritingPage;

const Header = styled.div < { deviceType: string }>`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.deviceType === 'desktop' ? 'row' : 'column'};
  justify-content: space-between;
  margin-bottom: ${(props) => props.deviceType === 'desktop' ? '22px' : (props.deviceType === 'tablet') ? '43px' : '10px'};
  row-gap: ${props => props.deviceType === 'mobile' ? '10px' : '26px'};
}`