import { useRef } from 'react';
import useDeviceType from '../hooks/useDeviceType';
import LoginInput from '../components/Login/LoginInput';
import LoginButton from '../components/Login/LoginButton';
import LoginCheckBox from '../components/Login/LoginCheckBox';
import LoginContainer from '../components/Login/LoginContainer';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { login } from '../redux/slices/loginSlice';

import LoginAPI from '../graphQL/LoginAPI';

const LoginPage = () => {
  const navigate = useNavigate();
  const deviceType = useDeviceType();
  const idInput = useRef<HTMLInputElement>(null);
  const pwInput = useRef<HTMLInputElement>(null);

  const loginForm = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onLogin = () => {
    if (idInput.current && pwInput.current) {
      const loginform = {
        id: idInput.current.value,
        password: pwInput.current.value
      };
      dispatch(login(loginform));
      LoginAPI.loginPost()
    }
    console.log(loginForm);
    navigate('/personas')
  }
  

    return(
      <>
        <LoginContainer>
          <SignInTitle deviceType={deviceType}>SIGN IN</SignInTitle>
          <SignUpNav deviceType={deviceType}>PERSONA가 처음이신가요? {deviceType === 'mobile' ? <br /> : null}<Link to='/'>회원가입</Link></SignUpNav>
          {/* 비율을 위한 공백 */}
          <EmptyBox deviceType={deviceType}/>

          <LoginInput text='ID' ref={idInput} deviceType={deviceType}></LoginInput>
          <LoginInput text='PASSWORD' ref={pwInput} deviceType={deviceType} isPassword></LoginInput>
          {/*<LoginCheckBox />*/}
          {/* 비율을 위한 공백 */}
          <EmptyBox deviceType={deviceType} />

          <LoginButton deviceType={deviceType} onClick={onLogin} />
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