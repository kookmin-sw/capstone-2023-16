import React from 'react';
import { CheckBoxField, ImageButtonField, RadioButtonField, TextAreaField, TextField } from '../../components/PersonaCreation';
import '../../components/PersonaCreation/style.css';
import styled, { css } from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import { useNavigate } from 'react-router-dom';

const GENDER = { 'MALE': '남성', 'FEMALE': '여성' };

const PersonaCreationContainer = () => {
  const navigate = useNavigate();
  const deviceType = useDeviceType();

  return <Container deviceType={deviceType}>
        <div>
          <ImageButtonField />
          <CheckBoxField fieldname={'isPublic'} label='비공계 계정'/>
      </div>
      <TextField fieldname='nickname' label='닉네임' required />
    <TextField fieldname='age' label='생년' />
    <div></div>
      <RadioButtonField fieldname={'gender'} label={'성별'} elements={GENDER} />
      <TextField fieldname='job' label='직업' />
    <TextAreaField fieldname='introduction' label='페르소나 소개' />
    <NextButton deviceType={deviceType} onClick={()=>navigate('2')}>다음</NextButton>
    </Container>
};

export default PersonaCreationContainer;

const Container = styled.div<{deviceType: string}>`
  width: 100%;
  display: grid;
  place-items: center; 
  column-gap: 10%;
  ${props => props.deviceType === 'desktop' ? css`
    row-gap: 50px;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(6, 2fr);
    div:nth-child(1){
      grid-row: 1 / 4;
      grid-column: 1 / 2;
    }
    div:nth-child(7){
      grid-row: 3 / 6 ;
      grid-column: 2 / 3;
    }
    `: css`
      row-gap: 20px;
      div:nth-child(1){
      grid-row: 1 / 3;
    }
  `}
`;

const NextButton = styled.button<{deviceType: string}>`
  width: 100%;
  padding: 10px;
  border: 0;
  border-radius: 15px;
  background: #FFFFFF;  
  box-shadow: 0px 1px 10px 2px rgba(211, 140, 255, 0.5);
  font-size: ${(props) => { return props.deviceType === 'mobile'? '14px': '24px' }}; 
  font-weight: 700;
  &:hover{
    cursor: pointer;
  }
  &:active{
    cursor: default;
    background-color: lightgray;
  }
`