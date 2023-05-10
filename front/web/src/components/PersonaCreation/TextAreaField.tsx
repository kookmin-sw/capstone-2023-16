import React from 'react';
import styled from 'styled-components';

type TextAreaField = {
  fieldname: string,
  label: string,
};

const TextAreaField = ({ fieldname, label }: TextAreaField) => {

  return <Container>
    <label className='field__label'>{label}</label>
    <FieldTextArea className='field__container' rows={10} />
  </Container>
};

export default TextAreaField;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px 0;

`;

const FieldTextArea = styled.textarea`
  display: block;
  box-sizing: content-box;
  &:focus{
    outline: 0;
    box-shadow: 0px 0.2778vw 2.0833vw 0px rgba(211, 140, 255, 0.5);
  }
`