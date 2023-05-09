import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

type TextFieldType = {
  fieldname: string,
  label: string,
  required?: boolean,
}

const TextField = ({ fieldname, label, required=false }: TextFieldType) => {
  const deviceType = useDeviceType();

  return <div>
    <Container>
      {deviceType !== 'mobile'&&required && <RequiredSpan deviceType={deviceType}>필수</RequiredSpan>}
      <FieldLabel htmlFor={fieldname} deviceType={deviceType}>{label}</FieldLabel>
      <FieldInput id={fieldname} deviceType={deviceType} />
    </Container>

  </div>
};

export default TextField;

const Container = styled.div`
  position: relative;
  display: flex;
  margin: 15px 0;
  align-items: center;
`;

const FieldLabel = styled.label<{ deviceType: string }>`
  min-width: 60px;
  margin-bottom: 10px;
  font-size: ${props => props.deviceType === 'mobile' ? '16px' : '20px'};
  font-weight: bold;
`

const RequiredSpan = styled.span<{ deviceType: string }>`
  position: absolute;
  top: 0;
  left: 8px;
  color: #646464;
  font-size: 10px;
  margin: 5px 10px;
`

const FieldInput = styled.input<{ deviceType: string }>`
  display: block;
  width: ${props=>props.deviceType === 'mobile'? '318px': '464px'};
  height: ${props => props.deviceType === 'mobile' ? '50px' : '66px'};
  padding: ${props=>props.deviceType === 'mobile'? '17px': '22px'};
  border: 0;
  border-radius: 10px;
  box-shadow: 0px 0.2778vw 2.0833vw 0px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  font-size: ${props => props.deviceType === 'mobile' ? '14px' : '20px'};
  &:focus {
    outline: 0;
    box-shadow: 0px 0.2778vw 2.0833vw 0px rgba(211, 140, 255, 0.5);
  }
`