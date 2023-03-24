import styled from 'styled-components';

const LoginCheckBox = () => {

  return <LoginCheckBoxWrapper htmlFor='remember'>
    <input id='remember' type='checkbox' />로그인유지
  </LoginCheckBoxWrapper>
}

export default LoginCheckBox;

const LoginCheckBoxWrapper = styled.label`
  display: flex;
  font-size: 13px;
  align-items: center;
`