import React from 'react';
import TextButton from '../commons/TextButton';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

type PersonaSetting = {
  mode: string;
  setMode: (mode:string) => void;
};

const PersonaSetting = ({mode, setMode}: PersonaSetting) => {
  const navigate = useNavigate();
  const deviceType = useDeviceType();
  const onClick = () => mode === 'default' ? setMode('setting') : setMode('default');
  
  return <Container deviceType={deviceType}>
    <SettingLabel mode={mode} htmlFor='persona_setting' className='setting__container' deviceType={deviceType}>설정</SettingLabel>
    <input id='persona_setting' type='checkbox'  onClick={onClick} />
    <CreateButton onClick={() => navigate('/create')} deviceType={deviceType} >생성</CreateButton>
  </Container>
};

export default PersonaSetting;

const Container = styled.div<{deviceType:string}>`
  width: auto;
  display: flex;
  flex-direction: row;
  gap: ${(props) => {return (props.deviceType==='mobile')?'13px': '20px'}};
`;

const SettingLabel = styled.label<{deviceType:string, mode:string}>`
  height: ${(props) => {return (props.deviceType==='mobile')?'23px': '46px'}};
  padding: 0 ${(props) => {return (props.deviceType==='mobile')?'11px': '22px'}};
  border-radius: ${(props) => {return (props.deviceType==='mobile')?'5px': '10px'}};
  background-color: ${(props) => {return (props.mode==='default')?'#ffffff': '#D38CFF'}};
  color: ${(props) => {return (props.mode==='default')?'#000000': '#ffffff'}};
  box-shadow: 0px 0.0694vw 0.4861vw 0px rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  border:none;
  &:hover{
      cursor: pointer;
  }
  &:active{
      cursor: default;
      background-color: lightgray;
  }
  font-size: ${(props) => {return (props.deviceType==='mobile')?'12px': '24px'}};
  line-height: ${(props) => { return (props.deviceType === 'mobile') ? '15.5px' : '29px' }};
  & + input {
    display: none;
  }
`;

const CreateButton = styled.button<{deviceType:string}>`
  height: ${(props) => {return (props.deviceType==='mobile')?'23px': '46px'}};
  padding: 0 ${(props) => {return (props.deviceType==='mobile')?'11px': '22px'}};
  border-radius: ${(props) => {return (props.deviceType==='mobile')?'5px': '10px'}};
  background-color: #ffffff;
  box-shadow: 0px 0.0694vw 0.4861vw 0px rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  border:none;
  &:hover{
      cursor: pointer;
  }
  &:active{
      cursor: default;
      background-color: lightgray;
  }
  font-size: ${(props) => {return (props.deviceType==='mobile')?'12px': '24px'}};
  line-height: ${(props) => { return (props.deviceType === 'mobile') ? '15.5px' : '29px' }};
`