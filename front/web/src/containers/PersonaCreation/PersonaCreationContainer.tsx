import React from 'react';
import { CheckBoxField, ImageField, RadioButtonField, TextAreaField, TextField } from '../../components/PersonaCreation';
  
const GENDER = { 'MALE': '남성', 'FEMALE': '여성' };

const PersonaCreationContainer = () => {
  return <>
      <ImageField />
      <CheckBoxField fieldname={'isPublic'} label='비공계 계정'/>
      <TextField fieldname='nickname' label='닉네임' required />
      <TextField fieldname='age' label='생년' />
      <RadioButtonField fieldname={'gender'} label={'성별'} elements={GENDER} />
      <TextField fieldname='job' label='직업' />
      <TextAreaField fieldname='introduction' label='페르소나 소개' />
    </>
};

export default PersonaCreationContainer;