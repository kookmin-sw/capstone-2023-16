import React from 'react';
import { CheckBoxField, ImageButtonField, RadioButtonField, TextAreaField, TextField } from '../../components/PersonaCreation';
import '../../components/PersonaCreation/style.css';
import styled, { css } from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { enter } from '../../redux/slices/newPersonaSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SelectFieldBox from '../../components/PersonaCreation/SelectFieldBox';

const GENDER = { 'MALE': '남성', 'FEMALE': '여성' };
const JOBS: any = [{ label: "학생", value: "STUDENT" },
  { label: "교육자", value: "EDUCATOR" },
  { label: "구직자", value: "JOB_SEEKER" },
  { label: "피고용인", value: "EMPLOYEE" },
  { label: "IT관련 업계", value: "IT" },
  { label: "금융업계", value: "FINANCE" },
  { label: "예술업계", value: "ART" },
  { label: "기타", value: "ETC" }];

const UserInfoPage = () => {
  const navigate = useNavigate();
  const deviceType = useDeviceType();

  const form = useSelector((state: RootState) => state.newPersona);
  const dispatch = useDispatch();

  const onSave = (e: any) => {
    const { type, id, name, value, checked, tagName } = e.currentTarget;
    switch (type) {
      case 'checkbox':
        dispatch(enter({ key: id, value: !checked }));
        break;
      case 'radio':
        dispatch(enter({ key: name, value: id }));
        break;
      case 'text':
        dispatch(enter({ key: id, value: value }));
        break;
      case 'number':
        value === "" ? dispatch(enter({ key: id, value: null })): dispatch(enter({ key: id, value: parseInt(value) }));
        break;
    }
    if (tagName === "SELECT")
      (value === "")? dispatch(enter({ key: id, value: null })) : dispatch(enter({ key: id, value: value }));
  };

  const isValid = () => { console.log(form);  return form.nickname !== '';}

  return <Container deviceType={deviceType}>
        <div>
          <ImageButtonField />
      <CheckBoxField fieldname={'isPublic'} label='비공계 계정' onSave={onSave} />
      </div>
      <TextField fieldname='nickname' label='닉네임' onSave={onSave} required />
    <TextField fieldname='birthYear' label='생년' type='number' onSave={onSave} />
    <div></div>
      <RadioButtonField fieldname={'gender'} label={'성별'} elements={GENDER} onSave={onSave} />
    <SelectFieldBox fieldname='job' label='직업' labelsAndValues={JOBS} onSave={onSave} />
    <TextAreaField fieldname='introduction' label='페르소나 소개' onSave={onSave} />
    <NextButton deviceType={deviceType} onClick={()=>isValid()?navigate('2'):alert('닉네임은 필수 입력항목입니다.')}>다음</NextButton>
    </Container>
};

export default UserInfoPage;

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
  margin-bottom: 10px;
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