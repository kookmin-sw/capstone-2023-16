import React, { useState } from 'react';
import { GrayShadowBox } from '../commons/GrayShadowBox';
import { ReactComponent as Visible } from '../../assets/icons/visibility.svg';
import { ReactComponent as Invisible } from '../../assets/icons/visibility-off.svg';
import WHcal from '../../utils/WHcal';
import styled from 'styled-components';

type LoginInputProps = {
  text: string,
  inputRef: React.RefObject<HTMLInputElement>,
  widthType: string,
  isPassword?: boolean,
}

const LoginInput = ({ text, isPassword, inputRef, widthType }: LoginInputProps) => {
  const [visibility, setVisibility] = useState<boolean>(isPassword? false : true);

  const onToggleVisibility = () => setVisibility(!visibility);

  return (<LoginInputContainer widthType={widthType}>
    <InputLabel htmlFor={text} widthType={widthType}>{text}</InputLabel>
    <LoginInputBox widthType={widthType}>
      <Input id={text} ref={inputRef} type={visibility ? 'text' : 'password'} widthType={widthType} />
      {isPassword ?
        visibility ?
          <VisibleIcon onClick={onToggleVisibility} widthtype={widthType} />
          : <InvisibleIcon onClick={onToggleVisibility} widthtype={widthType}/>
          : null
          }
    </LoginInputBox>
    </LoginInputContainer>
  )
};

export default LoginInput;

const LoginInputContainer = styled.div<{ widthType: string }>`
  width: 100%;
  height: auto;
  margin: ${(props) => { return WHcal(props.widthType!, 13.5) }} 0;
  border-radius: ${(props) => { return WHcal(props.widthType!, 10) }};
`

const InputLabel = styled.label<{ widthType: string }>`
  font-size: ${(props) => { return WHcal(props.widthType!, 20) }};
  font-weight: 700; 
`
const LoginInputBox = styled(GrayShadowBox) <{ widthType: string }>`
  height: ${(props) => { return WHcal(props.widthType!, 30) }};
  display: flex;
  margin-top: ${(props) => { return WHcal(props.widthType!, 9) }};
  padding: ${(props) => { return WHcal(props.widthType!, 5) }};
  border-radius: ${(props) => { return WHcal(props.widthType!, 10) }};
  align-items: center;
`

const Input = styled.input<{ widthType: string }>`
  padding:  ${(props) => { return WHcal(props.widthType!, 5) }};
  border: 0;
  font-size: ${(props) => { return WHcal(props.widthType!, 20) }};
  flex: 10;
`

const VisibleIcon = styled(Visible) <{ widthtype: string }>`
  height: 80% !important;
  flex: 1;
`

const InvisibleIcon = styled(Invisible)<{ widthtype: string }>`
  height: 80% !important;
  flex: 1;
`