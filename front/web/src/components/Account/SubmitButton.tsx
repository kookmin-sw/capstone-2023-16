import styled from 'styled-components';
import { GrayShadowBox } from '../commons/GrayShadowBox';
import { PropsWithChildren } from 'react';
  
type SubmitButtonProps = {
  deviceType: string,
  onClick: () => void,
  text: string,
};  
  
const SubmitButton = ({deviceType, onClick, text}: SubmitButtonProps) => {
  return (
    <SubmitButtonContainer deviceType={deviceType}>
      <SubmitButtonText deviceType={deviceType} onClick={onClick}>{text}</SubmitButtonText>
    </SubmitButtonContainer>
  );
};

export default SubmitButton;

const SubmitButtonContainer = styled(GrayShadowBox) <{ deviceType: string }>`
  width: 100%;
  margin-top: 20px;
  background: #FFFFFF;  
  box-shadow: 0px 1px 10px 2px rgba(211, 140, 255, 0.5);
  border-radius: 15px;
`

const SubmitButtonText = styled.button<{ deviceType: string }>`
  width: 100%;
  padding: ${(props) => { return props.deviceType === 'mobile'? '15px': '11px' }}; 
  background-color: transparent;
  border: 0;
  border-radius: 15px;
  font-size: ${(props) => { return props.deviceType === 'mobile' ? '14px' : '24px' }}; 
  font-weight: 700;
  &:hover{
    cursor: pointer;
  }
  &:active{
    cursor: default;
    background-color: lightgray;
  }
`