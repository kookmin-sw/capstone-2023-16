import { useRef } from 'react';
import useDeviceType from '../hooks/useDeviceType';
import { Container, Input, SubmitButton } from '../components/Account';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AccountApiClient from '../api/Account';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import '../components/Account/style.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const deviceType = useDeviceType();
  const usernameInput = useRef<HTMLInputElement>(null);
  const pwInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const onLogin = () => {
    if (usernameInput.current && pwInput.current) {
      const loginform = {
        username: usernameInput.current.value,
        password: pwInput.current.value
      };
      AccountApiClient.loginPost(loginform)
        .then((res: any) => {
          dispatch(setUser(res.login));
          navigate('/personas');
        })
        .catch((err:any) => console.error(err));
    }
  }

  return(
    <>
      <Container>
        <h2 className='title'>SIGN IN</h2>
        <p className='nav'>PERSONA가 처음이신가요? {deviceType === 'mobile' ? <br /> : null}<Link to='/signup'>회원가입</Link></p>
        {/* 비율을 위한 공백 */}
        <EmptyBox deviceType={deviceType}/>

        <Input text='아이디' ref={usernameInput} deviceType={deviceType}></Input>
        <Input text='비밀번호' ref={pwInput} deviceType={deviceType} isPassword></Input>
        {/*<LoginCheckBox />*/}
        {/* 비율을 위한 공백 */}
        <EmptyBox deviceType={deviceType} />

        <SubmitButton text='SIGN IN' deviceType={deviceType} onClick={onLogin} />
      </Container>
    </>
  )
};

export default LoginPage;

const EmptyBox = styled.div<{ deviceType: string }>`
  height: 44px;
`