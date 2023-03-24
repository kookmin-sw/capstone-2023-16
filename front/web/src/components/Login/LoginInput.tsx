import React, { useState } from 'react';
import { GrayShadowBox } from '../commons/GrayShadowBox';
import { ReactComponent as Visible } from '../../assets/icons/visibility.svg';
import { ReactComponent as Invisible } from '../../assets/icons/visibility-off.svg';
import styled from 'styled-components';

type LoginInputProps = {
  text: string,
  inputRef: React.RefObject<HTMLInputElement>,
  deviceType: string,
  isPassword?: boolean,
}

const LoginInput = ({ text, isPassword, inputRef, deviceType }: LoginInputProps) => {
  const [visibility, setVisibility] = useState<boolean>(isPassword? false : true);

  const onToggleVisibility = () => setVisibility(!visibility);

  return (<LoginInputContainer deviceType={deviceType}>
    <InputLabel htmlFor={text} deviceType={deviceType}>{text}</InputLabel>
    <LoginInputBox deviceType={deviceType}>
      <Input id={text} ref={inputRef} type={visibility ? 'text' : 'password'} deviceType={deviceType} />
      {isPassword ?
        visibility ?
          <VisibleIcon onClick={onToggleVisibility} />
          : <InvisibleIcon onClick={onToggleVisibility} />
          : null
          }
    </LoginInputBox>
    </LoginInputContainer>
  )
};

export default LoginInput;

const LoginInputContainer = styled.div<{ deviceType: string }>`
  width: 100%;
  height: auto;
  margin: 29px 0;
  border-radius: 10px;
`

const InputLabel = styled.label<{ deviceType: string }>`
  font-size: ${(props) => { return props.deviceType === 'mobile'? '16px': '20px'}};
  font-weight: 700; 
`
const LoginInputBox = styled(GrayShadowBox) <{ deviceType: string }>`
  width: ${(props) => { return props.deviceType === 'mobile'? '318px': '464px' }};
  height: ${(props) => { return props.deviceType === 'mobile'? '50px': '66px' }};
  display: flex;
  margin-top: 9px;
  padding: 5px;
  padding-right: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  align-items: center;
`

const Input = styled.input<{ deviceType: string }>`
  width: 100%;
  padding: 7px;
  border: 0;
  font-size: ${(props) => { return props.deviceType === 'mobile'? '14px': '24px'}};
  flex: 10;
`

const VisibleIcon = styled(Visible)`
  height: 60% !important;
  flex: 1;
  margin: 10px;
`

const InvisibleIcon = styled(Invisible)`
  height: 60% !important;
  flex: 1;
  margin: 10px;

`