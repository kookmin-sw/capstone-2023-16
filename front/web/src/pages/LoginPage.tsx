import { useRef } from 'react';
import useDeviceType from '../hooks/useDeviceType';
import WHcal from '../utils/WHcal';
import LoginInput from '../components/Login/LoginInput';
import LoginButton from '../components/Login/LoginButton';
import LoginCheckBox from '../components/Login/LoginCheckBox';
import MainLayout from '../components/commons/MainLayout';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GrayShadowBox } from '../components/commons/GrayShadowBox';
import ContainerLayout from '../components/commons/ContainerLayout';

const LoginPage = () => {
  const deviceType = useDeviceType();
  const idInput = useRef(null);
  const pwInput = useRef(null);

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

          <LoginButton widthType={deviceType} onClick={() => console.log('')} />
        </ContainerLayout>
      </MainLayout>
    )
} ;

export default LoginPage;

const LoginContainer = styled(GrayShadowBox) <{ widthType: string }>`
  display: flex;
  width: ${(props) => { return WHcal(props.widthType!, 400) }};
  position: absolute;
  padding: ${(props) => { return WHcal(props.widthType!, 65) }} ${(props) => { return WHcal(props.widthType!, 71) }};
  border-radius: ${(props) => { return WHcal(props.widthType!, 50) }};
  top: 53%;
  left: 60%;
  transform: ${(props)=> props.widthType === 'big'? 'translate(-10%, -50%)': 'translate(-50%, -50%)'};
  flex-direction: column;
  align-items: start;
`

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