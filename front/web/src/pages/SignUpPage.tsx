import React, { useEffect, useRef, useState } from 'react';
import {Container, Input, SubmitButton, TermField} from '../components/Account';
import useDeviceType from '../hooks/useDeviceType';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AccountApiClient from '../api/Account';

const SignUpPage = () => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  const [termChecked, setTermChecked] = useState<boolean>(false);
  const [misMatchError, setMisMatchError] = useState<boolean>(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  
  const matchPassword = (e: any) => {
    console.log(e.currentTarget.value, inputRefs.current[2].value);
    setMisMatchError(e.currentTarget.value !== inputRefs.current[2].value)
  };

  const valid = () => {
    const nullErrors = inputRefs.current.filter(input => input.value === ""); // null check
    console.log(nullErrors);
    return (nullErrors.length === 0 && !misMatchError) ?    // + password mismatch check
      termChecked ?                                         // + term check
        AccountApiClient.register(
          inputRefs.current[0].value.toString(),  // username
          inputRefs.current[1].value.toString(),  // email
          inputRefs.current[2].value.toString()   // password
        ).then(res => navigate('/personas')) :
        alert("이용약관 동의는 필수입니다."):
        alert(nullErrors.map(e => e.id) + "은 필수 항목입니다."); 
  };

  

  return <>
    <Container>
      <div>
        <h2 className='title'>Sign Up</h2>
        <p className='nav'>계정이 이미 있으신가요? &nbsp;<Link to='/'>로그인</Link></p>
      </div>
      <FieldContainer>
        <Input text='아이디' ref={(ref:HTMLInputElement)=>inputRefs.current[0]=ref} deviceType={deviceType} />
        <Input text='이메일' ref={(ref:HTMLInputElement)=>inputRefs.current[1]=ref} deviceType={deviceType} />
        <Input text='비밀번호' ref={(ref:HTMLInputElement)=>inputRefs.current[2]=ref} deviceType={deviceType} onChange={matchPassword} isPassword/>
        <Input text='비밀번호 확인' ref={(ref: HTMLInputElement) => inputRefs.current[3] = ref} deviceType={deviceType} onChange={matchPassword} isPassword/>
        {misMatchError && <ErrorMessage deviceType={deviceType}>비밀번호가 일치하지 않습니다</ErrorMessage>}
        <TermField checked={termChecked} onChange={() => setTermChecked(!termChecked)} />
      </FieldContainer>
      <SubmitButton text='SIGN UP' deviceType={deviceType} onClick={valid} />
      
    </Container>
  </>
};

export default SignUpPage;

const FieldContainer = styled.div`
  width: 100%;
`;

const ErrorMessage = styled.span<{ deviceType: string }>`
  color: red;
  font-size: ${props => props.deviceType === "mobile" ? '12px' : '16px' };
`