import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

type CheckBoxFieldType = {
  fieldname: string,
  label: string,
  onSave: (e:any) => void,
};

const CheckBoxField = ({fieldname, label, onSave}: CheckBoxFieldType) => {
  const deviceType = useDeviceType();
  
  return <Container>
    <FieldLabel deviceType={deviceType}></FieldLabel>
    <label htmlFor={fieldname}>{label}</label>
    <input id={fieldname} type='checkbox' onChange={onSave} defaultChecked={false} />
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