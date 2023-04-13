import React, { useState } from 'react';
import ContentLayout from '../components/commons/ContentLayout';
import TextEditor from '../components/PostWriting/TextEditor';

const PostWritingPage = () => {
  const [submitFlag, setSubmitFlag] = useState(false);

  return <>
    <ContentLayout>
      <TextEditor submitFlag={submitFlag} />
    </ContentLayout>
  </>
};

export default PostWritingPage;