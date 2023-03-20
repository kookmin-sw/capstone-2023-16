import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import {WHcal} from '../../utils/WHcal';

const LoginCheckBox = () => {
  const deviceType = useDeviceType();

  return <LoginCheckBoxWrapper htmlFor='remember' widthType={deviceType}>
    <input id='remember' type='checkbox' />로그인유지
  </LoginCheckBoxWrapper>
}

export default LoginCheckBox;

const LoginCheckBoxWrapper = styled.label<{ widthType: string }>`
  display: flex;
  font-size: ${(props) => { return WHcal(props.widthType!, 13) }};
  align-items: center;
`