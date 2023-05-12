import React from 'react';
import styled from 'styled-components';

type TextAreaField = {
  fieldname: string,
  label: string,
};

const TextAreaField = ({ fieldname, label }: TextAreaField) => {

  return <Container>
    <Label className='field__label'>{label}</Label>
    <FieldTextArea className='field__container' rows={10} />
  </Container>
};

export default TextAreaField;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Label = styled.div`
  margin-bottom: 10px;
`;

const FieldTextArea = styled.textarea`
  min-height: 200px;
  display: block; 
  line-height: 150%;
  resize: none;
  padding: 1rem;
  &:focus{
    outline: 0;
    box-shadow: 0px 0.2778vw 2.0833vw 0px rgba(211, 140, 255, 0.5);
  }
`