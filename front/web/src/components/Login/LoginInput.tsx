import React, { useState } from 'react';
import { GrayShadowBox } from '../commons/GrayShadowBox';
import { ReactComponent as VisibleIcon } from '../../assets/icons/visibility.svg';
import { ReactComponent as InvisibleIcon } from '../../assets/icons/visibility-off.svg';
import WHcal from '../../utils/WHcal';
import styled from 'styled-components';

type LoginInputProps = {
  text: string,
  inputRef: React.RefObject<HTMLInputElement>;
  widthType: string;
  isPassword?: boolean;
}

const LoginInput = ({ text, isPassword, inputRef, widthType }: LoginInputProps) => {
  const [visibility, setVisibility] = useState<boolean>(isPassword? false : true);

  const onToggleVisibility = () => setVisibility(!visibility);

  return (<>
    <SignInTitle htmlFor={text} widthType={widthType}>{text}</SignInTitle>
    <GrayShadowBox>
      <input id={text} ref={inputRef} type={visibility ? 'text' : 'password'}/>
      {isPassword ?
        visibility ?
          <VisibleIcon style={{ width: '1rem' }} onClick={onToggleVisibility} />
          : <InvisibleIcon style={{ width: '1rem' }} onClick={onToggleVisibility}/>
          : null
          }
    </GrayShadowBox>
    </>
  )
};

export default LoginInput;

const SignInTitle = styled.label<{widthType: string}>`
    font-size: ${(props) => { return WHcal(props.widthType!, 24) }};
    font-weight: 700; 
`