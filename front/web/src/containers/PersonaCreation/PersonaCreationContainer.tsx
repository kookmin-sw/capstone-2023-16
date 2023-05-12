import React from 'react';
import { CheckBoxField, ImageButtonField, RadioButtonField, TextAreaField, TextField } from '../../components/PersonaCreation';
import '../../components/PersonaCreation/style.css';
import styled, { css } from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

const GENDER = { 'MALE': '남성', 'FEMALE': '여성' };

const PersonaCreationContainer = () => {
  const deviceType = useDeviceType();

  return <Container deviceType={deviceType}>
        <div>
          <ImageButtonField />
          <CheckBoxField fieldname={'isPublic'} label='비공계 계정'/>
      </div>
      <TextField fieldname='nickname' label='닉네임' required />
      <TextField fieldname='age' label='생년' />
      <RadioButtonField fieldname={'gender'} label={'성별'} elements={GENDER} />
      <TextField fieldname='job' label='직업' />
      <TextAreaField fieldname='introduction' label='페르소나 소개' />
    </Container>
};

export default PersonaCreationContainer;

const Container = styled.div<{deviceType: string}>`
  width: 100%;
  display: grid;
  place-items: center;
  column-gap: 10%;
  ${props => props.deviceType === 'desktop' ? css`
    row-gap: 15%; 
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(5, 2fr);
    div:nth-child(1){
      grid-row: 1 / 4;
      grid-column: 1 / 2;
    }
    div:nth-child(6){
      grid-row: 3 / 6 ;
      grid-column: 2 / 3;
    }
    `: css`
      row-gap: 3%; 
      div:nth-child(1){
      grid-row: 1 / 3;
    }
  `}
`;