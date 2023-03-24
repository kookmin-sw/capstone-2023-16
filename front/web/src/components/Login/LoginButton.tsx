import styled from 'styled-components';
import { GrayShadowBox } from '../commons/GrayShadowBox';
  
type LoginButtonProps = {
  deviceType: string,
  onClick: () => void,
};  
  
const LoginButton = ({deviceType, onClick}: LoginButtonProps) => {
  return (
    <LoginButtonContainer deviceType={deviceType}>
        <LoginButtonText deviceType={deviceType} onClick={onClick}>SIGN IN</LoginButtonText>
    </LoginButtonContainer>
  );
};

export default LoginButton;

const LoginButtonContainer = styled(GrayShadowBox) <{ deviceType: string }>`
  width: 100%;
  background: #FFFFFF;  
  box-shadow: 0px 1px 10px 2px rgba(211, 140, 255, 0.5);
  border-radius: 15px;
`

const LoginButtonText = styled.button<{ deviceType: string }>`
  width: 100%;
  padding: ${(props) => { return props.deviceType === 'mobile'? '15px': '11px' }}; 
  background-color: transparent;
  font-size: ${(props) => { return props.deviceType === 'mobile'? '14px': '24px' }}; 
  font-weight: 700;
  border: 0;
  border-radius: 15px;
  &:hover{
    cursor: pointer;
  }
  &:active{
    cursor: default;
    background-color: lightgray;
  }
`