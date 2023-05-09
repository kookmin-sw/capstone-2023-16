import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

type CheckBoxFieldType = {
  fieldname: string,
  label: string,
  required?: boolean,
};

const CheckBoxField = ({fieldname, label}: CheckBoxFieldType) => {
  const deviceType = useDeviceType();
  
  return <Container>
    <FieldLabel deviceType={deviceType}></FieldLabel>
    <input id={fieldname} type='checkbox' />
    <label htmlFor={fieldname}>{label}</label>
  </Container>
};

export default CheckBoxField;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;

`;


const FieldLabel = styled.label<{ deviceType: string }>`
  margin-bottom: 10px;
  font-size: ${props => props.deviceType === 'mobile' ? '14px' : '18px'};
`