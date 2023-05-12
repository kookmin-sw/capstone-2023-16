import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

type TextFieldType = {
  fieldname: string,
  label?: string,
  required?: boolean,
}

const TextField = ({ fieldname, label, required=false }: TextFieldType) => {
  const deviceType = useDeviceType();

  return <Container deviceType={deviceType}>
      {deviceType !== 'mobile'&&required && <RequiredSpan>필수</RequiredSpan>}
      {label&&<label htmlFor={fieldname} className='field__label'>{label}</label>}
      <input id={fieldname} type='text' className='field__container' />
    </Container>
};

export default TextField;

const Container = styled.div<{ deviceType: string }>`
  width: 100%;
  height: ${props=>props.deviceType === 'mobile'? '50px': '66px'};
  position: relative;
  display: flex;
  align-items: center;
`;

const RequiredSpan = styled.span`
  position: absolute;
  top: 0;
  left: 8px;
  color: #646464;
  font-size: 10px;
  margin: 5px 10px;
`