import React from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

type BadgeType = {
  id: string,
  body: string,
  name: string,
  onChecked: (e: any) => void,
};

const Badge = ({id, body, name, onChecked}: BadgeType) => {
  const deviceType = useDeviceType();

  return <Container deviceType={deviceType}>
    <HiddenInput type='checkbox' id={id} name={name} onChange={onChecked} value={body} />
    <Label htmlFor={id} className='field__container' deviceType={deviceType}>{body}</Label>
  </Container>
};

export default Badge;

const Container = styled.div<{ deviceType: string }>`
  width: auto;
  margin: ${props => props.deviceType === 'mobile' ? '10px 8px' : '13px 12px'};
`
const HiddenInput = styled.input`
  display: none;
  &:checked {
    & + label {
      background-color: #F1DBFF;
    }
  }
`;

const Label = styled.label<{ deviceType: string }>`
  width: auto;
  height: ${props => props.deviceType === 'mobile' ? '26px' : '42px'} !important;
  padding: ${props => props.deviceType === 'mobile' ? '8px' : '15px'};
  font-size: ${props => props.deviceType === 'mobile' ? '12px' : '20px'};
  &:hover {
    cursor: pointer;
  }
  &:active {
    cursor: default;
  }
`;