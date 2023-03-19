import { useRef } from 'react';
import useDeviceType from '../hooks/useDeviceType';
import WHcal from '../utils/WHcal';
import LoginInput from '../components/Login/LoginInput';
import LoginButton from '../components/Login/LoginButton';
import LoginCheckBox from '../components/Login/LoginCheckBox';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginContainer from '../components/Login/LoginContainer';

const LoginPage = () => {
  const deviceType = useDeviceType();
  const idInput = useRef(null);
  const pwInput = useRef(null);

    return(
      <>
        <LoginContainer>
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
        </LoginContainer>
      </>
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
  height: ${(props) => { return WHcal(props.widthType!, 40) }};
`