import useDeviceType from '../hooks/useDeviceType';
import MainLayout from '../components/commons/MainLayout';

const LoginPage = () => {
  const deviceType = useDeviceType();

    return(
      <MainLayout widthType={deviceType}>
        로그인페이지입니다.
        </MainLayout>
    )
} ;

export default LoginPage;