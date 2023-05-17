import React, { useEffect, useRef, useState } from 'react';
import {Container, Input, SubmitButton, TermField} from '../components/Account';
import useDeviceType from '../hooks/useDeviceType';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SignUpPage = () => {
  const deviceType = useDeviceType();
  const [termChecked, setTermChecked] = useState<boolean>(false);
  const [misMatchError, setMisMatchError] = useState<boolean>(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  
  useEffect(() => {
    (inputRefs?.current[2].value !== inputRefs?.current[3].value)?
      setMisMatchError(true)
      : setMisMatchError(false);
  }, [inputRefs.current[3].value])

  return <>
    <Container>
      <div>
        <h2 className='title'>Sign Up</h2>
        <p className='nav'>계정이 이미 있으신가요? &nbsp;<Link to='/'>로그인</Link></p>
      </div>
      <FieldContainer>
        <Input text='아이디' ref={(ref:HTMLInputElement)=>inputRefs.current[0]} devicetype={deviceType} />
        <Input text='이메일' ref={(ref:HTMLInputElement)=>inputRefs.current[1]} devicetype={deviceType} />
        <Input text='비밀번호' ref={(ref:HTMLInputElement)=>inputRefs.current[2]} devicetype={deviceType} />
        <Input text='비밀번호 확인' ref={(ref: HTMLInputElement) => inputRefs.current[3]} devicetype={deviceType} />
        <TermField checked={termChecked} onChange={() => setTermChecked(!termChecked)} />
      </FieldContainer>
      <SubmitButton text='SIGN UP'deviceType={deviceType} onClick={()=>console.log('회원가입!')} />
      
    </Container>
  </>
};

export default SignUpPage;

const FieldContainer = styled.div`
  width: 100%;
`;