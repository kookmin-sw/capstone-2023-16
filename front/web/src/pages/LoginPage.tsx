import { useRef } from 'react';
import useDeviceType from '../hooks/useDeviceType';
import MainLayout from '../components/commons/MainLayout';
import LoginInput from '../components/Login/LoginInput';
import TextButton from '../components/commons/TextButton';
import LoginCheckBox from '../components/Login/LoginCheckBox';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const deviceType = useDeviceType();
  const idInput = useRef(null);
  const pwInput = useRef(null);

    return(
      <MainLayout widthType={deviceType}>
        <h2>SIGN IN</h2>
        <p>PERSONA가 처음이신가요? <Link to='/'>회원가입</Link></p>
        <LoginInput text='ID' inputRef={idInput}></LoginInput>
        <LoginInput text='PASSWORD' inputRef={pwInput} isPassword></LoginInput>
        <TextButton text='SIGN IN' widthType={deviceType}></TextButton>
        <LoginCheckBox />
        </MainLayout>
    )
} ;

export default LoginPage;