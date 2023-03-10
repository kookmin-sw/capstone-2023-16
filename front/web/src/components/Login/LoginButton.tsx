import styled from 'styled-components';
import WHcal from '../../utils/WHcal';
import { GrayShadowBox } from '../commons/GrayShadowBox';
  
type LoginButtonProps = {
  widthType: string,
  onClick: () => void,
};  
  
const LoginButton = ({widthType, onClick}: LoginButtonProps) => {
  return (
    <LoginButtonContainer widthType={widthType}>
        <LoginButtonText widthType={widthType} onClick={onClick}>SIGN IN</LoginButtonText>
    </LoginButtonContainer>
  );
};

export default LoginButton;

const LoginButtonContainer = styled(GrayShadowBox) <{ widthType: string }>`
  width: 100%;
  border-radius: ${(props) => { return WHcal(props.widthType!, 15) }};
  border: 0;
`

const LoginButtonText = styled.button<{ widthType: string }>`
  width: 100%;
  padding: ${(props) => { return WHcal(props.widthType!, 11) }};
  background-color: transparent;
  font-size: ${(props) => { return WHcal(props.widthType!, 24) }}; 
  font-weight: 700;
  border: 0;
  border-radius: ${(props) => { return WHcal(props.widthType!, 15) }};
  &:hover{
    cursor: pointer;
  }
  &:active{
    cursor: default;
    background-color: lightgray;
  }
`