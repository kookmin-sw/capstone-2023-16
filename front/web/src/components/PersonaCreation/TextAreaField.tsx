import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

type TextAreaField = {
  fieldname: string,
  label: string,
};

const TextAreaField = ({ fieldname, label }: TextAreaField) => {
  const deviceType = useDeviceType();

  return <Container>
    <FieldLabel deviceType={deviceType}>{label}</FieldLabel>
    <FieldTextArea deviceType={deviceType} rows={10} />
  </Container>
};

export default TextAreaField;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px 0;

`;

const FieldLabel = styled.label<{ deviceType: string }>`
  margin-bottom: 10px;
  padding: auto;
  font-size: ${props => props.deviceType === 'mobile' ? '16px' : '20px'};
  font-weight: bold;
`;

const FieldTextArea = styled.textarea < { deviceType: string }>`
  display: block;
  width: ${props=>props.deviceType === 'mobile'? '318px': '464px'};
  padding: ${props=>props.deviceType === 'mobile'? '17px': '22px'};
  border: 0;
  border-radius: 10px;
  box-shadow: 0px 0.2778vw 2.0833vw 0px rgba(0, 0, 0, 0.12);
  font-size: ${props => props.deviceType === 'mobile' ? '14px' : '20px'};
  &:focus {
    outline: 0;
    box-shadow: 0px 0.2778vw 2.0833vw 0px rgba(211, 140, 255, 0.5);
  }
  box-sizing: content-box;
`