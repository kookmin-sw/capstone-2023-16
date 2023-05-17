import React, { ForwardedRef, InsHTMLAttributes, useState } from 'react';
import { GrayShadowBox } from '../commons/GrayShadowBox';
import { ReactComponent as Visible } from '../../assets/icons/visibility.svg';
import { ReactComponent as Invisible } from '../../assets/icons/visibility-off.svg';
import styled from 'styled-components';

interface AccountInputProps extends React.ComponentPropsWithoutRef<'input'>{
  text: string,
  devicetype: string,
  isPassword?: boolean,
}

const AccountInput = ({ text, isPassword=false, devicetype }: AccountInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [visibility, setVisibility] = useState<boolean>(isPassword? false : true);

  const onToggleVisibility = () => setVisibility(!visibility);

  return (<AccountInputContainer devicetype={devicetype}>
    <InputLabel htmlFor={text} devicetype={devicetype}>{text}</InputLabel>
    <AccountInputBox devicetype={devicetype}>
      <Input id={text} ref={ref} type={visibility ? 'text' : 'password'} devicetype={devicetype} />
      {isPassword ?
        visibility ?
          <VisibleIcon onClick={onToggleVisibility} />
          : <InvisibleIcon onClick={onToggleVisibility} />
          : null
          }
    </AccountInputBox>
    </AccountInputContainer>
  )
};

export default React.forwardRef(AccountInput);

const AccountInputContainer = styled.div<{ devicetype: string }>`
  width: 100%;
  height: auto;
  margin:  ${(props) => { return props.devicetype === 'mobile'? '10px': '20px' }} 0;
  border-radius: 10px;
`

const InputLabel = styled.label<{ devicetype: string }>`
  font-size: ${(props) => { return props.devicetype === 'mobile'? '16px': '20px'}};
  font-weight: 700; 
`
const AccountInputBox = styled(GrayShadowBox) <{ devicetype: string }>`
  width: ${(props) => { return props.devicetype === 'mobile'? '100%': '464px' }};
  height: ${(props) => { return props.devicetype === 'mobile' ? '40px' : '66px' }};
  display: flex;
  margin-top: 9px;
  padding: 5px;
  padding-right: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  align-items: center;
`

const Input = styled.input<{ devicetype: string }>`
  width: 100%;
  border: 0;
  font-size: ${(props) => { return props.devicetype === 'mobile'? '14px': '20px'}};
  flex: 10;
`

const VisibleIcon = styled(Visible)`
  height: 60% !important;
  flex: 1;
  margin: 10px;
  &:hover{
    cursor: pointer;
  }
`

const InvisibleIcon = styled(Invisible)`
  height: 60% !important;
  flex: 1;
  margin: 10px;
  &:hover{
    cursor: pointer;
  }
`