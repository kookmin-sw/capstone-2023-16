import { useRef } from 'react';
import useDeviceType from '../hooks/useDeviceType';
import LoginInput from '../components/Login/LoginInput';
import LoginButton from '../components/Login/LoginButton';
import LoginCheckBox from '../components/Login/LoginCheckBox';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginContainer from '../components/Login/LoginContainer';

const LoginPage = () => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  const idInput = useRef(null);
  const pwInput = useRef(null);

    return(
      <>
        <LoginContainer>
          <SignInTitle deviceType={deviceType}>SIGN IN</SignInTitle>
          <SignUpNav deviceType={deviceType}>PERSONA가 처음이신가요? {deviceType === 'mobile' ? <br /> : null}<Link to='/'>회원가입</Link></SignUpNav>
          {/* 비율을 위한 공백 */}
          <EmptyBox deviceType={deviceType}/>

          <LoginInput text='ID' inputRef={idInput} deviceType={deviceType}></LoginInput>
          <LoginInput text='PASSWORD' inputRef={pwInput} deviceType={deviceType} isPassword></LoginInput>
          <LoginCheckBox />
          {/* 비율을 위한 공백 */}
          <EmptyBox deviceType={deviceType} />

          <LoginButton deviceType={deviceType} onClick={() => navigate('/personas')} />
        </LoginContainer>
      </>
    )
} ;

export default LoginPage;

const SignInTitle = styled.h2<{ deviceType: string }>`
  margin-bottom: 15px;
  font-size: ${(props) => { return props.deviceType === 'mobile'? '24px': '36px'}};
  font-weight: 700;
`

const SignUpNav = styled.p<{ deviceType: string }>`
font-size: ${(props) => { return props.deviceType === 'mobile' ? '12px' : '16px' }};
line-height: 140%;
  & a{
    font-weight: 700;
    text-decoration: none;
  }
`

const EmptyBox = styled.div<{ deviceType: string }>`
  height: 44px;
`