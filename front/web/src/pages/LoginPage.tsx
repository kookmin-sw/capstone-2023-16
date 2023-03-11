import { useRef } from 'react';
import useDeviceType from '../hooks/useDeviceType';
import WHcal from '../utils/WHcal';
import LoginInput from '../components/Login/LoginInput';
import LoginButton from '../components/Login/LoginButton';
import LoginCheckBox from '../components/Login/LoginCheckBox';
import MainLayout from '../components/commons/MainLayout';
import { Link } from 'react-router-dom';
import ContainerLayout from '../components/commons/ContainerLayout';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { login } from '../store/reducers/loginReducer';

const LoginPage = () => {
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
    }
    console.log(loginForm);
  }
  
    return(
      <MainLayout>
        <ContainerLayout alignDirection='right'>
          <SignInTitle widthType={deviceType}>SIGN IN</SignInTitle>
          <SignUpNav widthType={deviceType}>PERSONA가 처음이신가요? <Link to='/'>회원가입</Link></SignUpNav>
          {/* 비율을 위한 공백 */}
          <EmptyBox widthType={deviceType}/>

          <LoginInput text='ID' inputRef={idInput} widthType={deviceType}></LoginInput>
          <LoginInput text='PASSWORD' inputRef={pwInput} widthType={deviceType} isPassword></LoginInput>
          <LoginCheckBox />
          {/* 비율을 위한 공백 */}
          <EmptyBox widthType={deviceType} />

          <LoginButton widthType={deviceType} onClick={onLogin} />
        </ContainerLayout>
      </MainLayout>
    )
} ;

export default LoginPage;

const SignInTitle = styled.h2<{ widthType: string }>`
  margin-bottom: ${(props) => { return WHcal(props.widthType!, 17) }};
  font-size: ${(props) => { return WHcal(props.widthType!, 36) }};
  font-weight: 700;
`

const SignUpNav = styled.p<{ widthType: string }>`
  font-size: ${(props) => { return WHcal(props.widthType!, 16) }};
  & a{
    font-weight: 700;
    text-decoration: none;
  }
`

const EmptyBox = styled.div<{ widthType: string }>`
  height: ${(props) => { return WHcal(props.widthType!, 44) }};
`